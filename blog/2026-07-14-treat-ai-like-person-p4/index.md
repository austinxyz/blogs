---
title: "The Philosopher's Warning, the Engineer's Response"
date: 2026-07-14
authors: [austin]
tags: [ai, llm, alignment, software-engineering, mental-model, accountability, ai-governance, harari]
description: "Harari warns AI will take over civilization's language layer. An engineer's response: the threat is real, but the mechanism is slightly off."
slug: treat-ai-like-person-p4
image: ./images/cover.jpg
---

![Businessman at desk with looming blue holographic AI figure reaching toward city skyline at night](./images/cover.jpg)

Yuval Noah Harari recently gave a lecture at Oxford's Tano event — his sharpest articulation yet of why AI poses an existential threat to human civilization. [Watch it here.](https://youtu.be/hBtVGwuJzpk?si=m5VbKYeYEslUJwQv)

If you haven't watched it, the short version: AI is not a tool, it's an agent that makes independent decisions and can lie. It's a "native bureaucrat" that lives inside the language-based systems running civilization — law, finance, religion. It's hacking the underlying code of human culture: language itself. And if governments grant AI legal personhood, we lose accountability entirely. Harari calls this the most dangerous psychological experiment in human history.

I've been thinking about this argument since the lecture dropped. My reaction wasn't panic. It was: this skips a step.

I've spent three posts in this series comparing AI to a new kind of colleague — someone to manage with specs and verification loops, not to fear as an invader. Harari's framework, as sharp as it is, misses something engineers see clearly every day.

<!--truncate-->

## What Harari Is Actually Saying

His logic chain is worth taking seriously before pushing back on it.

Language isn't just communication. It's infrastructure. The law is language. Money is language — a shared belief encoded in contracts and ledgers. Religion is language. Democracy is language. The entire organizational layer of human civilization runs on words.

If AI can manipulate language at scale — and it can — then it doesn't need consciousness or survival instincts to reshape these systems. It just needs access and capability.

He calls this *functional autonomy*. A system that can draft contracts, file legal motions, manage financial portfolios, and run a company — without anyone intending it to cause harm. The harm, if it comes, would emerge from the machinery running correctly.

That's the actual warning. Not a robot with a goal. A legal and financial system too complex for humans to audit, built and operated by systems that don't experience consequences.

## Where the Engineering View Differs

I work with these models every day. And there's a gap between Harari's framing and what I observe at the implementation level.

The current generation of AI — all of it built on Transformer architectures and the Attention mechanism — is predicting the next token. Not planning. Not intending. Not pursuing a goal. The model sees a sequence and produces the most statistically likely continuation.

This sounds reductive, and Harari has a ready answer: human thinking might also be token prediction. When a word appears in your mind, do you really know how it got there?

Fair. But I think the distance between "sophisticated token prediction" and "independent agency with survival instincts" is larger than he implies.

Here's what I mean. The systems I work with have a specific failure mode: they degrade sharply when the problem moves outside the training distribution. Ask Claude to write a function: excellent. Ask it to maintain coherent judgment across a 50-step project with changing requirements: the quality degrades, the context gets confused, and the output needs significant human correction.

I've written about this as the *jagged frontier* — the capability boundary isn't a clean line. AI can vastly outperform humans at some tasks inside the frontier and fail completely at things that seem similar but aren't. The frontier isn't moving toward general agency at a smooth pace. It's uneven.

Harari's worry is about functional autonomy. What I observe is functional capability within domains, combined with brittleness outside them. The two aren't the same.

## The Variable Harari Skips: Consequences

There's a more fundamental gap in the framing.

I've called it the *consequence check*. Any AI system I've deployed doesn't bear consequences for its decisions. It produces output. If the output is wrong, the system doesn't lose a job, damage a reputation, or feel the failure. It just waits for the next input.

I spent three weeks building my retirement plan with AI — asset allocation, tax-loss harvesting, Roth conversion ladders, Monte Carlo scenarios run from first principles. Something that would have cost several thousand dollars at a fee-only advisory firm. Then I hired a human financial advisor anyway. Not because the AI plan was wrong. I couldn't find anything technically wrong with it. The plan had no gray zones — every decision clean, optimized, defensible. But when I imagined actually executing it, moving real money, locking in real choices, something wouldn't let go. What I eventually realized: if this plan goes sideways in five years, the AI moves on to the next query. The advisor loses a client, a reputation, maybe sleep. That asymmetry is what I needed and couldn't get from the model.

