---
title: "DevOps Is a Culture, Not a Team: What I've Learned Building at Scale"
date: 2026-04-26
authors: [austin]
tags: [devops, sre, platform-engineering, kubernetes, cloud-computing, leadership]
description: "After 20 years running infrastructure at scale, here's what DevOps actually means — and why the most common implementation is an anti-pattern."
---

Every organization that has gone through a "DevOps transformation" in the last decade has a story. Most of those stories end the same way: they hired a DevOps team, bought a set of tools, and then wondered why things didn't meaningfully change.

I've been building and running infrastructure at scale for 20 years — from private cloud on OpenStack at a large-scale e-commerce platform to managing 200+ Kubernetes clusters, 50,000 nodes, and 5,000+ applications. If there's one thing I've learned, it's that the most common implementation of DevOps is actually an anti-pattern.

Let me explain what I mean.

<!--truncate-->

## DevOps Is a Culture, Not a Team

The first and most important thing to understand about DevOps is that it is a **cultural movement**, not a tool, a team, or a job title.

DevOps was born in 2009 out of a simple frustration: "dev ships, ops runs" creates systemic accidents. When the team that builds a service doesn't run it, they build it differently — less observably, with less concern for operational burden, with less skin in the game when 3am pages fire. The solution isn't tooling. The solution is ownership.

The core mental model is: **"you build it, you run it."** Teams own their services in production end-to-end. That changes everything about how software gets built.

The classic anti-pattern is creating a "DevOps team." At a surface level, this seems reasonable — put some experienced engineers in a room, give them the title, and let them drive the transformation. But what you've actually done is recreate the original dev-vs-ops silo as a new gatekeeper. The DevOps team becomes the bottleneck, the org breathes a sigh of relief at having "done DevOps," and the culture doesn't change at all.

The CALMS framework captures the full scope: **Culture, Automation, Lean, Measurement, Sharing.** Most organizations focus on Automation (which is important) and skip Culture and Measurement (which are harder). That's why most DevOps transformations fail — not because the tools are wrong, but because the work that matters most isn't about tools.

## Platform Team: The Operationalized Version of DevOps at Scale

