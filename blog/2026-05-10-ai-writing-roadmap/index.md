---
title: "My AI Writing Roadmap: Four Tracks From Infra to Agents"
date: 2026-05-10
authors: [austin]
tags: [ai]
description: "Why I split my AI writing into four tracks — Infrastructure, Methodology, Roles, Agents — what's published in each, what's coming next, and how I pick topics."
slug: ai-writing-roadmap
---

![Four luminous nodes arranged in a continuous loop on a topographic dark map — the visual thesis: four AI writing tracks, one cube.](./images/ai-writing-roadmap-cover.png)

I write about AI on this blog. Not "AI in general" — that's too big to write coherently about as a single topic. You end up writing platitudes. Instead, I write across four tracks, each anchored to a place where I've actually paid the cost of learning.

Since the start of the year, I've accumulated enough AI-related posts that it's time to step back and lay out the structure they fit into. This post is the map: what the four tracks are, why they hang together, what's already published in each, and what's coming next. If you've ever landed on the blog from one post and wondered whether the rest is worth your time, this is the index.

<!--truncate-->

---

## Why Four Tracks

Most AI blogs I read pick one lane and stay in it. Researchers write about model architecture. Tutorial writers write about prompts. Pundits write about jobs. Each is useful, and each is partial.

The thing I keep wanting to read — and don't find enough of — is the perspective of someone who has to make all of it work at once. The platform engineer who has to land GPU clusters and also manage the team that uses them. The senior dev whose IDE now writes 70% of the typing and who also has to decide what to even type. The architect who has to design systems that include non-deterministic agents and also evaluate whether the junior pipeline still feeds them.

That's the seat I write from. Four tracks fall out naturally:

1. **AI Native Infrastructure and DevOps** — what changes underneath when GPUs and agents become first-class workloads, and how the operating practices that keep them alive have to evolve.
2. **Dev Methodology in the AI Era** — how the discipline of writing software evolves when AI does most of the keystroke work.
3. **Engineering Roles in the AI Era** — how every seat at the engineering table is being rewritten, asymmetrically.
4. **Agent Engineering** — three-layer coverage of building agents: platform, patterns, hands-on code.

Each track maps to a place where I've actually done the work. I ran one of the larger Kubernetes deployments I know of — 200+ clusters, 5,000+ applications, 50,000 nodes, 2 million instances — so I have something to say about what does and doesn't transfer to AI Native infra. I've shipped real features using Vibe Coding, OpenSpec, and Superpowers, so the methodology track is reported, not theorized. I've sat in IC, senior dev, architect, and engineering manager chairs at different points, which is why the roles track tries to cover the whole table rather than one seat. And the agents I write about are the ones running my own finance knowledge base and stock analysis pipeline — not hypothetical demos.

The tracks don't try to be exhaustive. They try to be honest about where I have a perspective worth reading.

Looked at together, the four tracks close a loop. **Track 4** is the thing you're building — an agent. **Track 3** is the people who build it. **Track 2** is the discipline they use. **Track 1** is the platform that has to host the result. Each one feeds the next: a harder agent forces methodology to bend, which forces roles to absorb new work, which forces infra to host a different shape of workload. I write across all four because they only make sense as a system.

---

## Track 1 — AI Native Infrastructure and DevOps

**The angle:** Cloud Native taught us how to run stateless, elastic, predictable workloads. AI Native breaks several of those assumptions — GPUs can't be overcommitted the way CPUs can, models have minute-scale cold starts instead of second-scale, and the failure modes are stochastic rather than crash-or-not. About 70% of what we built for Cloud Native — at the infrastructure, platform, and DevOps layers — transfers. The other 30% has to be rebuilt. This track is the practitioner's account of what's in each bucket, including how operating practices themselves have to evolve.

### Published

| Post | What it covers |
|------|----------------|
| [Cloud Native → AI Native Infrastructure](/blog/cloud-native-to-ai-native-infra) | GPU clusters, schedulers, hardware platform management |
| [Cloud Native → AI Native App Platform](/blog/cloud-native-to-ai-native-app-platform) | Application platform layer for model and agent workloads |
| [IaC and Kubernetes as a Two-Layer Control Plane](/blog/iac-k8s-ai-native) | Why the IaC + K8s split survives the transition |
| [DevOps at Scale](/blog/2026/04/26/devops-at-scale) | How DevOps practices hold up at hundreds of clusters and tens of thousands of nodes |
| [The Ops Inflection: How AI Is Converting Open Problems Into Closed Ones](/blog/ai-ops-inflection) | Progress report on two predictions — the TOIL wall is real but moves; three architectural patterns that are shifting the open/closed boundary in ops |
| [The Ops Inflection, Verified: A Field Check on the Three Patterns Moving the TOIL Wall](/blog/ops-inflection-verified) | The three patterns checked against industry practice — the same deterministic-vs-reasoning argument recurring at three layers, and why the validation agent is the leading indicator for autonomous ops |

### Coming next

