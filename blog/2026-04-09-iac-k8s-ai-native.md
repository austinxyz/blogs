---
title: "IaC and Kubernetes: The Two-Layer Control Plane for AI Native Infrastructure"
date: 2026-04-09T10:00
authors: [austin]
tags: [ai, cloud-computing, kubernetes]
description: "Why Terraform and Kubernetes aren't alternatives for AI Native infrastructure — and how they divide the work between provisioning-time and runtime control."
slug: iac-k8s-ai-native
---

*This is Part 3 of a three-part series on AI Native Infrastructure. [Part 1](/blog/cloud-native-to-ai-native-infra) covers GPU cluster management. [Part 2](/blog/cloud-native-to-ai-native-app-platform) covers agent platform engineering. This post covers IaC and Kubernetes as the two-layer control plane that makes both work at scale.*

---

Meta manages its GPU infrastructure with approximately 2 million lines of Terraform. That number gets cited often as evidence that Infrastructure as Code is the answer to AI infra management at scale.

But it's worth asking: what exactly is Terraform managing in those 2 million lines? And what is it *not* managing?

The answer to that question reveals something important about how AI Native infrastructure actually needs to be governed — and why Kubernetes, despite not being designed for GPU workloads, remains the right runtime control plane for both the infrastructure layer and the application layer above it.

<!--truncate-->

---

## Two Types of Desired State

The confusion between IaC and Kubernetes usually comes from treating them as alternatives. They're not. They operate on fundamentally different types of desired state.

**Provisioning-time state** is the infrastructure topology: which nodes exist, how the network is configured, what storage systems are attached, what the base OS image looks like. This state changes infrequently — when you add capacity, refresh hardware, or change a network topology. Terraform excels here. You describe what the infrastructure should look like, run `apply`, and Terraform reconciles. The process is human-triggered, runs to completion, and then stops.

**Runtime state** is what's happening on top of that infrastructure: which training jobs are running on which nodes, how GPU resources are allocated across tenants, whether a job that lost a node has recovered from its last checkpoint, whether an agent's token spend this hour has exceeded its budget. This state changes constantly — second by second, driven by workload events. Terraform has no model for this. It runs once and exits.

Kubernetes was built for runtime state. Its control loop runs continuously, reconciling desired state against observed reality. When a node disappears, a controller notices immediately and reacts. When a new workload arrives, the scheduler places it. When a policy is violated, an admission webhook rejects it before it runs. This is an entirely different operational model from IaC — not better, not worse, just suited to different problems.

Meta's 2 million lines of Terraform are building the factory. Kubernetes is running it.

---

## What IaC Owns in AI Native Infrastructure

In AI Native infra, IaC takes on more responsibility than in Cloud Native, not less. The hardware is more complex, the provisioning is more expensive to get wrong, and the cost of configuration drift is higher when a single misconfigured GPU node can silently degrade a week-long training run.

**Cluster provisioning**: GPU node pools, InfiniBand fabric configuration, NVMe storage attachment, base OS images with the right CUDA versions pinned. This is foundational and rarely changes — exactly the right job for Terraform.

**Firmware version management**: One of the more subtle failure modes in large GPU clusters is firmware version mismatch between nodes on the same training job. NVIDIA releases monthly GPU firmware updates, and running mixed versions can cause mysterious job instability. IaC solves this by treating firmware version as part of the immutable node image — the desired firmware state is declared in code, and any drift triggers a replacement rather than an in-place patch.

**Network topology as code**: InfiniBand fabric topology, ECMP routing policies, and RDMA configuration are critical to training throughput and notoriously easy to misconfigure. Declaring these in version-controlled IaC means topology changes go through code review, topology state is auditable, and accidental drift surfaces as a diff.

**Zero-touch provisioning**: At 10,000+ GPU scale, manual node provisioning is not a workflow — it's a bottleneck. IaC automation with BMC integration (Redfish API) means GPU nodes can arrive and self-provision without human touch. The desired state is already declared; the new node reconciles to it on first boot.

