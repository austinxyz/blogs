---
title: "From Cloud Native to AI Native: An Infra Platform Engineer's Perspective"
date: 2026-04-08
authors: [austin]
tags: [ai, cloud-computing, kubernetes]
description: "What Cloud Native infrastructure experience actually transfers to AI Native, and what needs to be rebuilt from scratch — a practitioner's honest account."
---

I've spent the past several years running one of the larger Kubernetes deployments I know of — 200+ clusters, 5,000+ applications, 500,000 nodes, 2 million instances. When the AI wave hit and my team started getting serious about GPU infrastructure, I kept asking myself: how much of what we built actually transfers? Where do we have to start over?

This post is my attempt to answer that question honestly. It's not a technology comparison or a vendor evaluation. It's a practitioner's account of what Cloud Native taught me, where it fell short, and what an AI Native infrastructure actually demands.

<!--truncate-->

---

## What Makes a Cloud Native Application

Before talking about infrastructure, it helps to be precise about what we were actually supporting.

Cloud Native applications share a few defining characteristics. They are **stateless by design** — a Pod can be killed and restarted without any loss of correctness. They are **horizontally elastic** — add more replicas to scale, remove them to save cost. They have **short startup times** — containers come up in seconds, which makes rolling deployments, canary releases, and blue-green cutover practical. And their core SLA is expressed in terms of **latency and throughput** — P99, error rate, requests per second.

The underlying resource model is CPU and memory, both of which can be overcommitted. If a node has 16 vCPUs, you can schedule 32 vCPUs worth of workloads on it, betting on the fact that they won't all be at peak simultaneously. This flexibility is what makes Cloud Native infrastructure so cost-efficient.

The implicit assumption running through all of this: **behavior is predictable, execution paths are orchestrable, failures are isolatable.**

---

## How Cloud Infra Was Built to Support This

Over several years building Cloud Native infrastructure at scale, we built three distinct layers.

### The Orchestration Layer

Kubernetes' declarative desired state model is a near-perfect match for Cloud Native's elasticity requirements. When we migrated 5,000 applications from a VM-based CI/CD stack to Kubernetes, the core design was a **five-phase migration blueprint** per application: preparation, workload creation, traffic switching, baking period, and decommission — with rollback capability at each gate. We decoupled LB configuration conversion from orchestration, letting the two teams move in parallel without constant coordination overhead.

Blue-green rollouts and canary releases are foundational Cloud Native patterns, but they create significant scheduling pressure — large batches of Pod creations and deletions happening simultaneously. Supporting this at 5,000-application scale required the scheduler to be reliable and fast under burst load, which pushed us hard on control plane performance.

### The Platform Layer

The single biggest mental model shift we made was moving from **Ops thinking to Platform thinking**. The difference: Ops thinking asks "how do I fix this problem?" Platform thinking asks "how do I make this class of problem impossible?"

At 200+ clusters, there is no other option. We couldn't afford to write automation for each new upgrade cycle or each new customer context. So we modeled OS and Kubernetes upgrades as declarative desired state using CRDs and custom controllers. We encoded correctness into admission webhooks — guardrails that cannot be bypassed — rather than relying on runbook discipline. We built self-service validation so teams could test their own upgrade compatibility without queuing on a central team.

The result: two engineers could handle bi-annual Kubernetes upgrades across the entire fleet with zero incidents. Monthly OS patching and continuous cluster operations became routine, non-events.

### The Operations Layer

We automated the full cluster lifecycle — build, tech refresh, decommission — bringing end-to-end timeline from several weeks down to a few days. More recently, we embedded AI directly into operations: an MCP server for Cloud API access, automated triage agents for customer support, and local skills for incident diagnosis. Monthly incidents dropped from 3–4 to 1–2, and triage time for common issues was cut in half.

Auto-scaling and auto-rebalancing are also genuinely easy in Cloud Native because workloads are stateless. If a node disappears, reschedule. If load increases, add Pods. The infrastructure can react without knowing anything about what the workload is doing internally.

---

## Lessons Learned the Hard Way

