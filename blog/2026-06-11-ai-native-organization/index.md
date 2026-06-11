---
title: "Who's Driving the AI-Native Organization? A Field Report from Actually Building One"
date: 2026-06-11
authors: [austin]
tags: [ai, ai-native, organization, spec-driven-development, agents, management]
description: "A field report from building an AI-native org: spec-driven SDLC, agents for TOIL, AI-assisted management — and who actually drives."
slug: ai-native-organization
image: ./images/cover.jpg
---

![Human driving with AI hologram copilot](./images/cover.jpg)

Everyone is writing AI-native organization manifestos right now.

Jack Dorsey published [*From Hierarchy to Intelligence*](https://block.xyz/inside/from-hierarchy-to-intelligence) in March, arguing that corporate hierarchy is a two-thousand-year-old information routing protocol that AI makes obsolete. Ivan Zhao wrote [*Steam, Steel, and Infinite Minds*](https://www.notion.com/blog/steam-steel-and-infinite-minds-ai), framing AI as this era's miracle material — the steel of our gilded age. Both essays are worth your time. Both are also written from the CEO's chair.

I've been running the experiment from a different seat. At my previous company I started pushing the organization toward AI-native ways of working. This year the experiments have accelerated, on every layer I can reach: the development lifecycle, operations, and management itself. This post is the field report — what worked, where the walls are, and the one distinction the manifestos miss.

<!--truncate-->

## Three Tracks of Practice

The transformation runs on three tracks.

**Track 1: Spec-driven development for the whole SDLC.** Not AI autocomplete — restructuring the development loop itself around specs. I've documented the journey in a five-part series: [the shift from vibe coding to spec-driven development](https://austinxyz.github.io/blogs/blog/2026/03/06/claude-code-spec-driven-development), [stacking OpenSpec and Superpowers into a combined workflow](https://austinxyz.github.io/blogs/blog/openspec-superpowers-combined), [the frictions that showed up three weeks in](https://austinxyz.github.io/blogs/blog/openspec-superpowers-three-weeks-later), [adding a harness so the loop closes without me](https://austinxyz.github.io/blogs/blog/openspec-superpowers-harness), and [what breaks when you add more engineers](https://austinxyz.github.io/blogs/blog/openspec-harness-team-workflow). The short version: features that took 2-3 days now take hours, and the bottleneck has moved from implementation to spec quality and team coordination.

**Track 2: Agents for customer support and issue triage.** The goal is killing TOIL — the repetitive operational work that burns out engineers. I've built these two ways: Claude-skills-style agents that live inside the working environment, and standalone agents on LangGraph for flows that need their own state machines. Both patterns work. Neither works as completely as I'd hoped — more on that below.

**Track 3: AI-assisted management.** I use Claude Cowork as the connective layer across JIRA, Gmail, Google Docs, Notion, and Zoom. Status synthesis, meeting prep, follow-up tracking — the routing-and-relaying part of management that Dorsey's essay correctly identifies as protocol work. I've also written about what this shift means for each role: [junior engineers](https://austinxyz.github.io/blogs/blog/2026/03/04/no-junior-engineers), [senior engineers](https://austinxyz.github.io/blogs/blog/2026/05/13/senior-engineer-ai-trap), [engineering managers](https://austinxyz.github.io/blogs/blog/2026/03/23/engineering-manager-in-ai), and [ops engineers](https://austinxyz.github.io/blogs/blog/2026/03/16/platform-engineer-vs-ops-engineer).

## What the Experiments Taught Me

**Systematic use multiplies. Point use gets absorbed.** Use AI systematically — specs, agents, management tooling, all of it — and one person covers multiple roles. 5-10x productivity is real; I've lived it. But deploy AI at a single point — say, coding gets faster — and the gain gets eaten by everything around it. Requirements still arrive slowly, reviews still queue, releases still wait. It's Amdahl's Law for organizations: speed up one stage and the others become your ceiling. This is why "give everyone a copilot" underwhelms. It makes the old organization slightly faster instead of building a new one.

**A team of superheroes is not automatically a super team.** When every engineer becomes a multiplied individual, coordination becomes the scarce resource. My answer so far is to let the process do the coordinating. The spec-driven workflow surfaces conflicts at propose time instead of merge time, and the spec accumulates decisions so later work — human or AI — reads from the same context. But process is only half of it. The other half is mindset. People have to trust the new way of working, and that trust runs in two directions. Trust in AI is rationally incomplete — there are still things it can't do. Trust between humans is the one that worries me more. It's easy to sink into the conversation with your AI and starve the conversations with your colleagues. Organizations exist because humans need to collaborate. That muscle still needs deliberate exercise.

**Humans move to the edge — and that's a promotion.** The same pattern keeps repeating across all three tracks: humans decide what to build, verify what was built, and handle the exceptions. Everything in between increasingly belongs to AI — which means AI needs to run autonomous loops and sustain long tasks without a human watching. A year ago I'd have called that aspirational. Now, with dynamic workflows and long-horizon capability improving with every model release, I'm increasingly confident. My own harness — OpenSpec + Superpowers + CI/CD + evaluation loops — already closes the loop on feature development without me in the middle. A general doesn't fire the rifles. Moving to the edge means doing the higher-leverage things.

**Files are the source of truth.** Every experiment that worked shared one property: the AI persisted its plan, its artifacts, and its logs as files. Files are what humans review. Files are what the next AI run loads as context. Files are what turn a one-shot interaction into a loop. Dorsey makes a version of this point — Block's remote-first culture made everything machine-readable. My experience says it's stronger than that: it's not optional. If the work isn't written down, the intelligence layer has nothing to reason over.

**The TOIL wall is real.** Here's the result that surprised me most. An agent that resolves 60% of operational toil is easy to build. Pushing it to 90% is dramatically harder, and 90 to 95 is harder again — the difficulty doubles as you climb. The reason is in the nature of toil itself: it's toil precisely because it's full of irregularity and uncertainty. The cases left after the easy 60% are the weird ones. Meanwhile, building a *feature* with spec-driven development closes far more easily — requirements can be pinned down, verification can be automated, the loop completes. That asymmetry bothered me for a while. The explanation came from an unexpected place — I'll get to it in a moment.

**The cost equation changed.** An engineering organization's cost used to be headcount. Now it's headcount plus tokens. Token budgets, model routing, deciding which tasks deserve the expensive model — a new line item managers don't have instincts for yet. We're developing them in real time.

## Where the Manifestos Land

Back to Dorsey and Zhao, now with the scar tissue to evaluate them.

**Zhao is right about the waterwheel.** His best image: early factory owners swapped steam engines in for waterwheels and kept the same building layout, and productivity barely moved. The breakthrough came from reorganizing the factory around the new power source. That's the systematic-vs-point distinction my experiments kept confirming. The miracle material doesn't pay off until the organization reshapes itself around it. Most companies today, mine included, are still partway through the reshaping.

**Dorsey is right about hierarchy — with a caveat.** His argument: hierarchy exists because humans can only hold so much context, and AI can hold a continuously updated model of the whole business, so the routing layers can go. My practice agrees, with one operational footnote the essay underplays: that full context doesn't exist unless you build it. It has to be deliberately persisted — files, specs, logs, decision records. "The company as an intelligence" is downstream of "the company writes everything down." He's also right that humans become edge nodes, and the reason it's becoming true now is long-task capability. As AI sustains longer and more complex tasks, the roles between idea and verification compress. One person covers what used to be several jobs. What remains for humans concentrates on the business itself.

**The missing piece: who's driving?** The sharpest framing I've encountered comes from a Chinese essay, [*Thoughts on the AI-Native Organization*（AI Native 组织的思考）](https://mp.weixin.qq.com/s/dG0l48XYtUXNZ5iNn621aw) by the WeChat writer 闲庭落木, which splits an organization's work into **closed problems** and **open problems**. A production bug is a closed problem: the problem statement is complete, and solving it is the whole job. AI keeps getting better at these, and for them, Dorsey's model is correct — AI drives, humans assist at the edge. An open problem is different. The hard part is *finding the right question*, and the answer often starts as a picture in someone's head that language hasn't captured yet. For those, the seats swap — the human drives, and AI is the instrument.

This distinction finally explained my TOIL wall. The first 60% of operational toil is closed: known failure modes, known runbooks. The stubborn residue behaves like open problems — novel situations, ambiguous signals, judgment calls about what the problem even *is*. Feature development closes easily under spec-driven development because writing the spec is exactly the act of converting an open problem into a closed one. The harness takes it from there.

And it reframes Dorsey's conclusion in a way I find more durable. He says humans remain valuable for "insight the model can't reach." The open/closed lens says why: the business itself — what to build, for whom, why now — is mostly open problems. That's the driver's seat humans keep.

## The Day That Changes

My current architecture for the AI-native organization, compressed: convert every closed problem you can into an AI-driven loop with humans at the edge. Persist everything as files so the loops can run. Concentrate your humans on the open problems, with AI as the most capable instrument they've ever held.

The ratio of open to closed problems differs by business, so AI-native organizations won't all look alike — and they won't all collapse into one-person companies either.

Humans take the driver's seat on open problems. That's not a consolation prize; it's the highest-leverage seat in the building. And if a day comes when AI can hold that seat too — when it can find the right question before anyone can articulate it — then we won't be debating organizational charts anymore. That's the day AGI actually arrives.
