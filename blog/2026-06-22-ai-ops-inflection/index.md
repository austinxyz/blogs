---
title: "The Ops Inflection: How AI Is Converting Open Problems Into Closed Ones"
date: 2026-06-22
authors: [austin]
tags: [devops, sre, ai, platform-engineering, reliability, agents]
description: "The TOIL wall is real. But it's not permanent. A progress report on two predictions — and the three architectural patterns that are moving the line."
slug: ai-ops-inflection
image: ./images/cover.jpg
---

![AI control room with incident dashboard, human monitoring at the edge](./images/cover.jpg)

Two posts set up predictions that are now testable against field data.

[*DevOps at Scale*](https://austinxyz.github.io/blogs/blog/devops-at-scale) predicted that organizations with mature DevOps — real SLO discipline, health-gated CI/CD, systematic observability — would be far better positioned for AI-native infrastructure than organizations that treated DevOps as theater. [*Who's Driving the AI-Native Organization?*](https://austinxyz.github.io/blogs/blog/ai-native-organization) identified the TOIL wall: the empirical finding that Ops automation is dramatically harder than Dev automation, explained through the open/closed problem lens. The first 60% of operational toil is closed — known failure modes, documented runbooks. The stubborn residue behaves like open problems — novel situations, ambiguous signals, judgment calls about what the problem even *is*.

What I said then was that the wall is real. What I didn't say was whether it's permanent. This is the progress report on both predictions — and the argument for why the wall moves.

<!--truncate-->

## Why Ops Was Always Harder for AI Than Dev

Dev and Ops were different disciplines long before AI entered the picture. I wrote about the platform engineering leverage model, SLOs as shared currency, CI/CD investment as the prerequisite for scale in [*DevOps at Scale*](https://austinxyz.github.io/blogs/blog/devops-at-scale). But there's a distinction that post didn't surface cleanly — the *character* of the work.

Development is a closed-problem discipline at its core. You write a spec, implement against it, verify against it. The problem statement can be pinned down, the acceptance criteria written. Spec-driven development makes this explicit: the whole point of the spec is to convert "what should we build" (open) into "does this implementation satisfy the spec" (closed).

Ops runs differently. Before AI, Ops knowledge lived in people's heads. The superheroes — engineers who could diagnose a cascading failure at 3am by pattern-matching against five years of incidents — weren't a luxury. They were the system. You couldn't write a runbook for half of what they knew because half of what they knew was judgment about incomplete information. An on-call engineer looks at ten metrics when the real signal is in a combination of forty. That's not a closed problem. That's a detective story.

This is why the TOIL wall sits where it sits. The 60% that AI closed easily was already closed: the runbooks existed, the signals were known, the diagnosis was routine. The 40% that remains is where the detective work lives.

## What's Actually Changing

A conversation with former colleagues recently shifted how I'm thinking about the trajectory.

One team has deployed an RCA agent that localizes root cause within five minutes of incident start. The detail that matters is *how* they built it. They didn't write a detailed SOP and check it step by step. They gave the agent a general SRE framework — how to think about RCA, what constitutes valid evidence, what the acceptance criteria for a diagnosis look like — and let it figure out the specifics.

That's a meaningful architectural choice. A prescriptive SOP is brittle: it handles exactly the cases it was written for and collapses on variants. A **principles-based agent** can reason across novel situations because it has the framework, not just a lookup table. It can hold more of the detective work.

A second team built a **knowledge graph** that models relationships between components and metrics, paired with MCP/CLI access so an agent can pull any signal it needs at diagnosis time. Before this, an on-call engineer surfaces maybe ten relevant metrics from experience. The agent can evaluate four hundred. The information incompleteness that made Ops problems *open* gets significantly narrowed when the agent has complete visibility rather than partial.

The third pattern is a **validation agent** — a second agent, initialized fresh without the first agent's accumulated context, that independently checks the diagnosis before mitigation triggers. This matters because an agent running a long incident investigation builds context that can bias its conclusions — the equivalent of a human investigator who has convinced themselves of one theory and stops seeing evidence against it. An independent agent doesn't inherit that bias. Two independent diagnoses agreeing is a materially stronger signal than one produced by an agent that's been reasoning in the same context for twenty minutes.

## The Pattern Underneath

These three approaches share a common logic: they're all converting open problems into closed ones.

The knowledge graph reduces the information incompleteness that makes Ops problems open in the first place. The principles-based agent gives the system a reasoning framework instead of a lookup table — the difference between a detective who knows how to think versus one who can only follow a checklist. The validation agent closes the verification loop that would otherwise remain open.

This is exactly what spec-driven development does on the Dev side. Writing a spec converts "what should we build" (open) into "does this satisfy the written requirements" (closed). The knowledge graph plus principles-based reasoning does the same thing for Ops: converting "what's wrong and why" from a detective story into a structured, evaluable claim.

The TOIL wall is real. But it's not a fixed wall. It's a measurement of how much of Ops work has been successfully converted into closed problems. These architectural patterns are moving that line.

## What's Still Hard

Mitigation confidence lags diagnosis confidence by a significant margin. Teams can build agents that reliably identify root cause. Building agents that reliably trigger the right mitigation — especially in novel failure modes, cross-system cascades, or situations with high blast radius — is a harder problem that hasn't been cracked at scale.

This tracks with the open/closed framework. Diagnosis is converging toward closed: given complete information and a structured reasoning framework, "what is wrong and why" can increasingly be answered. Mitigation is still partly open: "what is the right response, given uncertainty about second-order effects and organizational context" involves judgment that isn't fully encodable yet.

The gap will narrow. It's not narrow today.

## The Trajectory

Where this goes is fairly clear, even if the timeline isn't.

| Phase | Human role | AI role |
|-------|-----------|---------|
| Now | Confirms diagnosis, triggers mitigation | Assists diagnosis, surfaces signals |
| Near term | Monitors outcomes, handles escalations | Triggers mitigation on closed problems |
| Endpoint | Defines reliability standards, handles novel failure modes | Operates the system end-to-end |

As knowledge architecture matures and model capability grows, the ambiguous set shrinks. Ops problems that previously required a superhero's intuition get encoded in the knowledge graph, interpreted through a principles-based framework, verified by an independent agent. The human's role in that loop diminishes.

The endpoint is AI triggering mitigation directly — humans out of the Ops loop entirely.

There's a useful frame for evaluating progress: the **error budget**. If your AI Ops system operates within the error budget defined by your SLOs, the question "should we trust AI to trigger mitigation?" becomes math instead of philosophy. Is the AI operating within budget? Is human intervention improving outcomes or introducing variance? If the answers point the same direction, removing the human is the reliability-first decision.

SLO/error budget is the Turing test for Ops AI. Not whether the AI "thinks" — whether its outcomes, measured against the same standard applied to a human engineer, are within acceptable bounds. That's the bar. It's the same bar we use for on-call coverage.

## What to Build Now

The teams running these experiments aren't waiting for AGI. They're doing **knowledge architecture work** — mapping component relationships, encoding SRE principles, building feedback loops — that moves Ops problems from open to closed incrementally. If you're building toward this, the investment priority order is:

**First: knowledge architecture.** Map your component relationships. Encode your SRE principles. Make your telemetry queryable by an agent at incident time. This is the substrate everything else reads from. Without it, you're building intelligence on top of a blank page.

**Second: principles, not SOPs.** Design your agents around reasoning frameworks, not checklists. The checklist handles what you've already seen. The framework handles what you haven't.

**Third: independent validation.** Build verification into your architecture from the start. A second agent checking the first agent's work is not redundancy — it's closing the loop.

The superhero model of Ops was always fragile architecture. It walked out the door with the engineer, couldn't scale, couldn't be reviewed, and generated bus factor risk in everything it touched.

What's replacing it isn't AI magic. It's the same discipline that made platform engineering work at scale: encode the knowledge, define the interface, automate against the interface. The only difference is that the knowledge can be richer, the interface more expressive, and the automation more adaptive than any previous generation of tooling.

DevOps used to end with "you build it, you run it." The next version is "you build it, you define how to run it, AI runs it." The humans are still in the building. They're just not on the overnight shift.
