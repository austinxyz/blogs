---
title: "Why Does the AI Field Keep Reinventing Things We Already Knew? A Case for Treating AI Like a Person"
date: 2026-06-22
authors: [austin]
tags: [ai, mental-model, software-engineering, spec-driven-development, tokenmaxxing, context-minimalism]
description: "A new AI term lands every week. A friend cut through all of it in one sentence — and it turned out to explain almost everything."
slug: treat-ai-like-person
image: ./images/cover.jpg
---

![Businessman shaking hands with glowing AI holographic figure at office desk](./images/cover.jpg)

Prompt engineering. Context engineering. Spec-driven development. Harness. Loop engineering. Context minimalism. Tokenmaxxing.

A new term lands every week. The smartest people in tech are pouring into AI, and ideas collide fast — CTOs taking IC roles at Anthropic, researchers shipping frameworks before the last one has been absorbed. The vocabulary is exciting. It's also exhausting. And some of it turns out to be wrong.

Tokenmaxxing already showed cracks. Process-heavy agent frameworks are losing ground. Every few months something that felt foundational quietly gets replaced.

I kept looking for the underlying logic. What actually persists? Then a friend said something that stopped me mid-scroll.

*"Treat AI as labor. Instead of inventing new concepts for something entirely unprecedented and making it increasingly complex, design your verification and management methods according to how you'd manage people."*

That one sentence turned out to explain almost everything.

<!--truncate-->

## The Vocabulary Is Software Engineering, Rewritten for a New Engineer

Software engineering exists because humans build software. Humans make mistakes, forget context, misread requirements. So we built practices around them: specifications to align on what to build, code review to catch what one person missed, automated tests to verify what got built, CI/CD to ship it reliably. Decades of accumulated process, all designed around the properties of human engineers.

Now AI builds software. And the AI field is discovering, term by term, that it needs the same practices.

Look at the progression: prompt engineering → context engineering → spec-driven development → harness → loop engineering. Translate each into its software engineering equivalent.

**Prompt engineering** is the period of ad hoc verbal direction — telling the engineer what you want, one task at a time, hoping they interpret it the way you meant. This is how software teams operated before specs. It works for simple tasks. It doesn't scale.

**Context engineering** is the recognition that what an engineer knows shapes what they produce. Loading the right context before a task — relevant files, past decisions, current constraints — is the equivalent of onboarding: making sure the engineer has what they need before they start.

**Spec-driven development** is exactly what it sounds like. Give the engineer a written specification and let them execute to it. The spec is the source of truth. Deviations from spec are bugs, not features. We knew this. We had entire methodologies built around it. We're rediscovering that it works at least as well for AI engineers.

**Harness** is CI/CD. Automated scaffolding that runs the work, checks the output, and closes the loop without a human in the middle.

**Loop engineer** is the person responsible for keeping the autonomous loop running — monitoring, tuning when it drifts, handling exceptions. This role existed in operations long before AI arrived. Different title, same job.

Each term is a rediscovery. The practice precedes the vocabulary.

## Tokenmaxxing Failed for the Same Reason Brooks' Law Is True

The strongest evidence for this reading isn't where the field got things right. It's where it got things wrong.

Tokenmaxxing — cramming as much context as possible into the window — was a natural early instinct. If more engineers means more output, more context should mean better output.

It didn't work. Quality degraded. Noise drowned signal. Cost scaled faster than benefit.

Brooks' Law: adding engineers to a late project makes it later. The coordination overhead exceeds the added capacity. Tokenmaxxing hit the same ceiling for the same reason. The model's attention is a finite resource. Overloading it with undifferentiated context is the equivalent of putting twenty engineers in a room and hoping they self-organize.

The mental model that follows from "treat AI as a person" produces the correct instinct immediately: brief a capable engineer with what they need for this task, not with everything you know.

## Context Minimalism Is Just Good Management

The principle that emerged from the tokenmaxxing failure — use less context, more deliberately — has a cleaner name in people management: trust your people.

You don't brief a senior engineer by handing them the entire codebase and saying "read this." You give them the spec, point them to the relevant systems, tell them who to ask if something is unclear. Then you let them work. You review the output, not the process.

Micromanaging context, like micromanaging engineers, produces worse outcomes and burns more of your time.

I know because I made the opposite mistake. For a while I tracked my daily token usage like a scoreboard — proud of the numbers, telling myself I was operating at the frontier of the field. The products I was shipping were underwhelming. I kept sending AI back to redo work. I was measuring the wrong thing. Optimizing token consumption is not the same as managing a capable engineer toward a good outcome. A manager who counts hours instead of results isn't managing — they're watching.

The AI equivalent of managing well: a tight spec, the relevant files, and an evaluation loop. Let the model figure out the rest. Pull it back in when it drifts.

Context minimalism isn't a special AI insight. It's just good management.

## Process-Heavy Agents Lose Because High Performers Don't Follow Scripts

Process-heavy agent frameworks are losing ground. The direction is toward AI that operates from principles rather than flowcharts — that handles novel situations without a predefined step for each one.

This too is not new.

The best engineers don't follow scripts. They've internalized enough principles that their judgment is reliable across situations the script didn't anticipate. Getting there required passing through the scripted phase — junior engineers need explicit process; experts transcend it. The process was scaffolding for building judgment, not the goal itself.

The same arc applies to AI. Start with explicit step-by-step instructions. Then give the model richer context about goals and constraints. Eventually you're instilling something closer to a worldview — the values and tradeoffs the model reasons from when no rule applies.

This is what meta-rules are. Not "do step three after step two" but "here's how to think about tradeoffs, here's what matters most, here's what we're building toward." People have worldviews. A senior engineer doesn't need to be told that tests matter — it's part of how they think. That's the level we're increasingly designing AI at. Not procedures, but principles.

## Humans Move to the Edge — That's Where Management Lives

There's a convergent conclusion across every version of this argument: humans move to the edge of the process. Decide what to build. Verify that it got built. Handle the exceptions the system couldn't resolve.

Everything in the middle increasingly belongs to AI.

This is precisely how good managers have always worked. You don't do the work yourself; you set direction, define success, and remove blockers. You stay close enough to catch when things go wrong and far enough away to let the team operate.

My own practice moved this way across the last year. Vibe coding required constant presence. Spec-driven development needed me at key checkpoints. OpenSpec plus harness plus evaluation loops now runs long stretches without me. What I contribute is increasingly design — the spec, the principles, the definition of done — and verification. The loop runs.

A general doesn't fire the rifles. Being at the edge is where the leverage is.

## The Frame That Survives the Vocabulary Cycle

New AI terms will keep landing. Some will stick; most will get superseded. The ones that stick will turn out to be rediscoveries of things that work when you're managing capable workers at scale — because that's what this is.

We spent decades figuring this out for human organizations. AI compressed the timeline, changed the specifics, and handed us the same underlying problem.

Treat AI like a person. The confusion mostly goes away.
