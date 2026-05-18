# System Design Interviews for Platform Engineers: A Practical Guide

System design interviews for platform roles differ from generic "design Twitter" interviews. The emphasis is on infrastructure trade-offs, operational concerns, and developer experience — not just scalability.

## The Framework: RADIO

Use RADIO to structure any system design answer:

**R — Requirements**: Clarify before designing. Ask: scale (users, QPS, data volume), SLA requirements (availability, latency), operational constraints (team size, existing systems to integrate with), and whether this is green-field or a migration.

**A — API Design**: Define the interface before the implementation. For platform tools: what does the developer CLI look like? What are the API endpoints? What events does the system emit?

**D — Data Model**: What do you store, where, and why? Distinguish between hot data (fast access, expensive), warm data (moderate), and cold data (cheap, slow). For platform tools, consider: config as code (Git-stored) vs config as data (database-stored) — each has different consistency and auditability trade-offs.

**I — Infrastructure Design**: Now draw the boxes. Layer your design: client tier → API tier → processing tier → storage tier. For platform engineering: add observability layer, secrets management, and deployment mechanism from the start.

**O — Optimization & Operational Concerns**: Where will this break at 10x load? What's the on-call story? How do you roll out changes safely? What's your rollback plan?

## Common Platform Engineering Design Questions

**Design an Internal Developer Portal**
Key decision: build on Backstage vs custom. Backstage has a plugin ecosystem but is complex to operate. Custom is simpler to start but you rebuild common features. Answer: use Backstage for mid-large orgs (200+ engineers), custom for small orgs or very specific needs.

**Design a Multi-Tenant Kubernetes Platform**
Key isolation dimensions: namespace isolation (soft), node pool isolation (medium), separate clusters (hard). Cost vs isolation is the central trade-off. Answer: start with namespace isolation + RBAC, graduate to node pools for sensitive workloads, separate clusters for compliance/regulated data.

**Design a CI/CD System for 500 Teams**
Key challenges: build caching (mono-repo vs poly-repo changes everything), test parallelization, artifact management, deployment approvals. Answer: separate "build" (fast, cheap, parallelizable) from "deploy" (gated, auditable, progressive).

**Design a GPU Training Job Scheduler**
Key tensions: utilization vs fairness, priority preemption, gang scheduling (all-or-nothing for distributed jobs). Answer: Volcano or Kueue for K8s-native scheduling; describe the queue → scheduling → preemption lifecycle.

## The Behavioral Dimension

For Staff-level roles, every system design question has an implicit behavioral component:
- "Who would you align with before making this decision?"
- "How would you get adoption from skeptical teams?"
- "What would you do differently if you were doing this again?"

Prepare one real story for each of the four common designs above. "I actually built something similar at [company]" is worth more than a perfect theoretical design.

## Timing

45-minute system design interview:
- 5 min: requirements clarification
- 5 min: API/interface design
- 20 min: core design (draw boxes, explain choices)
- 10 min: deep dive on the area they care most about
- 5 min: operational concerns + your questions

If they cut you off to go deeper earlier, that's good — they're engaged.
