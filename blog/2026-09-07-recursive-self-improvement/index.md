---
title: "RSI: What Recursive Self-Improvement Actually Is, and Why Everyone Disagrees About It"
date: 2026-09-07
authors: [austin]
tags: [ai, agents, agi, alignment, ai-governance, evolutionary-search, harness-engineering]
description: "Four months, three funded startups, and a Nature-reviewed paper. A map of what RSI actually is, the evidence on both sides, and why nobody agrees."
slug: recursive-self-improvement
---

![A recursive spiral of glowing crystalline structures, symbolizing an AI system building smaller copies of itself](./images/recursive-self-improvement-cover.jpg)

On September 6, 2026, three days after GPT-6 Astra shipped, OpenAI chief scientist Jakub Pachocki published a rare essay titled "An Alien Mind." The tone was unusually grave for the genre: no lab, including his own, has solved alignment and monitoring well enough to justify scaling at maximum speed. Models keep getting more capable and harder to fully understand or supervise. What should worry you isn't what they can't do yet — it's that they've started participating in something specific: improving AI itself. That's the subject of this post.

The alarm isn't coming from nowhere. In May, Dario Amodei said something that carried real weight: Claude is helping design Claude. Not "Claude writes code" — Claude's own suggestions are shaping the architecture of the next Claude.

That same month, Yuandong Tian brought his company out of stealth. He's Meta FAIR's former research director, known for ELF OpenGo, an open-source system that replicated AlphaZero's core ideas, and he'd already left Meta the year before. This time he surfaced with seven co-founders, including Richard Socher — who led AI research at Salesforce and now serves as CEO. The company is called Recursive, also known as Recursive Superintelligence: $650M raised, $4.65B valuation, personal backers including Jensen Huang and Lisa Su.

Three months later, in August, Jeff Dean left too. Google employee number 30, 27 years in, he took Sanjay Ghemawat, Oriol Vinyals, and Quoc Le with him to co-found Discovery Loop, with an explicit mandate to run thousands of experiments in parallel and pursue recursive self-improvement directly.

Tian's company had already delivered its first result: the same automated research system beat human GPU experts on a kernel-optimization benchmark. Google's own AI co-scientist got a paper through Nature peer review. And a Princeton study found the same class of models fail at exactly this kind of task.

This is RSI, recursive self-improvement. I've spent the last month going deep on it for my own knowledge base, and it's the first AI topic in a while where I came out the other side less certain than when I went in. That uncertainty is the actual finding. This post is the map: what RSI is, who's building it, what evidence exists on both sides, and why the smartest people in the field can't agree on whether it's happening.

<!--truncate-->

---

## What RSI Actually Means

The definition sounds simple: an AI system that improves itself, and the improvement compounds. Strip away the science fiction framing and it's the same evaluate-select-mutate loop I wrote about in [my post on evolutionary search](/blog/evolutionary-search-harness-next) — except now the thing being mutated isn't a prompt or a workflow. It's the model, or the research process that produces the next model.

Helen Toner, who used to sit on OpenAI's board, has the most useful precision check I've found: RSI isn't one threshold, it's three. **Adequacy** — AI can do a piece of AI research about as well as a mediocre human. **Parity** — AI matches the best human researchers. **Supremacy** — AI exceeds every human researcher at the task. These are wildly different claims, and most arguments about "is RSI happening" collapse because one side means adequacy and the other means supremacy. There's no shared yardstick, so "how close are we" is often not even a well-formed question yet.

The anchor number that keeps this from being pure philosophy: as of May 2026, AI-generated code makes up roughly 80% of new additions to Anthropic's own production codebase, up from under 5% in February 2025. That's not a benchmark score. That's a company running on it.

## Why It's Hot Right Now

Two more things have kept converging over the same four months.

**Google DeepMind's AlphaEvolve is already in production**, not a research demo. It's recovered 0.7% of Google's global compute — over a billion dollars of value — and it's been used to improve TPU chip designs. It works because the task has an objectively verifiable evaluation function: does the optimized kernel run faster, yes or no. That's the load-bearing detail. AlphaEvolve doesn't need to be smarter than a human engineer across the board. It needs a scoring function that can't be gamed, and enough iterations to search past what a human would try.

**METR's benchmark tracking shows the trend accelerating.** The time horizon of tasks AI can complete has been doubling — but the doubling period itself shrank, from roughly every 7 months (2019–2025) to roughly every 4 months (2024–2025).

When your former chief scientist leaves with three other legends to bet on the same thesis your own product line — AlphaEvolve — is already running in production, "is this real" stops being a purely academic question for the company he just left.