The pattern is consistent: IaC owns anything that is slow-changing, expensive to get wrong, and needs an audit trail. It is the source of truth for what the infrastructure *is*.

---

## What Kubernetes Owns — And What It Needs to Learn

Kubernetes owns what IaC cannot: continuous runtime governance. But AI workloads expose significant gaps in its native capabilities. The good news is that its extensibility model — CRD + Operator + Admission Webhook — is the right foundation for filling those gaps. The extensions needed at the infrastructure layer and the application layer follow the same pattern.

### At the Infrastructure Layer

**Gang Scheduling**

Kubernetes' default scheduler schedules Pods independently. For distributed training, this creates a deadlock scenario: partial job placement holds GPU resources while waiting for the remaining workers, which can't be placed because other jobs are in the same queue. No progress happens anywhere.

The fix requires treating a distributed training job as an atomic unit. **Volcano** and **Kubeflow Training Operator** introduce the PodGroup CRD — a new object that tells the scheduler "schedule all of these or none of them." This is a runtime concept that has no IaC equivalent: it's about what happens when jobs compete for resources in real time.

**Topology-Aware GPU Placement**

A training job scheduled across nodes in different InfiniBand fault domains, or across GPUs that don't share an NVLink switch, will train measurably slower — with no error, no alert, and no obvious cause. Native Kubernetes has no concept of GPU topology. Custom scheduler plugins, informed by node labels that IaC has set (describing NVLink domains, IB fabric membership, NUMA topology), allow the runtime scheduler to make placement decisions that preserve communication bandwidth.

This is the layered dependency clearly: IaC declares the topology as node labels, Kubernetes uses those labels at scheduling time.

**GPU Health and Predictive Recovery**

Kubernetes liveness probes were designed for HTTP services. GPU health requires something different: continuously monitoring ECC error accumulation, Xid fault codes, power anomalies, and SM utilization patterns. **DCGM Exporter** runs as a DaemonSet and surfaces these metrics to Prometheus. A custom controller watches for degradation signals and can cordon a node before it causes a job failure — shifting from reactive restart to predictive isolation.

Checkpoint recovery also needs operator-level intelligence. A training job operator that understands checkpoint semantics can restart a failed job from its last saved state rather than from scratch, replacing the failed node with a warm standby. Kubernetes provides the mechanism; the operator provides the domain knowledge about what recovery means for this workload type.

**GPU Resource Granularity**

The Device Plugin model exposes GPUs as opaque integers. For inference workloads that don't need a full GPU, this wastes capacity. **MIG** (Multi-Instance GPU) extends this model: NVIDIA MIG Manager runs as a DaemonSet and registers partitioned GPU instances (e.g., `nvidia.com/mig-1g.10gb`) as first-class Kubernetes resources. The partition configuration is declared in IaC (as part of the node image); Kubernetes exposes and schedules those partitions at runtime.

---

### At the Application Layer

The same extension pattern — CRD + Operator + Admission Webhook — applies when the workload is agents rather than training jobs.

**Agent as a First-Class Kubernetes Object**

Today, most agents run as ordinary Deployments. Kubernetes has no concept of what an agent is: it doesn't know the agent has a prompt version, a tool manifest, a context budget, or a model dependency. A prompt change that alters behavior is invisible to the platform — it looks identical to any other container image update.

An Agent CRD changes this. It allows the platform to:
- Track prompt version alongside container image version
- Apply canary releases scored on output quality rather than error rate
- Enforce that agents declare their tool manifest at deploy time, before any tool call can happen
- Manage agent lifecycle (deprecation, rollback, multi-version coexistence) with the same operator patterns used for database migrations or stateful service upgrades

**MCP Gateway as a Platform Component**

MCP (Model Context Protocol) defines how agents express and invoke tools. Without platform governance, it's an intent-plane component: it describes what the agent can do but cannot constrain the consequences. A runaway agent with an MCP tool can make unbounded external API calls, consume unbounded tokens, and generate unbounded cost — with no platform-level circuit breaker.

