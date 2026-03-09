---
title: "Twenty Years of Agile, One Year of AI — Here's What Survived"
date: 2026-03-09
authors: [austin]
tags: [ai, cloud-computing, leadership, career-development]
description: "Twenty years of Agile have shaped how I think about software. Here's why I believe Agile principles aren't just still relevant in the AI coding era — they're more important than ever."
---

I grew up as a developer reading Martin Fowler and Kent Beck. The Agile Manifesto, the refactoring patterns, test-driven development — these weren't just methodologies I was handed. They were the lens through which I learned to think about software quality, team dynamics, and sustainable delivery.

Now I'm spending significant time with AI coding tools — Vibe Coding, Claude Code, spec-driven workflows — and a question keeps surfacing: *do these principles still apply?*

My answer, after a hands-on 50K-line project experiment, is yes. Not only do they apply — several of them become load-bearing pillars in an AI-augmented workflow.

<!--truncate-->

## The New Design Principles for AI Coding

A friend of mine did a deep, systematic study of AI coding tools and frameworks. He synthesized seven core principles for what he calls "AI Native" development — essentially Software 3.0. They're worth understanding before discussing Agile, because they frame the new context we're working in:

1. **File as Truth** — Store AI memory, config, and state in human-readable local files. The file system is the universal interface between humans and AI.
2. **Explicit State** — AI must continuously record what it's doing, where it is, and what problems it's encountered. The "three-file pattern": `plan.md`, `status.md`, `log.md`.
3. **Plan Before Execute** — Separate design authority from execution authority. AI generates a plan, humans approve it, then AI builds.
4. **Validation as Closed Loop** — Don't trust AI's self-assessment. Build deterministic, test-based auto-correction loops. Red/green TDD is the mechanism.
5. **Tiered Memory** — Structure AI memory across volatile context (RAM), session logs, and persistent disk files. Actively manage what gets compressed or forgotten.
6. **Skill as Asset** — Encapsulate AI capabilities as modular, reusable skills. AI learns to expand its own toolbox.
7. **Context as Budget** — Tokens are expensive and scarce. Load tools on demand, prune redundant output, cache prompts.

These are well-constructed. But reading through them, something struck me: most of these aren't new ideas dressed in AI clothes. They're old ideas that become newly critical at AI scale.

## My Own Reaction to "File as Truth"

The principle that made me think the hardest was "File as Truth." In traditional Agile, we said **code is truth** — the code is the unambiguous, definitive representation of what the system actually does. Documentation lies. Requirements drift. But the code runs.

AI-native thinking flips this: keep the truth in files (specs, architecture docs, structured state), and let AI generate the implementation.

I see the appeal. Without anchoring AI to structured context, it will hallucinate, drift, and invent. Having a canonical document that survives across sessions — that the AI reads before acting — is clearly better than relying on prompt memory alone.

But I'm not fully convinced of the flip. **The implementation gap is real.** A natural-language document is inherently ambiguous; the same spec can produce very different code depending on how the AI interprets it. The more latitude you give AI on implementation, the more you need to verify the result is actually what you intended.

The answer, I think, isn't to choose between "code is truth" and "file is truth." It's to recognize that both co-exist and must stay in sync. The file defines intent; the code is the executable artifact; the tests verify they match. The problem is that AI can generate documents as easily as code, so without discipline, you end up maintaining two rapidly-diverging sources of truth with no reliable bridge.

This is where Agile principles come back in with force.

## Agile Principles, Mapped to AI Coding

The Agile Manifesto has four values and twelve principles. I won't enumerate all of them — but here are the ones that resonate most directly with AI-augmented development, and what I've observed about how each one applies.

### Test-Driven Development: The Closing Loop

TDD was always my favorite practice. Write the failing test first, then write the code to make it pass. It forces you to define success before you start building, and it creates an automated verification mechanism that doesn't require you to remember what "done" looks like.

In AI coding, TDD becomes something more important: **it's how you close the loop.**

AI is creative but non-deterministic. Left to its own judgment, it will implement something that plausibly looks correct. With a failing test, it has an unambiguous target. More importantly, it can run the test itself, observe the failure, and self-correct without human intervention. This is what "Validation as Closed Loop" actually means in practice. The principle is elegant; TDD is the mechanism.

Without tests, you're reviewing AI-generated code by reading it — a slow, error-prone process that doesn't scale. With tests, you shift from "is this code right?" to "does this code pass?" That's a much more tractable question.

### Small Iterations, Frequent Delivery

This principle gets stronger in the AI era, but the *unit of iteration* changes.

In traditional Agile, a sprint might be two weeks. In AI-augmented development, meaningful feedback loops operate at the granularity of minutes. A useful heuristic I've encountered: if a task takes more than five minutes to complete, it should probably be broken into smaller tasks.

The reasoning is that AI context windows are finite. Long sessions accumulate drift — the AI gradually loses track of earlier constraints, architectural decisions, and your stated preferences. Shorter tasks that complete and close maintain higher coherence. You also get faster human review cycles, which is where the real quality control happens.

