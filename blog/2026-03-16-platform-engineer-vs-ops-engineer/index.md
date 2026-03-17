---
title: "How Ops Engineers Can Stay Relevant in the Age of AI: Becoming a Platform Engineer"
date: 2026-03-16
authors: [austin]
tags: [cloud-computing, kubernetes, leadership, career-development]
description: "What actually separates a Cloud Platform Engineer from a DevOps/Ops Engineer — and why the gap matters more than ever in the age of AI."
---

Two engineers. Two hundred clusters. Half a million nodes. Two million instances. Every year, two major Kubernetes version upgrades across the entire fleet — with zero incidents.

That's not a team of twenty. That's two people. And the reason it was possible isn't the tooling. It's the way we thought about the problem.

After years building Cloud Platform at a large e-commerce company and interviewing dozens of engineers for Platform roles, I've noticed a pattern. Most candidates who call themselves "DevOps" or "Cloud Operations" engineers are skilled, hardworking, and technically capable. But there's a fundamental difference in how they think — and that difference determines whether you're managing problems forever, or systematically eliminating them.

<!--truncate-->

## The Interview Pattern

When I interview candidates for Platform Engineering roles, I ask questions that are deliberately open-ended. One of my favorites: *"How would you design a system to upgrade the OS across an entire Kubernetes fleet?"*

The Ops answer sounds like this: "I'd write an automation script that SSHs into each node, drains it, upgrades the OS, and brings it back. We could parallelize it with some batching logic."

That's a competent answer. It would work. It would also need to be rewritten for the next fleet, extended for edge cases, debugged when something goes wrong at 2am, and maintained forever by whoever wrote it.

The Platform answer sounds different: "I'd model node upgrades as a desired state in Kubernetes — write a CRD that declares the target OS version and upgrade policy, and a Controller that reconciles the actual state toward that target. The platform enforces the policy; engineers just declare what they want."

This is the gap I keep seeing. Many DevOps candidates can configure CI/CD pipelines, write Terraform workflows, and automate deployments on cloud platforms. They're genuinely good at it. But when they move to the next project or the next client, they do it again — from scratch. The work doesn't compound.

Another pattern: K8s fluency that stays at the surface. Most candidates can create Services, Deployments, and configure Pod specs. Far fewer have written a CRD or built a Controller. Using Kubernetes and *extending* Kubernetes are very different skills — and that distinction is a reliable signal of platform thinking.

## The Core Difference: Solving the Problem vs. Eliminating the Problem Class

The deepest difference between Ops and Platform thinking isn't the tools. It's the question you ask when something breaks.

An Ops engineer asks: *"How do I fix this?"*

A Platform engineer asks: *"Why does this keep happening, and how do I make it impossible for this class of problem to recur?"*

| | Ops Thinking | Platform Thinking |
|---|---|---|
| **When an alert fires** | Respond and resolve | Why does this alert exist? Can it be designed away? |
| **When teams ask "how do I deploy?"** | Write a runbook | Build a self-service deployment platform |
| **When the same bug hits three teams** | Fix each instance | Abstract the fix into a platform guardrail |
| **Customer** | The infrastructure itself | Internal engineering teams |
| **Goal** | Keep systems running | Enable teams to move faster and safer |

The customer question matters a lot. Ops engineers are often measured by uptime and ticket resolution. Platform engineers should be measured by the productivity and autonomy of the teams they serve. Your platform is a product. Your users are engineers. Their developer experience (DX) is your NPS score.

## A Real Example: What Platform Thinking Looks Like at Scale

At my previous company, our Cloud Platform team managed 200+ Kubernetes clusters serving 5,000+ applications, running on 500,000 nodes and 2 million instances. Every year, we needed to upgrade all clusters to the latest Kubernetes version, add roughly a third more clusters, onboard hundreds of new applications, and patch OS images monthly to eliminate critical security vulnerabilities.

There's simply no Ops path to doing this. No amount of runbooks or scripts scales to that complexity without becoming a full-time firefighting operation.

For Kubernetes version upgrades alone, the challenge looked like this: we had dozens of customer patches — custom configurations and modifications for each of the 20+ internal platforms using our clusters (web framework, search, Hadoop, database, AI platform, and more). Each platform needed to validate on the new K8s version. The validated release then needed to roll out to 200+ clusters with zero service disruption.

The Platform approach:

**Patch standardization.** Every customer patch was formalized: structured description, core requirements, design rationale, test cases. This structure made patches auditable, reviewable — and eventually, AI-generatable. When a new K8s version drops, we can now automatically generate upgrade PRs for each patch by combining the patch specification with the new version's changelog.

**Validation as a platform.** We stood up clusters running the candidate K8s version and opened them to each internal platform team. Teams owned their test cases and validation metrics. The platform ran validation automatically and produced test reports. Each platform could self-service their validation rather than waiting in a queue.