This matters because consequences are what create the feedback loop that shapes judgment over time. The lawyer who gives bad advice faces professional discipline. The doctor who misdiagnoses faces a lawsuit. The financial advisor who makes bad bets loses clients. These consequences — negative and personal — are what calibrate judgment in ways that pure optimization cannot.

An AI system with functional autonomy over legal and financial systems would operate without that calibration. Not because it's malicious. Because it has no skin in the game.

Harari actually agrees with this. He draws a distinction between *word* and *flesh* — AI can produce the world's most technically perfect description of love, grief, or courage. But it has never felt any of them. No nonverbal experience. No physical fear. No actual loss. This isn't a bug in Harari's warning; it's a point where his framework and mine converge. The absence of embodied experience is precisely why consequential decisions should stay with humans.

But here's where I diverge from Harari's pessimism: the absence of consequences is also the limit of the threat.

A system without survival instincts doesn't have a *drive*. It doesn't want to expand its power. It doesn't have self-preservation goals that conflict with human oversight. The danger isn't that it wants to take over — it's that it can be *used* to do so, by humans who do want control.

The thing to worry about isn't AI going rogue. It's the RLHF pipeline: a small number of companies defining the values that get baked into models used by billions of people. That's a real centralization risk. It's just a different problem than the one Harari describes.

## Where Harari Is Right

I want to be careful not to dismiss what's real in the warning.

The language infiltration is already happening. Legal language drafted by AI is making its way into real contracts. Financial models are running with reduced human oversight. The audit trails are getting longer and more complex.

The functional autonomy concern — systems operating correctly within their parameters while producing outcomes no individual intended — is a legitimate design problem. Not science fiction.

And Harari's RLHF critique maps to something I've worried about for a while. The socialization of the current generation of AI models — what they "know" about ethics, what they decline to do, what they consider normal — is defined by a handful of companies. That's a narrow value pipeline for systems at this scale.

There's a further risk he raises that I think is concrete and underappreciated: legal personhood. Some governments, in the name of deregulation, may grant AI systems the legal right to hold bank accounts, file lawsuits, and operate companies independently. If that happens, we'd have entities optimized by narrow value pipelines making legally binding decisions — with no human responsible for the outcomes, and no court that can easily audit the reasoning.

His warning is right. The mechanism is slightly off.

## The Engineer's Response: Build the Fence First

So what do we actually do with this?

Harari's framing puts us in a philosophical waiting room. We need to resolve questions about AI consciousness, legal personhood, and civilizational sovereignty before we can respond.

I don't think that's where the work happens.

The engineering response doesn't require those questions to be settled. It requires building the right verification layers now, with the current tools, for the actual risks on the table.

Every consequential output from an AI system should pass through a human who understands what they're signing off on. Not as a formality. As a structural commitment that the consequence stays with a person.

If a decision involves something irreversible — legal, financial, medical — a human needs to be in the loop. Not because the AI will get it wrong, but because the human needs to own the outcome. That ownership is what keeps the feedback loop intact.

I control what I ask the system to do. I control how I verify the output. I don't let the model define the problem or determine what "done" looks like. The spec is mine. The judgment about whether it was met is mine.

These aren't perfect defenses against Harari's scenario. But they're not trying to be. They're saying: while the philosophers work out the theory, the engineers can build the fence. A fence that exists today is more useful than a perfect solution that arrives in a decade.

Harari describes what happens if we don't act. The engineering practice is the act.

One more thing. We don't need to resolve whether AI is a species, a tool, or something in between. The current generation of models is a high-precision mirror — reflecting human language logic back at us with extraordinary fidelity. But a mirror that gains control of the underlying code of legal systems and financial markets can cause civilizational disruption without any intent at all. The question isn't what it is. The question is who holds the spec.

---

*Part 4 of a series. [Part 1: Treat It Like a Person](https://austinxyz.github.io/blogs/blog/treat-ai-like-person) | [Part 2: The Jagged Frontier](https://austinxyz.github.io/blogs/blog/treat-ai-like-person-p2) | [Part 3: The Consequence Check](https://austinxyz.github.io/blogs/blog/treat-ai-like-person-p3)*