| Post | Why it matters |
|------|----------------|
| Agent Runtime on AI Native Platform | Bridges this track and the Agent Engineering track. Agents need a different runtime profile from both stateless web apps and batch ML training, and the platform implications are real. |
| Agent DevOps | When the workload is an agent that calls tools, spawns subagents, and produces non-deterministic output, the DevOps playbook — observability, rollouts, runbooks, incident response — has to be redesigned. |

The reason this track exists at all is that I find most AI infrastructure writing either too high level ("GPU compute is different!") or too narrow (a single inference optimization technique). The interesting writing happens at the platform level — where a few dozen architectural choices end up determining what tens of thousands of users can actually do.

---

## Track 2 — Dev Methodology in the AI Era

**The angle:** The biggest change isn't *what* we build with AI — it's *how the work gets done*. Vibe Coding is real, and it's neither hype nor a productivity miracle. Spec-Driven Development is what comes after Vibe Coding burns the people who try to scale it. There's a methodology arc here, and most of the noise online conflates the stages.

### Published

| Post | What it covers |
|------|----------------|
| [Claude Code Series (Overview)](/blog/2025/12/14/claude-code-series-overview) | Entry point to a seven-part series — introduction, walkthrough, methodology evolution, use cases, and conclusions |
| [10x Productivity — An Honest Take](/blog/2026/03/01/ai-vibe-coding-10x-productivity) | Where the 10x claim is real, where it's marketing, and what actually changes |
| [From Vibe Coding to Spec-Driven Development](/blog/2026/03/06/claude-code-spec-driven-development) | The arc most teams have to traverse — and why Vibe Coding alone breaks at the team boundary |
| [Agile Development in AI Coding](/blog/2026/03/09/agile-development-in-ai-coding) | How sprint, story, and review practices have to bend |
| [Stacking OpenSpec and Superpowers](/blog/openspec-superpowers-combined) | A combined SDD workflow that shipped a real refactor in 3 hours with 86 new tests |
| [Stacking OpenSpec and Superpowers, Three Weeks Later](/blog/openspec-superpowers-three-weeks-later) | Five friction points from running the stack across multiple projects, and the plugin that packages the evolved workflow |
| [Stacking OpenSpec and Superpowers, Then I Added a Harness](/blog/openspec-superpowers-harness) | An independent evaluator subagent spawns per group — fresh context, explicit contract, structured scoring. The workflow now knows what "done" means without asking me. |
| [OpenSpec + Harness, Then We Added Engineers](/blog/openspec-harness-team-workflow) | What breaks when individual AI acceleration hits the team — branch model, parallel conflict detection, four-layer achieve gate, and JIRA integration that enforces DoD automatically. |
| [Why Does the AI Field Keep Reinventing Things We Already Knew?](/blog/treat-ai-like-person) *(Series: Treat AI Like a Person, Part 1)* | The mental model that cuts through all the new terminology: treat AI like a person, and 90% of concepts resolve to engineering practices you already know. |
| [Why "Treat AI Like a Person" Is More Precise Than It Sounds](/blog/treat-ai-like-person-p2) *(Part 2)* | AI capability isn't a single axis — it's a jagged frontier. How to read the gap map and use it as a practitioner's tool. |
| [Why AI Can Do Half of Every Social Skill: A Case for the Consequence Check](/blog/treat-ai-like-person-p3) *(Part 3)* | Every social capability splits: the half rooted in rules and coordination that AI can genuinely carry, and the half rooted in limitedness and belonging that it can only imitate. The dividing line is consequence. |
| [Treat AI Like a Person: The Philosopher's Warning, the Engineer's Response](/blog/treat-ai-like-person-p4) *(Part 4)* | Harari says AI will hack civilization's language layer. An engineer's response: the threat is real, the mechanism is slightly off — and the consequence check is still the right frame. |
| [OpenSpec + Sandbox: Your CI Pipeline Is the Wrong Tool for AI Coding Agents](/blog/openspec-sandbox) | Signadot dev-time sandboxes close the integration-testing gap inside the agent's own loop instead of a 20-minute CI wait. Written jointly with Signadot. |

This track is reported, not researched. Every post in it describes work I actually shipped using the tool described, with the rework rate, defect rate, and time-to-merge attached. That's the reading promise: no methodology I haven't run myself.

---

## Track 3 — Engineering Roles in the AI Era

**The angle:** AI doesn't change every engineering role by the same amount. Some seats compress hard (the junior IC pipeline). Some seats get more important (the senior who can decompose ambiguous problems for AI). Some seats become harder to fill (the architect who has to design around non-deterministic components). I want the full map, not the one-role takes.

### Published