This is the part most architecture posts skip. Here are the real problems we ran into — and what actually fixed them.

**API Server contention under multi-tenancy.** We had APF (API Priority and Fairness) settings that were too coarse. One large client was consuming the majority of API Server request quota during a batch operation, cascading into degraded performance across the entire cluster for everyone else. The fix wasn't simply raising limits — it was configuring per-client APF buckets with appropriate priority tiers, so a misbehaving client couldn't crowd out critical control plane operations.

**L7 migration complexity.** Our existing L7 was built on commercial hardware load balancers with years of accumulated configuration — complex routing rules, cross-cluster dependencies, public and private traffic topologies. Migrating to Istio/Service Mesh sounded clean on a whiteboard and was genuinely painful in practice. Istio added latency, made failure diagnosis harder, and the migration itself required understanding hundreds of bespoke LB configurations. We built a custom **Migration Controller** that did automated spec matching, supported dry-run validation, and enabled phased traffic cutover. That tooling was the only reason we got through it without incidents.

**Upgrade costs compound.** Two major Kubernetes version upgrades per year, monthly OS security patches, continuous hardware refresh — if any of these are still manual processes at 200+ cluster scale, you have a headcount problem disguised as a technical problem. We built a Patching Platform and an Upgrade Platform to treat these as first-class automated workflows. Before that, we were routinely underestimating upgrade effort by 3–4x.

**Observability without signal.** Big clusters generate enormous metric and log volume. The early problem wasn't lack of data — it was lack of signal. We had thousands of alerts and no confidence in which ones mattered. The fix was to stop thinking about alerts as metric thresholds and start from **SLO/SLI definitions**: what does user-visible degradation actually look like, and what is the earliest measurable leading indicator? Once we had that anchor, we could build alert hierarchies that pointed to root cause rather than symptoms, and codify triage steps into runbooks that eventually fed automated recovery.

**Users bypass the platform.** Application teams that don't understand the platform abstraction will find workarounds — SSH directly to nodes, manual kubectl edits, configuration changes outside the automation pipeline. These create drift, incidents, and debugging nightmares. The most effective fix wasn't more documentation or more training. It was **removing SSH access entirely**. When the workaround doesn't exist, teams learn to use the platform.

---

## AI Native Applications: What's Actually Different