In [a previous post](https://austinxyz.github.io/blogs/blog/2026/03/16/platform-engineer-vs-ops-engineer), I wrote about the difference between ops thinking and platform thinking. Platform Engineering is where DevOps becomes operationalized at scale.

At small scale — under 50 engineers — every team can do DevOps from scratch. Everyone knows each other, context is shared, incidents are rare. You can get by without formal DevOps investment.

But at larger scale, the "every team does DevOps from scratch" approach breaks down fast. Each team is reinventing CI/CD, building their own observability stack, figuring out their own on-call process, and doing all of it slightly differently. The cognitive load multiplies across the organization. Engineers burn out on infrastructure concerns instead of building product.

That's where Platform Engineering comes in. A Platform team builds the **paved path** — a curated, opinionated set of internal tools that other teams consume as a product. CI/CD that just works. Terraform modules that encode your organization's security and cost policies. Observability out of the box. On-call runbooks that don't require each team to rediscover what APF misconfiguration looks like at 2am.

Critical point: the platform team is not doing application ops. They're running the platform itself — the K8s clusters, the CI/CD system, the observability stack — and treating other engineering teams as their customers. Their metric isn't uptime; it's the productivity and autonomy of the teams they serve. Developer experience is the NPS score.

## The Ops Lifecycle: More Than Provisioning and Deploying

When people describe Ops work, they usually reach for the visible tools: Terraform for provisioning, CI/CD for deployment, monitoring for observability. That's a useful shorthand, but it misses where the real complexity lives.

The full service lifecycle looks like this:

```
Design → Provision → Deploy → Operate → Evolve → Retire
```

Provisioning and deployment are the starting line. The sharp-edge is **Operate** — managing cognitive load across hundreds of services, sustaining a healthy on-call rotation, and keeping engineers in "engineering mode" rather than "firefighting mode."

At scale, without the right practices, Operate becomes a tar pit. Incidents are handled ad hoc by whoever happens to be available. The same problems recur because postmortems don't produce real follow-up. On-call engineers burn out, institutional knowledge walks out the door, and you're back to square one. That's why Platform Engineering exists — not primarily to make provisioning easier, but to make operating sustainable.

This also changes how you think about automation. Automating provisioning is table stakes. The higher-leverage automation is in Operate: AI-assisted incident triage, automated rollback, error budget dashboards that make reliability debates into math problems rather than politics.

## IaC: Not Just Terraform, But a Mindset Shift

I should be transparent about something: we didn't use Terraform extensively for our Kubernetes fleet. Our tooling was homegrown — a GitOps-based system with per-cluster YAML configurations, a custom controller (which we called Releaser) that reconciled desired state toward actual state, and eventually ArgoCD as the community-supported path.

But the IaC *mindset* was the same: infrastructure as code means infrastructure is reviewable, auditable, and rollback-able. When a configuration change causes an incident, you have a git history that tells you what changed, who changed it, and when. When a new cluster needs to be built, you're not reconstructing it from institutional memory — you're applying a known-good spec.

The bigger shift at scale was establishing what I'd call shared automation contracts. Our cluster fleet — 200+ clusters, 20+ types including Kubernetes control planes, Hadoop, API gateways — had no common interface across the component teams responsible for each lifecycle phase: network, security, app lifecycle, Hadoop. Every cluster type had its own manual process with no reuse.

We fixed this by defining a common interface each component team could implement independently. Once that contract existed, automation could be built once and applied across all cluster types. The decommission process that used to take several weeks dropped to a few days, and the capacity team gained self-service control over the entire flow. The cluster build pipeline for the API gateway hit a one-week target. The value wasn't the automation itself — it was the shared contract that made the automation generalizable.

This is what IaC thinking really means: not just "write Terraform," but "make infrastructure an agreed interface that multiple teams can reason about, review, and automate against."

## CI/CD: What Good Actually Looks Like

CI/CD is where DevOps investment becomes most visible — and where the gap between CI/CD theater and real practice is most apparent.

CI/CD theater looks like this: the pipeline exists, tests run, deployments happen. But teams still batch commits for a weekly deploy. Change review is a rubber stamp. Canary deployments are disabled because they're "too complicated." Nobody has agreed on what a rollback means. DORA metrics? Never heard of them.

Real CI/CD practice is measured. The DORA framework provides four metrics that correlate with high-performing engineering organizations: **Deployment Frequency**, **Lead Time for Changes** (commit to production), **Change Failure Rate**, and **Time to Restore Service** (MTTR). Elite-tier teams deploy on demand with sub-one-hour lead time and sub-one-hour MTTR. Those numbers aren't goals; they're outcomes of mature practice.

My team owned the Cloud Control Plane CI/CD pipeline — Prow for CI with mandatory e2e test gates, Releaser for GitOps-based CD across 200+ clusters. The more interesting piece was the Federated Deployment Controller we built: a custom Kubernetes controller that orchestrated progressive rollouts cluster by cluster, queried an AI-based health detector for automated go/no-go signals, and triggered automatic rollback on degradation.

We built it for our own control plane deployments. The ECD team — responsible for CI/CD for hundreds of application teams — adopted it as their standard multi-cluster CD mechanism. That's the infrastructure team leverage pattern: build something for your own workload that turns out to generalize. The key wasn't the technology; it was the model. Progressive delivery with automated health gating removes a whole class of "we deployed and broke everything" incidents. Change management becomes controllable, not just visible.

Infrastructure-side, the reliability lessons were equally important: dedicated CI/CD node pools (so pipeline spikes can't starve production scheduling), API Priority and Fairness to rate-limit CI/CD traffic against the Kubernetes API server, and a gateway layer to absorb burst job submissions. We learned these the hard way — CI/CD-induced API server overload was a real incident class before we addressed it structurally.

## SLO/SLI: Turning Reliability Into a Currency

SLOs are often presented as a measurement exercise: define your SLI, set a target, track it. That framing misses the real value.

SLOs turn reliability into a **shared currency** between product and engineering. The error budget is the mechanism. You have N minutes of allowed downtime per month (based on your SLO). As long as you're within budget, ship aggressively. When you're burning through budget, pause feature work and invest in reliability. The debate — "should we slow down?" — stops being a political argument and becomes a math question: "what does the error budget say?"

I learned this first-hand implementing SRE practices for a large-scale Kubernetes API server fleet. When I took over, the Federated API Server — the primary entry point for all platform clients — was operating below 90% availability. The worst incident: a Dev API Server stayed down for two full days. No SLOs, no runbooks, no on-call rotation. Every outage was handled ad hoc.

The first decision that mattered: I set the initial SLO at **99%, not 99.9%**. This was counterintuitive to leadership. But an SLO you can't sustain is worse than no SLO — it teaches engineers to ignore the signal. Starting at 99% from a sub-90% baseline gave meaningful headroom to improve without constant error budget exhaustion. We graduated to 99.9% as infrastructure stabilized and the team developed confidence in the measurement methodology.

The graduated approach mattered. SLOs also serve as an internal triage signal — when availability starts dipping, you know where to look before it becomes an incident. We used built-in Kubernetes Prometheus metrics as the SLI source (no parallel instrumentation project required), established a burn rate alert policy, and set up regular cadence to review incidents and burn rate.

Results: Federated API Server went from below 90% to 30-day rolling average of 99%+ in dev environments, sustained 99.9% in production. MTTD reduced to ~20 minutes. MTTR dropped from 24+ hours (worst case) to under one hour for defined incident classes.

One operational detail that mattered: we tracked postmortem action items in the **sprint backlog**, not on a separate postmortem board. Teams that park RCA items on a separate tracker find those items never getting resolved. Mainlining them into sprint planning made follow-through the default.

## High Scalability: Where DevOps Value Compounds

There's a common framing that gets the causality backwards: "at high scale, you *need* DevOps." That's true, but the more important insight is the opposite: **DevOps investment is what makes high scale possible in the first place.**

At small scale, manual ops works fine. Teams know each other, incidents are rare, context is shared. DevOps is nice-to-have. At 200+ engineer teams running 5,000+ applications across 50,000 nodes, none of that is true. Without IaC, provisioning becomes the bottleneck. Without mature CI/CD, release velocity drops as change risk grows. Without SRE practices and observability, incident response burns out the on-call rotation.

The math is simple: if every team that needs to deploy does so manually, your deployment capacity grows linearly with headcount. If you invest in CI/CD that enables self-service deployment, it grows independently. At the scale we were operating at, we were handling 35,000+ deployments per week across 20,000+ app pools. That number is only possible because of platform-level automation — no team of humans could manage it manually.

The flywheel is: DevOps investment reduces operational friction → engineers spend more time building → more capacity for building better DevOps tooling → further reduction in friction. Elite-tier teams aren't faster because they work harder. They've removed the friction that scale introduces.

This is also why Platform Engineering emerges naturally at scale. It's not an organizational preference — it's the only architecture that doesn't require linear headcount growth to maintain linear reliability. A platform team of 10 engineers supporting 500 developers is leverage. 500 developers each spending 20% of their time on undifferentiated DevOps work is waste.

## The AI Factor: DevOps as the Foundation for AI-Native Development

The next inflection point is already visible: AI-native applications — LLMs, inference pipelines, model training workflows — introduce a new class of infrastructure challenges on top of everything DevOps already handles.

Model training needs burst GPU provisioning at a scale that breaks traditional IaC assumptions. Inference serving requires rapid scaling with traffic patterns that differ fundamentally from web services. Experiment tracking and model versioning add new dimensions to deployment management. And the failure modes — model degradation, distribution shift, silent accuracy regression — aren't caught by traditional application metrics.

The good news: everything discussed above is the *foundation* for AI-native infrastructure. If your organization has mature IaC, CI/CD with health-gated progressive delivery, and SLO discipline — you're far better positioned to extend those practices to AI workloads than an organization starting from scratch.

The bad news: many organizations are trying to build AI-native capabilities on top of immature DevOps foundations. You can't reliably run LLM inference at scale if you don't have basic SLOs. You can't safely promote model updates if your deployment pipeline lacks automated rollback. The problems compound.

The organizations that will do AI-native infrastructure well are the ones that treated DevOps as a serious discipline — not theater — before AI made everything more complex.

---

After 20 years, the part I've changed my mind about most is this: I used to think DevOps was primarily a technical problem. Better tools would lead to better outcomes. What I've learned is that the technical problems are the easy part. The hard part is getting engineers to own their services in production, building a culture where postmortems produce real change, and investing in platform capabilities that reduce friction for everyone.

Tools follow from culture. Culture doesn't follow from tools.

The teams I've seen do this best share one characteristic: they didn't wait for a "DevOps transformation" initiative to start. They just started building the habits — shared ownership, measurement, automation, blameless retrospectives — and the tools emerged from those habits as expressions of clear principles.

That's what DevOps is. Everything else is just technology.
