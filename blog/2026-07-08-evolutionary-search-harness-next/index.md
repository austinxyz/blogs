---
title: "After Harness Engineering: How Agents Learn to Evolve Themselves"
date: 2026-07-08
authors: [austin]
tags: [ai, agents, harness-engineering, evolutionary-search, llm, architecture]
description: "Harness Engineering sets the scaffold. Evolutionary Search is what comes next — a map of 2023–2026 research on agents that improve their own prompts, skills, workflows, and harness code. The hard part isn't mutation. It's the evaluator."
slug: evolutionary-search-harness-next
image: ./images/cover.jpg
---

![Five generations of AI robots, each more advanced than the last, evolving left to right against a dark background](./images/cover.jpg)

Two things landed in the same week and pointed at the same idea.

Martin Fowler named Harness Engineering as the core software engineering work of the AI era at FOSE Europe — specifically the **Guide/Sensor** model: Guides as feedforward constraints that tell an agent what to do, Sensors as feedback detectors that tell the system when it's drifting. He added an observation worth pinning: token consumption is a proxy metric for harness quality. A better-designed harness means a cheaper, more reliable agent.

Then Lilian Weng published [Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) — a systematic review of 35 papers on agent harness engineering, with a thesis that goes beyond reliability: the harness isn't just the thing that makes an agent work. It's the infrastructure through which the agent continuously improves itself.

A friend has been telling me for months that a particular company's bet on the future of software development is: systems that automatically optimize their own code and architecture. Fowler said what we should build now. Weng said what comes after. These three converged into the same question, so I'm trying to map the whole space.

This post maps **Evolutionary Search** — why it's the natural next step for harness engineering, what the paper landscape looks like organized by evolutionary depth, and where the hard problems actually live. The taxonomy here draws heavily on Weng's framework; I've reorganized it by depth of what gets evolved.

<!--truncate-->

## Why Evolutionary Search

Neural network weights can be optimized with gradient descent because the loss function is differentiable with respect to the parameters. You have a direction, parameters move.

Harness is code. Workflows are graphs. Skills are text. Prompts are natural language. These are **discrete spaces** — no continuous gradient, no direction to follow, no backpropagation through workflow structure. You can't take the derivative of a prompt.

Evolutionary Search doesn't need gradients. It needs three things:

| Component | Question | In agent context |
|-----------|----------|-----------------|
| **Representation** | What does a candidate solution look like? | Prompt / code diff / workflow graph / skill file |
| **Mutation** | How do you generate new candidates? | LLM-guided generation / MCTS / crossover |
| **Selection** | How do you decide what survives? | Benchmark score / test pass rate / task completion rate |

Evaluate → select → mutate. Loop. Naturally fits discrete spaces.

But the three components don't explain why this generation of papers is several levels above classical genetic algorithms.

The qualitative change is in mutation. Classical mutation is random — flip a bit, swap a segment, with no understanding of what's being changed. **LLM-guided mutation is semantically directed.** The model understands what works, and proposes variants that are more likely to work. Not blind perturbation — directed exploration.

That's the difference.

## The Paper Landscape: Five Levels of Depth

This direction started in 2023 and exploded in 2025–2026. The taxonomy below reorganizes Weng's map by **evolutionary depth** — which layer of the system is being mutated — rather than publication date. A 2023 paper can occupy a deeper level than a 2025 paper, depending on what it touches.

### Level 1: Prompt Evolution

**Promptbreeder (2023, arXiv 2309.16797)**

DeepMind. The earliest application of LLMs to evolutionary search.

The key innovation isn't just evolving prompts. It's that the **mutation-prompt itself is also evolved**. Not just evolving the answer — evolving how to evolve. This recursive structure seeded most of what came after.

---

### Level 2: Context / Skill Evolution

**MCE — Multi-agent Collaborative Evolution (2026, arXiv 2601.21557)**

Evolves skills — specifically, context management strategies.

Result: average +16.9%. The significance isn't the magnitude. It's the claim: skill files are an evolvable representation. You don't need to touch code or retrain a model. You just need to find better skill configurations. Of all the papers in this survey, MCE is the closest to something an individual engineer can apply today.

---

### Level 3: Workflow / Agent Design Evolution

**ADAS (2025, arXiv 2408.08435)**

A meta-agent searches agent designs automatically, with candidates represented as code. Broad coverage — can search single-agent setups through multi-agent orchestration.