[Jimmy Song's framing](https://jimmysong.io/book/ai-native-infra/) captures the core shift well: Cloud Native asks "how do I make this service highly available, scalable, and observable?" AI Native asks "how does this agent make high-quality decisions in an uncertain environment, and how do I govern that safely?"

The two paradigms aren't replacements for each other — AI Native is built on the Cloud Native foundation. But it reconstructs the abstraction layer above it.

Here's what the differences look like across the dimensions that matter most to infrastructure engineers:

| Dimension | Cloud Native | AI Native |
|-----------|-------------|-----------|
| **Compute Resource** | CPU/Memory, elastically overcommittable, linear cost growth | GPU at core, integer non-overcommittable, $25K–40K per card, hard cost ceiling |
| **Workload Shape** | Stateless services + short batch, Pods can be killed at any time | Long-running training (days–weeks) + inference serving + stateful Agent runtimes |
| **Execution Unit & Determinism** | Service responds to deterministic request/response, behavior is predictable and orchestrable | Agent/Model executes action/decision/side-effect, inference is non-deterministic, context is fluid |
| **Failure Tolerance & Reliability** | Fast restart recovery, reliable delivery of deterministic systems (SLA uptime) | Checkpoint-based stateful recovery, controllable operation of non-deterministic systems (behavior must be attributable and auditable) |
| **Communication Pattern** | East-west HTTP/gRPC, L7 traffic governance | GPU-to-GPU all-reduce via NCCL over InfiniBand, network bandwidth is a direct training throughput constraint |
| **Scaling Unit** | Single Pod, elastic horizontal scaling | Gang scheduling — all workers launch together or the job fails entirely |
| **SLA & Observability** | P99 latency/throughput, error rate, service dependency tracing | GPU utilization (target 85–95%), MFU, SM utilization, ECC errors, token cost per query |
| **Governance & Platform Role** | Govern service/instance/request, provide stable runtime for services | Govern model behavior / compute scarcity / uncertainty itself, provide measurable and attributable system boundaries for Agents |
| **Context & State** | Stateless by default, short-lived sessions | Agents require long context windows and persistent state — Infra must explicitly support this |

---

## How Infra Must Support AI Native

The differences in the table above aren't just conceptual. Each one translates into concrete infrastructure work.

### Rethinking the Scheduler

Kubernetes' default scheduler wasn't built for GPU workloads. The two biggest gaps are **Gang Scheduling** and **topology-aware placement**.

Gang scheduling means all worker Pods in a distributed training job must be scheduled simultaneously. If one worker can't be placed, the rest sit idle consuming GPU resources for no productive work. Native Kubernetes has no concept of this — you need Volcano or Kubeflow Training Operator to get it right.

Topology-aware placement matters because GPU-to-GPU bandwidth varies dramatically depending on where the GPUs are. Within a node, NVLink provides ~600 GB/s. Between nodes on the same InfiniBand fabric, you're looking at ~200 GB/s. Scheduling a tightly-coupled training job across nodes that happen to be on different fabric segments can cut effective bandwidth by 3x with no visible error — the job just trains slower.

GPU resource exposure adds another layer of complexity: the Device Plugin model exposes GPUs as opaque integer resources. MIG (Multi-Instance GPU) allows hardware-level partitioning of an A100 or H100 into up to 7 isolated instances — the right tool for multi-tenant inference where you need true isolation. Time-slicing is the software alternative: flexible but no hardware isolation boundary between tenants.

### The Network Is No Longer About Routing

In Cloud Native, network work was largely about L7 traffic governance — service mesh, traffic splitting, mTLS, circuit breaking. That entire skillset, while still relevant for inference serving, is largely irrelevant for training.

Training clusters communicate via **RDMA over InfiniBand**. The abstraction layer disappears — you're tuning NCCL collectives, InfiniBand fabric topology, and all-reduce algorithms. At 10,000 GPU scale, this means Fat-tree Clos topology for consistent any-to-any latency, InfiniBand for training clusters, and high-speed Ethernet for inference. A misconfigured ECMP policy or a congested IB switch doesn't show up as a service error — it shows up as training throughput degradation that's hard to attribute.

### Reliability Means Something Different

In Cloud Native, reliability is about uptime. A Pod crash is self-healing in seconds. The infrastructure doesn't need to care about what the workload was doing.

In AI Native, a training job that loses its state has to restart from the last checkpoint — potentially hours of compute lost. At 10,000 GPU scale, 1% of GPUs cause approximately 50% of job failures (Google's finding). This means the reliability engineering focus shifts from cluster-level uptime to **GPU-level predictive health management**: tracking ECC error rates, Xid codes, and power anomalies per GPU, and replacing or isolating unhealthy hardware before it kills a running job.

Automatic checkpointing, heartbeat-based hang detection, and warm standby spare nodes are no longer nice-to-haves — they're the baseline.

### Observability at a Different Scale

Each GPU generates 10,000+ metrics per second. A 10,000-GPU cluster produces roughly 100 million metrics per second — 8.6 trillion data points per day. Traditional monitoring tools (Nagios, Zabbix, even naive Prometheus deployments) collapse under this load.

The right stack is DCGM for node-level GPU health data, Prometheus with hierarchical aggregation (rack → row → cluster), and ML-based anomaly detection for pattern recognition at scale. The metrics that matter are SM utilization (compute efficiency), memory bandwidth (data throughput), temperature (thermal throttling risk), and ECC error rate (hardware degradation signal) — not just "is the GPU allocated."

---

## What Transfers, What Needs to Be Rebuilt

After doing this transition in practice, here's my honest assessment of what Cloud Native experience is actually worth in an AI Native context.

### What Transfers

| Transferable Capability | Table Dimension | Why It Transfers |
|------------------------|----------------|-----------------|
| Declarative IaC, immutable images | Compute Resource | GPU cluster management needs IaC more, not less — Meta manages GPU infra with 2 million lines of Terraform. This is not optional. |
| Platform thinking: encode correctness as technical constraint | Governance & Platform Role | The governance objects change (service → model behavior), but replacing runbook discipline with admission controllers and policy-as-code works the same way. |
| Cluster lifecycle automation (build/upgrade/decommission) | Workload Shape | GPU training cluster lifecycle management mirrors Kubernetes cluster lifecycle. The automation patterns transfer directly. |
| Observability methodology: define SLOs first, then alert signals, then auto-recovery | SLA & Observability | The metrics change (SM utilization replaces P99), but the method — working backwards from user-visible SLOs to leading indicators — is identical. |

### What Needs to Be Rebuilt

| New Capability Required | Table Dimension | What Changes |
|------------------------|----------------|-------------|
| Resource model | Compute Resource | From "CPU overcommittable, elastic" to "GPU integer non-overcommittable, hard cost ceiling." Scheduling logic needs to be rewritten. |
| Failure philosophy | Failure Tolerance & Reliability | From "fast restart, stateless recovery" to "checkpoint-based stateful recovery." Failure cost goes from seconds to hours. |
| Network perspective | Communication Pattern | From "L7 traffic governance" to "collective communication performance tuning (NCCL/RDMA)." The network is now a compute resource. |
| Scaling logic | Scaling Unit | From "single Pod elastic scaling" to "Gang scheduling, all-or-nothing." One unschedulable worker blocks the entire job. |
| Execution unit mental model | Execution Unit & Determinism | Cloud Native has no equivalent. Agent action/side-effect is a new abstraction that needs to be built from scratch. |
| State management | Context & State | Stateless-by-default doesn't apply. Agent long context windows and persistent state require explicit Infra design. |

---

## How Platform Engineers Stay Sharp

The most common mistake I see is treating AI infrastructure as a specialization that requires starting over. It doesn't — but it does require deliberate bridging.

**Operate the tools you build.** The best way I've found to build intuition for AI infrastructure is to use AI-augmented systems in my own workflow. Building the MCP server for Cloud API access, deploying triage agents for incident response, iterating on those systems in production — that gives you a practitioner's understanding of what AI Native infrastructure actually needs to support that you can't get from reading papers.

**Approach AI from the operations side, not the algorithms side.** Platform engineers don't need to understand backpropagation. We need to understand GPU utilization curves, job failure patterns, checkpoint strategies, and collective communication topology. The systems perspective is the right entry point, and it's the one we already have.

**Build a mapping mental model.** For every Cloud Native concept you know deeply, find the AI Native equivalent. Kubernetes scheduler → Volcano/Gang scheduler. Service mesh → NCCL collective communication. Pod health check → GPU ECC error monitoring. Horizontal Pod Autoscaler → GPU utilization-based job preemption. The concepts aren't identical, but having a structured map makes the new domain learnable rather than overwhelming.

**Accept the new entry requirements.** InfiniBand, NCCL, CUDA, DCGM — these aren't optional enrichment. They're the foundation of how AI infrastructure actually works at training scale. The good news: the learning curve is steep but not long. A few weeks of hands-on work with a real GPU cluster is worth more than months of reading.

**The platform abstraction discipline remains the core skill.** Whatever the underlying hardware generation, the job of a Platform Engineer is the same: encapsulate the complexity, expose a stable interface, and make the right thing the easy thing. That skill doesn't expire.

---

## Closing: The Medium Changes, the Thinking Doesn't

Cloud Native taught me three things that I carry into AI Native work: design for declarative state, build platforms rather than tools, and encode correctness into the system rather than relying on human discipline.

AI Native infrastructure is harder in specific ways — the hardware is more expensive, the failure modes are more exotic, and the workloads are genuinely non-deterministic in ways that Cloud Native never was. It demands new technical knowledge and some genuine unlearning.

But the underlying engineering discipline is the same. The goal is still to take a rapidly evolving hardware and software landscape and build a platform layer that absorbs the complexity — so the people building on top of it can focus on what they're actually trying to accomplish.

The medium changes. The thinking doesn't.
