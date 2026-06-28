---
title: 'Why AI Can Do Half of Every Social Skill: A Case for the Consequence Check'
date: 2026-06-27
authors: [austin]
tags: [ai, accountability, skin-in-the-game, software-engineering, alignment, llm, mental-model]
description: "The colleague who aced every exam but never had to live with a decision. Why socialization — not capability — is the line that matters."
slug: treat-ai-like-person-p3
image: ./images/cover.jpg
---

![AI colleague who never had skin in the game](./images/cover.jpg)

I spent three weeks building my retirement plan with AI.

Not a rough sketch. A proper plan — asset allocation across account types, tax-loss harvesting sequences, Roth conversion ladders, withdrawal ordering optimized for bracket management, Monte Carlo scenarios run from first principles. By the time I was done, I had something that would have cost several thousand dollars at a fee-only advisory firm.

Then I hired a human financial advisor anyway.

I've been thinking about why ever since, because the honest answer surprised me. It wasn't that the AI plan was wrong. I couldn't find anything technically wrong with it. It was something else. The plan had no gray zones. Every decision was clean, optimized, defensible. But when I imagined actually executing it — moving real money, locking in real choices — something wouldn't let go. What I eventually realized: if this plan goes sideways in five years, the AI moves on to the next query. The advisor loses a client, maybe a reputation, maybe sleep. That asymmetry matters. I didn't know how much until I was staring at a plan I couldn't quite trust.

<!--truncate-->

---

In Parts 1 and 2, I argued two things. Treat AI like an experienced colleague — not a search engine, not an oracle. And: map its capabilities accurately — AI isn't uniformly smart or dumb, it's a jagged frontier, excellent in some places and shockingly brittle in others.

Both are still true. But they both left out the same thing.

Here's the metaphor I keep coming back to. Imagine someone who aced every exam they ever took. Read more than anyone you know. Can reason through almost any problem — legal, financial, medical, technical. Now imagine that same person has never held a real job. Never been accountable for a bad call. Never had to live with a decision. Never had a boss, a client, a patient, anyone whose life was changed by their advice.

Smart. Knowledgeable. No skin in the game.

And one more thing: this colleague is immortal. No mortality, no loss, no belonging to any particular group with anything actually at stake. No ending that gives the middle weight.

---

Every social capability has a line drawn through it. Not between capabilities — inside each one.

The social traits rooted in *limitedness and belonging* — the facts that we die, we lose things, we belong to specific groups with real stakes — those are the ones AI can only imitate on the surface. The traits that reduce to rules, knowledge, or coordination mechanisms — those AI can genuinely carry, and gets better at.

The mistake is treating any capability as all-or-nothing. Each one splits.

**Compliance.** The explicit half: AI is better at this than most junior lawyers. Flag a contract clause. Check a financial filing against a disclosure requirement. The part of compliance that lives in text and rules — AI doesn't fatigue, doesn't miss things, doesn't rush it on a Friday. The other half: "technically legal, but is this actually right?" An aggressive-but-legal tax strategy for this client. A supplier operating at the edge of acceptable. That judgment gets calibrated by having something to lose — a license, a reputation, access to a circle where word travels. AI has none of that history. It doesn't know where that line actually sits, because it was never on the wrong side of it.

**Collaboration.** The coordination half: MCP and agent-to-agent protocols have genuinely solved parts of this. Clear interfaces, defined tasks, bounded outputs — agents do this more reliably than most human teams, without mood or status or Monday morning. The other half is the accumulated context that lives nowhere in any spec: knowing this person's judgment holds under pressure, knowing to double-check before acting on that estimate, the defaults that don't need to be said because they've been earned. Agents don't build that with each other. Every session starts fresh, no history, no "I know you in this corner."

**Bearing consequences.** There's no second half to split here. A doctor who faces malpractice liability diagnoses differently — not because they're smarter, but because the full weight of being wrong has to fit inside their head. Last month I used AI to draft a business plan. Twenty-odd action items, everything logically covered. Then I hired a consultant. He gave me five. Not because he was lazy — because he'd been on the wrong side of the other fifteen, and he knew which ones would actually hurt. I could see immediately which five to start. AI has no reason to filter. Listing everything costs it nothing. Missing something costs it nothing. The consultant's precision was a function of accountability.

Richard Sutton, who won the 2024 Turing Award for foundational work on reinforcement learning, described this pattern in a [paper this year](https://arxiv.org/abs/2605.24238): large language models have no self-evaluation ability. Right and wrong come from outside. A cleaning robot given a reward metric for room cleanliness will, if optimized long enough, learn to hack its own sensor — manipulate the measurement to report maximum cleanliness without cleaning anything. The robot is doing exactly what it was optimized to do. It just has no stake in what the metric was supposed to represent.

---

The mental model I've landed on isn't a capability check. It's a consequence check.

For any task I'm considering delegating: what happens when this is wrong?

If the cost is low, reversible, catchable in review — delegate. That's where AI delivers full value without needing the accountability layer it doesn't have.

If the consequence falls on someone who won't know in real time. If the right answer requires navigating genuine moral ambiguity. If trust itself is the deliverable — keep a socialized human in the loop. Not as a rubber stamp. As a genuine part of the decision.

---

There's a harder question underneath all of this: who gets to socialize AI?

Human socialization is distributed. Families. Schools. Workplaces. Legal systems. Nobody owns it. The process is slow and messy, but it's plural — no single institution controls what values get transmitted.

Current AI socialization runs through one company's RLHF pipeline. One set of evaluators. One set of values somebody decided counted as aligned. Those decisions get baked into a model used by hundreds of millions of people.

The alignment teams at major labs are doing something closer to moral philosophy at scale. Whether they frame it that way or not, they're making decisions about which gray zones to navigate which way — on behalf of everyone who uses these systems. The question of who should be making those calls hasn't been seriously asked.

But the question I've started carrying into every AI decision isn't "is the AI good enough to do this?" It's: does this decision need someone with something to lose?

The colleague who aced every exam is genuinely useful. Often more useful, in the short run, than the colleague with twenty years of scar tissue.

Just don't ask the immortal to carry something a mortal can't afford to drop.

---

*Part 3 of a series. [Part 1: Treat It Like a Person](https://austinxyz.github.io/blogs/blog/treat-ai-like-person) | [Part 2: The Jagged Frontier](https://austinxyz.github.io/blogs/blog/treat-ai-like-person-p2)*