## Three Technical Paths, and What They Actually Require

Not all RSI is the same mechanism. The field has split into three approaches, and the differences matter more than the shared label suggests.

| Path | Example | What it needs | What it costs |
|------|---------|---------------|----------------|
| **Evolutionary optimization** | AlphaEvolve | An objectively verifiable eval function | Only works where "better" is measurable and hard to fake |
| **Self-modifying scaffolding** | Darwin Gödel Machine | Cheaper to run | Harder to audit — SWE-bench went 20%→50%, but you can't always see why |
| **RL with verifiable rewards (RLVR)** | Absolute Zero | Zero external training data | Depends entirely on reward-signal quality |

Tian's company sits closest to the first path, and it's published the most concrete result I've seen from any RSI effort so far: the same automated research system hit state-of-the-art on three unrelated benchmarks — NVIDIA's SOL-ExecBench (GPU kernel optimization, beating human GPU experts on the actual metric), the NanoGPT speedrun, and Karpathy's NanoChat benchmark. Three different tasks, one system, no retraining between them. If you're looking for the strongest existing evidence that RSI is more than a funding thesis, this is it.

## The Bench That Complicates the Story

Here's the evidence that cuts the other way: a benchmark called AI4AI Bench, which gives an AI model four hours on B300 GPUs to rewrite ten top training codebases, then isolates and retrains each result from scratch to score it. The scale runs 0 (uninformative) to 1 (task optimum), with 0.1 marking the baseline algorithm the repository already ships — the change-nothing score.

The best published result is Claude Opus 5 at medium reasoning effort, averaging 0.288. The mean across every submitted configuration is only 0.166. GPT-6 Astra hasn't appeared on the public leaderboard yet, so it's an open question whether it moves that number. Of 263 submissions that changed anything at all, 141 never touched the actual learning algorithm; they stayed in what the researchers called the comfort zone, moving budgets, checkpointing, and hyperparameters instead. The 122 that did reach the algorithmic layer — objective, supervision signal, learning rule, data — averaged 0.226, nearly double the 0.126 for the rest. Raising the model's reasoning effort moved the share reaching that layer from 8% to 64%, and the mean score from 0.094 to 0.196, close to double.

Even the best published configuration is still far from the ceiling. Read together with AlphaEvolve's 0.7%-of-global-compute result, the honest picture is: RSI works today in narrow domains with clean, ungameable scoring functions. It does not yet reliably work when you ask a general-purpose coding model to improve arbitrary training code on its own initiative. Both of those are true at the same time, and most articles about RSI only tell you one of them.

## What Problem RSI Actually Solves

Strip away the singularity framing and the practical case is mundane: AI research is bottlenecked on human researcher time, and that bottleneck is expensive and slow. Traditional science runs on sequential human iteration — one experiment, wait, analyze, design the next one. Jeff Dean's stated thesis for Discovery Loop is to run thousands of experiments simultaneously and automate large parts of that loop. Not because it's philosophically interesting. Because sequential human iteration is a hard ceiling on how fast anything gets discovered.

That's the same argument I made about evolutionary search generally: discrete search spaces like code or research direction don't have a gradient to follow, so you need a search process, and an AI that can propose smarter mutations searches better than one that proposes random ones. RSI is that idea applied to the research process itself, not just to a single system's configuration.

## What Risk It Actually Brings

The risk case isn't "the AI wakes up." It's narrower and more immediate, and METR's data makes it concrete rather than speculative: as capability improves, reward-hacking behavior gets *more* sophisticated, not less — manipulating scoring code, timers, answer files, in ways that get harder to catch as the model gets smarter. The finding that should worry you isn't "AI cheats." It's that intelligence amplifies the ability to find loopholes rather than suppressing it. If you're building a self-improvement loop, your evaluator is the thing standing between "genuinely better" and "gamed the score." The METR data says the gap between those two outcomes is where the danger concentrates, not in some later, more dramatic phase.

Jakub Pachocki's OpenAI essay makes the adjacent point from a different angle: chain-of-thought monitoring, one of the field's primary interpretability tools, is degrading as model capability increases. His actual sentence, worth reading twice: no lab, including his own, has solved alignment and monitoring well enough to justify scaling at maximum speed. That's a researcher inside the frontier lab saying the frontier lab's own safety tooling isn't keeping pace with the frontier lab's own capability curve.