The right model is an MCP gateway running as a platform-managed component — similar in position to Istio in the Cloud Native world. Admission webhooks validate that an agent's declared tool manifest is within permitted scope before the agent is deployed. The gateway intercepts tool calls at runtime, applies rate limits, logs full call chains for audit, and enforces budget-based circuit breakers. IaC provisions the gateway infrastructure; Kubernetes operators manage its lifecycle and configuration.

**Token Quota as a ResourceQuota Extension**

Kubernetes ResourceQuota enforces CPU and memory limits per namespace. AI Native apps need the same enforcement applied to token consumption, GPU compute time, and tool call volume. A custom admission webhook checks incoming agent requests against per-namespace token budgets at entry. A metering controller attributes consumption continuously — by namespace, by agent, by model, by use case — feeding the governance closed loop described in [Part 2](/blog/cloud-native-to-ai-native-app-platform).

This is the direct AI Native equivalent of the ResourceQuota + LimitRange pattern used in Cloud Native multi-tenancy. The governance philosophy is identical; the resources being governed are different.

**Ephemeral Validation Environments**

When coding agents generate changes at high velocity, the CI pipeline becomes the bottleneck — not because CI is slow in absolute terms, but because it was designed for human-paced development. Kubernetes-native ephemeral sandbox environments (using service mesh request routing to deploy only the changed service and route specific traffic through it) change the economics. When a sandbox takes seconds to provision and costs a fraction of a full staging environment, agents can validate their own changes against live infrastructure as part of their workflow — before opening a PR.

IaC defines the sandbox template. Kubernetes operators provision and tear down sandbox instances on demand, triggered by agent workflow steps rather than human PR submissions.

---

## The Converging Pattern

Looking across both layers, the same architectural pattern appears every time:

| Concern | IaC owns | Kubernetes extends |
|---------|----------|-------------------|
| GPU node configuration | Firmware version, OS image, CUDA version, node labels for topology | Device Plugin exposes resources; scheduler plugins use topology labels |
| Training job reliability | Checkpoint storage provisioning | Training Operator manages gang scheduling and checkpoint recovery |
| Multi-tenant isolation | Network segmentation, namespace provisioning | ResourceQuota, LimitRange, Admission Webhooks enforce at runtime |
| Agent governance | MCP gateway infrastructure provisioning | Admission Webhooks validate manifests; gateway controllers enforce at call time |
| Cost attribution | Metering infrastructure (Prometheus, storage) | Custom controllers attribute and enforce token/compute budgets per tenant |

IaC declares what exists. Kubernetes governs what runs. Neither alone is sufficient; together they form a two-layer control plane that handles both the slow-changing provisioning concerns and the fast-changing runtime concerns that AI workloads demand.

---

## What This Means in Practice

When I think about building an AI Native platform from scratch today, the question isn't "Terraform or Kubernetes" — it's "what does each layer own, and where are the handoff points?"

IaC handles everything that should be version-controlled, reviewed, and applied infrequently: node topology, firmware pins, network configuration, cluster bootstrapping. The principle is the same as in Cloud Native — immutable infrastructure, no configuration drift, everything auditable.

Kubernetes handles everything that needs continuous reconciliation: workload placement, resource enforcement, health response, agent lifecycle. The extension model — CRD + Operator + Admission Webhook — is how you teach Kubernetes about new resource types without forking the core platform. This is what made Kubernetes the right foundation for Cloud Native, and it's what makes it the right foundation for AI Native.

The 2 million lines of Terraform aren't competing with Kubernetes. They're provisioning the substrate that Kubernetes governs. Understanding that separation is the starting point for building AI infrastructure that stays manageable as it scales.

---

*Back to [Part 1](/blog/cloud-native-to-ai-native-infra): Cloud Native to AI Native infrastructure. Back to [Part 2](/blog/cloud-native-to-ai-native-app-platform): the agent platform layer.*