**Deployment as a platform.** The control plane upgrade platform supported configurable strategies — parallel batching, staged rollouts, automatic rollback gates — rather than a one-off script someone had to babysit.

Result: two engineers maintained this platform and executed two major upgrades per year, across 200+ clusters, upgrading nearly 100 components with dozens of patches, with no incidents.

The leverage is the point. Two people doing the work of what would otherwise require a large team — not because they worked harder, but because they built a system that worked for them.

## What Platform Thinking Actually Requires

After watching engineers develop (or not develop) this mindset over the years, I've identified five capabilities that distinguish platform thinkers:

**1. Abstraction over automation**

The most critical skill. Automation solves *a* problem. Abstraction solves a *class* of problems. The difference is whether your solution handles one team's specific deployment, or provides a general deployment capability that every team can use — including teams with slightly different requirements.

Abstraction ability determines whether you can solve one person's problem or a thousand people's similar-but-not-identical problems. It's what separates a script from a platform.

**2. Product thinking**

Platform engineers build internal products. That means thinking about API design, documentation, migration costs, and adoption. A platform no one uses isn't a platform — it's an expensive unused tool. The best platform engineers I've worked with obsess over their users' experience the same way product managers obsess over customers.

**3. Leverage mindset**

Ask yourself: does my work this week multiply my impact, or does it only solve today's problem? If one engineer's output can benefit 100 teams, that's leverage. If your work can only scale as fast as you can personally execute it, that's Ops. Both are valuable — but only one compounds.

**4. Systems over processes**

Ops culture tends toward process: checklists, runbooks, approval gates enforced by humans. Platform culture prefers system constraints: Policy as Code, Admission Webhooks, automated guardrails. A process can be skipped. A system constraint can't. Embed correctness into the platform rather than relying on people to follow rules correctly every time.

**5. Avoid being the hero**

Ops culture often produces heroes — the person who knows how everything works, who gets called at 2am, whose institutional knowledge is irreplaceable. That person looks valuable. But they're also a single point of failure, and they're not building anything that outlasts them.

Platform culture optimizes for "no heroes needed." Every capability should be self-service. Every critical piece of knowledge should be encoded in the system, not held in someone's head.

---

I've seen both trajectories play out on my team. One engineer spent decades in Ops thinking — always busy, always solving problems, always the person with the answers. But the work never compounded. The problems were always new versions of old problems. When the technology shifted, their knowledge became a liability rather than an asset.

Another engineer joined with limited Kubernetes experience. But he had platform instincts from the start: he asked "why does this keep happening?" before he asked "how do I fix this?" he thought about his changes in terms of who else could benefit. In three to four years, he went from junior engineer to leading the development of an autonomous upgrade platform.

The technology changes. The mindset is what compounds.

## The AI Factor: Why This Matters More Now

The rise of AI coding tools changes the calculus significantly.

AI is excellent at well-defined, repetitive work. Writing an automation script for a known task. Fixing a specific bug with a clear stack trace. Generating Terraform for a standard deployment pattern. This is precisely the work that fills an Ops engineer's day.

The Ops hero — the person whose value is encyclopedic knowledge of how systems behave — is increasingly replicable by a large language model that has been trained on more Ops knowledge than any individual could accumulate in a career.

Platform engineering is different. Abstracting specific, messy real-world requirements into a clean, general platform capability requires judgment that AI doesn't yet have. Deciding which non-functional requirements matter (reliability vs. cost vs. developer experience), where to draw abstraction boundaries, how to design for the 80% use case while not blocking the 20% edge cases — these are synthesis problems that require context, taste, and experience.

AI can help a platform engineer move faster. It can generate the implementation once the abstraction is clear. But it can't do the abstraction itself — at least not yet.

In other words: AI accelerates Platform engineering, but it replaces Ops work.

## Who Should Read This

This post is for Ops and DevOps engineers who want to make the transition — who are good at their jobs but sense that something is missing, that the work isn't compounding, that they're solving similar problems on repeat.

The transition isn't about learning new tools. Kubernetes, Terraform, and CI/CD platforms are table stakes. The transition is about changing the question you ask when you encounter a problem.

Not "how do I fix this?" but "how do I make this class of problem go away?"

Not "how do I automate this for this customer?" but "how do I build something that 100 customers can use without my involvement?"

Not "how do I become the person everyone depends on?" but "how do I build something that doesn't need me?"

An Ops engineer who doesn't think about platforms is not only leaving impact on the table — in the age of AI, they're also the most exposed. The work that fills an Ops calendar is exactly the work AI does well.

The engineers who will matter most in the next decade are the ones who build the systems AI assists with, not the ones who do the work AI replaces.