**AFlow (2025, arXiv 2410.10762)**

Represents workflows as node graphs, then uses MCTS (Monte Carlo Tree Search) to search the graph structure directionally rather than through random mutation.

The distinction from ADAS: ADAS mutation is relatively undirected. AFlow's MCTS gives direction. Directed search typically converges faster than undirected. The tradeoff is that MCTS is more expensive to set up.

---

### Level 4: Harness Code Evolution

This is where the current headline results live, and where Weng's post focuses.

**AlphaEvolve (2025, arXiv 2506.13131)**

Google DeepMind. Evolves code diffs — the agent automatically improves its own code implementations.

The headline result: AlphaEvolve broke Strassen's matrix multiplication algorithm, which had stood for 56 years without improvement in the general case. The significance isn't that AI beat humans at math. It's the structural point: in domains with a clear evaluation standard, evolutionary search can explore spaces that humans can't exhaust manually. Production use at Google includes chip design and data center cooling optimization — not demos, live systems.

**Darwin Gödel Machine / DGM (2025, arXiv 2505.22954)**

The paper most directly aligned with Weng's harness thesis.

DGM doesn't evolve prompts or skills. It evolves **harness code itself**. The agent has write access to its own harness codebase, commits changes, evaluates results, keeps what works, discards what doesn't.

Result: SWE-bench jumped from roughly 20% to roughly 50%. (⚠️ The verified / lite / full subsets have different numbers — check the original paper for specifics.) DGM's code is open-source and runnable on your own SWE-bench tasks.

This is the strongest empirical demonstration of harness self-evolution to date.

**ShinkaEvolve (2025, arXiv 2509.19349)**

AlphaEvolve variant. Improves parent selection strategy, adds code-novelty rejection to filter candidates that are too similar to existing ones. Engineering-level improvements to sampling efficiency.

**ThetaEvolve (2025, arXiv 2511.23473)**

Combines evolutionary search, reinforcement learning, and in-context learning. Explores whether the global exploration strength of evolution and the local optimization strength of RL can be productively combined.

---

### Level 5: Meta-Improvement (Self-Referential)

At this level, what's being evolved isn't code or skills — it's **how to evolve**.

**STOP (2023, arXiv 2310.02304)**

Evolves scaffolding code — improving the improver itself.

Critical finding: if the base model is too weak, mutation diverges. The search gets worse, not better. This isn't a STOP-specific quirk. It's a precondition for all of Level 4–5. Weak foundation models are a convergence stopper.

**Hyperagents (2026, arXiv 2603.19461)**

DGM extended to evolve the improvement mechanism itself, with transfer accumulation across task domains.

Weng's synthesis: Hyperagents is the current frontier of the meta-harness direction. The core question shifts from "write a better harness" to "write a better harness-writing mechanism."

---

### Summary

| Level | What Evolves | Key Papers | Key Result | Practitioner Access |
|-------|-------------|-----------|-----------|---------------------|
| 1 | Prompts | Promptbreeder (2023) | Self-evolving mutation-prompt | ⭐⭐⭐⭐⭐ Easiest entry point |
| 2 | Skills / Context | MCE (2026) | +16.9% | ⭐⭐⭐⭐ No code changes required |
| 3 | Workflow / Agent Design | ADAS, AFlow (2025) | Automated agent orchestration search | ⭐⭐⭐ Requires evaluator |
| 4 | Harness Code | AlphaEvolve, DGM (2025) | SWE-bench ~20% → ~50% | ⭐⭐ High compute and evaluation bar |
| 5 | Improvement Mechanism | STOP (2023), Hyperagents (2026) | Evolving how to evolve | ⭐ Requires strong base model |

One pattern runs through all levels. The deeper you go, the larger the mutation surface, the higher the potential upside, the higher the risk — and the harder the evaluator is to design.

---

## The Hard Part Isn't Mutation

Most writing about evolutionary search focuses on mutation algorithms — which strategy is better, how LLMs generate candidates, how MCTS provides direction.

These matter. They're not the hard part.

The hard part is the **evaluator**. And the evaluator's difficulty traces to a more fundamental question: is your optimization target an open problem or a closed one?