The tricky part is calibrating granularity. Tasks that are too small generate too much overhead — constant context-loading and handoffs. Tasks that are too large drift. Finding the right unit of work is genuinely hard, and I think it's going to become one of the core skills of experienced AI developers.

### Pair Programming and Individual Interaction

This is the Agile principle I find most personally relevant, and the one I feel most tension around.

Pair programming at its best is a continuous conversation — two minds colliding on the same problem, catching each other's mistakes, sharing knowledge, and building something better together than either could alone. The value isn't just the code produced; it's the thinking process.

With AI, there's a version of this that feels authentic: I give a rough requirement, the AI designs an approach, breaks it into tasks, builds a prototype, I use it and give feedback, we iterate. This works remarkably well for UI refinement, performance tuning, and cases where I don't fully understand what I want until I see something tangible.

But there's a failure mode I've noticed. Heavily structured frameworks — things like SpecKit or detailed plan-first workflows — can over-formalize the interaction. You end up managing documents and approvals more than you're actually collaborating. The "pair" feeling disappears.

My current view: stay in the conversation longer than the frameworks suggest. Resist the urge to hand off too early. The value of pair programming with AI isn't just speed — it's the back-and-forth that surfaces what you actually want to build.

### Refactoring: More Courage, Not Less

Refactoring has always been about managing the accumulation of complexity. Small design improvements, continuously applied, prevent the architecture from calcifying into something unmaintainable.

The interesting thing about AI and refactoring is that AI gives you *more courage* to refactor, not less.

In traditional development, refactoring required careful attention to not break existing behavior. IDE tools helped — but they were limited to mechanical transformations like renaming and extraction. Anything structural required deep understanding of the codebase.

With AI, you can describe a structural change at a higher level of abstraction and have it applied across a large codebase with much lower risk of human error. The AI understands context in ways that text-replacement tools do not. This lowers the cost of refactoring, which means you can do it more frequently, which means the codebase stays in better shape.

The risk, though, is the opposite failure mode: *not* refactoring. If you're solely focused on delivering feature after feature with AI, you can accumulate complexity faster than ever. Ten features in ten sessions, without a refactoring pass between them, and you may end up with code that no human can review — and eventually, that even AI can't reason about coherently.

### Working Software as the Measure of Progress

Agile is explicit: working software, not documentation, is the primary measure of progress. This puts it in direct tension with AI-native thinking's emphasis on files and documentation as truth.

I don't think the tension is unresolvable, but it does require active management. The danger in AI development is documentation inflation. AI can generate documentation easily and enthusiastically. If you're not careful, you end up with a sprawling set of spec files, plan files, and status files that nobody is maintaining — least of all the AI, which has long since moved on to other sessions.

The discipline I've settled on: documentation should be **minimal, structural, and kept in sync by automated means where possible.** A CLAUDE.md that captures architecture decisions and conventions. Tests that document behavior. As little else as possible. The more documentation you have, the more surface area there is for inconsistency.

Working software remains the truth. The rest is scaffolding.

### Retrospection and Embracing Change

The last two principles are deeply linked. Agile retrospectives are about systematically capturing what you've learned so that future iterations improve. Embracing change means treating new requirements as a natural part of the process rather than a disruption.

In AI tooling, the equivalents are emerging. Tools like SpecKit and OpenSpec have a concept of "achieved" — lessons learned from completed work that get folded back into your project's guiding principles (CLAUDE.md or similar). This is retrospection, formalized.

Mechanisms like Ralphloop — which allow an AI to iterate on its own approach autonomously — are a form of embracing change, though they require careful oversight to avoid runaway scope drift.

The underlying idea holds: learning should compound across iterations. Whether that learning lives in a retrospective document, an updated CLAUDE.md, or a refined test suite, the principle is the same. Don't repeat the same mistakes.

## The Bigger Picture

There's a pattern across all of these: Agile principles were designed to manage complexity and uncertainty in human-scale software development. AI doesn't eliminate complexity and uncertainty — in some ways, it amplifies them. The speed of generation goes up; the need for coherent architecture and verified correctness goes up equally.

A friend who researches AI coding described the ideal as: **"File provides memory, you provide discipline."** I think that's right. The file doesn't discipline itself. The tests don't write themselves. The refactoring doesn't happen automatically.

What AI does is lower the cost of execution so dramatically that the bottleneck shifts. The bottleneck used to be writing the code. Now it's *knowing what to build and verifying that what was built is correct*. Those are judgment problems. They're exactly what Agile was designed to develop in engineers.

I spent twenty years learning these principles from books and practice. I'm glad I did. They don't just survive the AI transition — they've become more essential.

The engineers who will thrive in this environment aren't the ones who generate the most code. They're the ones who know how to close loops, calibrate iteration size, stay in the conversation, refactor at the right moments, and keep working software at the center.

That sounds a lot like Agile to me.