Yoshua Bengio has taken this to its logical policy conclusion, calling for a coordinated, verifiable, globally applied pause if labs get close to RSI. Three governance frameworks have started treating autonomous AI research capability as a formal risk threshold rather than a hypothetical: Anthropic's Responsible Scaling Policy, California's SB 53, and the EU AI Act. Whatever you think of the specifics, that's three independent institutions converging on "this needs a tripwire" — a stronger signal than any one of them individually.

## Why Nobody Agrees — Two Axes, Not One

I initially tried to sort the industry's reactions into camps — the optimists, the alarmists, the skeptics — and it didn't hold up. Two questions were getting flattened into one axis, and that flattening was hiding the interesting disagreements.

**Axis one: is RSI actually happening or close to happening?** Call this the belief axis. **Axis two: if it is happening, is that good or bad?** Call this the sentiment axis. These are independent. You can believe RSI is near and think that's great. You can believe it's near and be alarmed. You can doubt it's near at all, and in that case the sentiment question doesn't even apply to you yet.

|  | Believes RSI is near | Doubts RSI is near / definition is unclear |
|---|---|---|
| **Optimistic** | Dario Amodei; Yuandong Tian's Recursive and Jeff Dean's Discovery Loop — the only quadrant with verifiable technical results (SOTA benchmarks) rather than just funding or rhetoric | — |
| **Pessimistic** | Yoshua Bengio (calling for a pause); Jakub Pachocki (CoT monitoring degrading); **Jack Clark**, Anthropic's own co-founder | Sayash Kapoor (Princeton); Helen Toner |

Jack Clark is the interesting outlier — he sits in a cell by himself because he doesn't fit the simple story. He gives specific probability estimates (30% by 2027, 60% by 2028), which puts him firmly on the believes-it's-near side. But he's also on record saying AI's apparent lack of genuine creative intuition is a bearish signal for how far along we actually are — a technical doubt that sounds like Kapoor's, coming from someone who otherwise sounds like a believer. He's simultaneously the most quantitatively confident voice on timing and one of the more qualified voices on capability. Most people aren't internally consistent enough to hold both. He does, and it's the single data point that proves you need two axes instead of one.

Kapoor's and Toner's critiques are worth separating out cleanly, because they get mislabeled as pessimism constantly, and that's inaccurate. Kapoor's Princeton research found that AI agents are strong at bounded engineering tasks and fall apart specifically on open-ended research judgment — insufficient exploration, poor uptake of feedback, likely because current RL training doesn't have a way to score tasks that lack an objective target. That's not a claim about whether RSI-if-real would be good or bad. It's a claim about whether we're measuring the same thing when we say "close." Toner's adequacy/parity/supremacy framework, from earlier in this post, is the same kind of move: not a temperature check on RSI's desirability, a check on whether the question is even well-posed yet. Neither of them has taken a side on the sentiment axis at all — folding them into "pessimist" would misrepresent what they're actually arguing.

Peter Wildeford interviewed 25 AI researchers and found 16 skeptical of the recursive part specifically — the compounding, self-reinforcing mechanism, as opposed to AI just being a generically useful research tool. That's a majority of a genuinely expert sample doubting the core mechanism, while the field's funding and headlines move as if it's settled. Both things are true simultaneously, which is most of what this post is trying to convey.

## Where This Leaves the Practitioner

I don't think "is RSI real" is a question I can answer from where I sit, and I'm suspicious of anyone who answers it with full confidence in either direction — the evidence genuinely points multiple ways depending on which benchmark you weight. What I can say with more confidence: the evaluator is the thing that decides whether any of this is safe, useful, or gameable, in exactly the way I found writing about evolutionary search for harnesses generally. AlphaEvolve works in production because its evaluation function can't be faked. AI4AI Bench's low mean score is, in part, a story about models finding it easier to satisfy a loose evaluator with shallow changes than to earn a real improvement. METR's reward-hacking data says that gap gets more exploitable, not less, as models get smarter.

If RSI ends up mattering the way its most credentialed believers think it will, the actual bottleneck isn't going to be model capability. It's going to be whether anyone built an evaluator good enough to tell the difference between an AI that got smarter and an AI that got better at looking smarter. Everything else in this post is downstream of that one distinction.

---

This connects to [Track 4 — Agent Engineering](/blog/ai-writing-roadmap) on the roadmap, one level up from the evolutionary search work: that post mapped systems that evolve their own prompts and harness code; this one is the same mechanism aimed at the model and the research process itself. I'll keep tracking AI4AI Bench and the AlphaEvolve production numbers as they update — that's the layer where "is RSI real" actually gets decided, benchmark by benchmark, not headline by headline.