| Post | What it covers |
|------|----------------|
| [No More Junior Engineers? What AI Really Means for Early-Career Developers](/blog/2026/03/04/no-junior-engineers) | The most controversial seat — what happens to the entry-level IC role when AI does the work a junior used to do |
| [How Ops Engineers Can Stay Relevant in the Age of AI: Becoming a Platform Engineer](/blog/2026/03/16/platform-engineer-vs-ops-engineer) | Ops thinking is fixing problems; platform thinking is making classes of problems impossible. AI accelerates that shift. |
| [The AI-Augmented Engineering Manager: How I Run a Team in 2026](/blog/2026/03/23/engineering-manager-in-ai) | What the EM role looks like when your team's output is 3x but your team size stays the same |
| [The Senior Engineer's AI Trap: Why Experience Works Against You](/blog/2026/05/13/senior-engineer-ai-trap) | Why technically strong engineers fall into specific AI adoption traps — and what the third career transition actually looks like |
| [The Product Manager Went Everywhere](/blog/pm-ai-era) | The PM role isn't dying — it went everywhere. What product management looks like when build costs collapse and every engineer becomes a mini-PM. |

### Coming next

| Post | Why it matters |
|------|----------------|
| Architect in the AI Era | Designing systems that include agents as first-class components is a different discipline. |

The seats compress asymmetrically. That's the thesis the track exists to defend.

---

## Track 4 — Agent Engineering

**The angle:** Three-layer coverage. Bottom: the platform infrastructure that hosts agents. Middle: the design patterns that recur across agent systems. Top: hands-on code, the actual building of an agent end-to-end. Most agent writing online sits at one layer. I want to write at all three because the layers inform each other.

### Published

| Post | What it covers |
|------|----------------|
| [Taming AI Agent Uncertainty](/blog/2025/12/25/taming-ai-agent-uncertainty) | The design pattern problem at the heart of agent engineering — how to engineer around stochastic behavior |
| [Building a Personal Finance Knowledge Base with LLM Wiki](/blog/2026/05/04/wealth-llm-wiki) | A complete walkthrough of building an investment knowledge base that an LLM can reason over — the data layer for a real agent |
| [Building an AI Agent: From Claude Skills to Production](/blog/2026/05/04/rwh-overlay-lessons) | A retrospective on extending an open-source LLM wiki into a production-grade personal agent — the engineering reality of turning a working tool into a real agent |
| [Building an Agent from Scratch: LangGraph, Qdrant, and the Gaps Between the Docs](/blog/building-agent-from-scratch) | The A-layer. End-to-end walkthrough of python-agent — architecture decisions, LangGraph ingest pipeline and ReAct QA agent, SQLite-first data layer, and four specific failures the tutorials don't cover |
| [After Harness Engineering: How Agents Learn to Evolve Themselves](/blog/evolutionary-search-harness-next) | The research landscape for agents that improve their own prompts, skills, workflows, and harness code — organized by evolutionary depth. The hard part isn't mutation. It's the evaluator. |
| [The Agent Framework Trap: Why the Harness Drives Your Costs](/blog/agent-framework-comparison) | LangGraph vs CrewAI vs AutoGen — but the number that matters isn't in the benchmarks. Same model, same task, 5× token variance from the harness alone. Includes AWS Strands, Google ADK, Hermes, and OpenClaw. |

### Coming next

| Post | Why it matters |
|------|----------------|
| Agent Platform — Infrastructure Layer | The C-layer view. Bridges Track 1. Where do agent runtimes actually live, and what does the platform have to provide? Still in research mode — I want a thicker case-study base before writing. |
| Agent Design Patterns | The B-layer. The methodology backbone for the series — the recurring patterns I keep seeing across agent systems. Also still in research mode; the goal is enough patterns from real systems before generalizing. |

This track is also where I learn the most, and where I'm most cautious about writing ahead of my evidence. The hands-on pieces are done. The platform and patterns pieces will land when the case-study base is thick enough to generalize from.

---

## How I Pick Topics and Write

The short version: topics come from real work friction. If something cost me a weekend to figure out and isn't well-written about elsewhere, that's a candidate. I keep a case-study library of every project I've shipped, with the failure modes, numbers, and decisions logged — so when a topic surfaces, the raw material is already there. The actual writing is a collaboration with AI: I draft an outline, AI helps me find weak structure and dead sentences, and I rewrite the parts that matter. AI is a faster editor than I am alone, but it can't tell you what's worth writing about. That part is still entirely on me.

What I deliberately don't write about: things I haven't done. There's no shortage of speculation on AI online. The contribution I can make is to write only what's reported.

---

## How to Read This Blog

Pick a track and start. The dates are roughly chronological within each track, so the earliest post in any track is usually a fine entry point. If you want only one piece per track:

- Infrastructure: [Cloud Native → AI Native App Platform](/blog/cloud-native-to-ai-native-app-platform)
- Methodology: [Why Does the AI Field Keep Reinventing Things We Already Knew?](/blog/treat-ai-like-person) *(start of a 4-part series on the mental model)*
- Roles: [The Senior Engineer's AI Trap: Why Experience Works Against You](/blog/2026/05/13/senior-engineer-ai-trap)
- Agents: [Building an AI Agent: From Claude Skills to Production](/blog/2026/05/04/rwh-overlay-lessons)

This roadmap will get updated as the "coming next" entries become "published." If you want to be notified when the next batch lands, the RSS feed is the most reliable channel — I post inconsistently across other platforms but every post lands in the feed.

The map exists because the writing is going somewhere. Four tracks, one practitioner trying to make sense of a moving target. Thanks for reading along.