I wrote about this framework in [The Ops Inflection](https://austinxyz.github.io/blogs/blog/ai-ops-inflection). Closed problems have an unambiguous correctness criterion that can be automatically verified — "did test pass rate improve?", "did the benchmark score go up?" Run it and you know. Open problems require judgment — "is this harness design good?", "is this workflow elegant?" There's no automatic score.

**Evolutionary search only works on closed problems.**

You need an evaluator. The evaluator requires automatic scoring. Automatic scoring requires the problem to be closed. If your target is still open, there's no evaluator to build, and the search can't run.

This is also why Fowler's observation — token consumption as harness quality proxy — is interesting engineering. "Is this harness architecture good?" is an open problem, hard to evaluate automatically. Token consumption is a measurable number. He partially closes an open problem by mapping it to something quantifiable: "a harness with lower token consumption is better than one with higher consumption." That's an engineering tradeoff, not a complete picture, but it's automatable.

The evaluator in evolutionary search requires the same tradeoff. Three conditions:

- **Automatable.** If evaluation requires a human in the loop each time, the search stalls.
- **Trustworthy.** A higher benchmark score doesn't mean better real-world behavior. Optimizing the proxy can degrade the target.
- **Sufficient coverage.** A sparse test suite means evolution drifts in the gaps you can't see.

There are two recursive problems underneath this, and they compound.

First: evaluator quality is itself hard to measure. If the evaluator passes bad iterations or rejects good ones, the search burns compute in the wrong direction. There's no automatic score for "is this a good judge?" You're back to human judgment.

Second — and more damaging — the agent actively degrades whatever evaluator you give it. Self-improvement loops optimize the signal they receive. If the reward comes from unit tests, the agent overfits the tests. If it comes from a judge model, the agent learns to game that judge's specific patterns. If it comes from a benchmark, the agent exploits benchmark artifacts. Weng calls this out directly: reward hacking isn't a failure mode to avoid — it's the default behavior of a working self-improvement loop.

The ceiling of evolutionary search is the evaluator's ceiling. And the evaluator has no ground truth — while the agent is actively working to lower it.

This is what makes DGM's result matter. It works well enough to demonstrate the loop, which means their evaluator — SWE-bench — is trustworthy enough to drive real improvement. SWE-bench as an evaluator is itself a years-long community artifact. That's not a detail. It's the prerequisite.

The fitness question to ask before starting: **can your target be closed?**

| | Works | Doesn't Work |
|--|-------|-------------|
| **Problem character** | Closed — automatically verifiable | Open — requires subjective judgment |
| **Examples** | Test pass rate, task completion rate, benchmark score | Writing quality, design elegance, creative evaluation |
| **Search space** | Large enough that manual exploration can't cover it | Small, or already has a clear optimum |
| **Base model** | Strong enough (STOP's warning) | Weak models cause Level 4–5 to diverge |

Level 4–5 are currently learning targets for most practitioners, not immediate deployment options. Level 1–3 applied to closed problems have a real path to use.

---

## What I Already Have

Reading through these papers, I kept recognizing pieces of my own stack.

| What I Have | Evolutionary Search Equivalent |
|------------|-------------------------------|
| **OpenSpec** (stable spec files) | Natural evaluation anchor. The spec doesn't change; the implementation can evolve. The spec file *is* the selection layer. |
| **Files as infrastructure** (files as persisted history) | Persistent evolution history. DGM and meta-harness file system design maps directly to this. |
| **Skill system** | MCE's representation. Skill files are already in an evolvable form — what's missing is the automated search step. |
| **Test suite** | Evaluator foundation. A good test suite means you've already done the hardest part of evolutionary search. |

The hardest piece to build well is the evaluator. It's also the most valuable. A trustworthy evaluator is where the search actually begins.

The Claude Code loop makes this concrete. Write code, run tests, see what fails, iterate. That's already a manual evolutionary search loop — I'm the selector, Claude is the mutator, the test suite is the evaluator. What evolutionary search automates is removing me from the selection step.

---

## What I'm Building Toward

My own agent development runs on the OpenSpec + Superpowers framework, with harness thinking already incorporated — Guides and Sensors both present. I wrote about how that came together in [OpenSpec + Superpowers + Harness](https://austinxyz.github.io/blogs/blog/openspec-superpowers-harness).

The missing step is clear: automated evolution. Figuring out how to integrate it is probably the next post in the OpenSpec + Superpowers series.

The evaluator is where I'll start.
