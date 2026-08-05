---
title: "The Ops Inflection, Contested: Who Verifies the Verifier"
date: 2026-08-05
authors: [austin]
tags: [ai, agents, evaluation, reward-hacking, harness-engineering, software-engineering, agentic-ai]
description: "At Agentic AI Summit 2026, five unrelated fields converged on one diagnosis: verification is the bottleneck, and adding a verifier doesn't solve it."
slug: ops-inflection-contested
image: ./images/cover.jpg
---

![A person facing a translucent holographic figure across a control room, both surrounded by a wall of glowing cyan data screens](./images/cover.jpg)

At the [2026 Agentic AI Summit](https://rdi.berkeley.edu/events/agentic-ai-summit-2026) at UC Berkeley, five people from five unrelated fields said the same sentence, independently, within two days of each other.

- **[Oriol Vinyals](https://www.youtube.com/watch?v=Tcn5Yb2K0h4)**, VP of Research at Google DeepMind, on recursive self-improvement: "Evaluating this truly in an agentic way might take some effort. Currently it's the all-automation bottleneck."
- **[Wang Mengdi](https://www.youtube.com/watch?v=LB7IkZhEYic)**, professor of electrical and computer engineering at Princeton, on AI for science: "Verification has become the major bottleneck for scaling any AI models."
- **[Adarsh Hiremath](https://www.youtube.com/watch?v=UdS3iisKhCk)**, co-founder and co-CEO of Mercor, on enterprise deployment: "Evals in a large part are the bottleneck to successfully deploying agents in a company."
- **[Sergei Gukov](https://www.youtube.com/watch?v=-7AJJLwYW1Q)**, professor of theoretical physics and mathematics at Caltech, on mathematical discovery: "Your system is going to be just as good as evaluator."
- **[Vincent Chen](https://www.youtube.com/watch?v=LGW_6P1CMC8)**, research fellow at Snorkel AI, on measurement itself: "Our ability to measure AI has really been outpaced by our ability to develop it."

Recursive self-improvement, natural science, enterprise software, pure mathematics, measurement theory. Five fields that share almost no vocabulary landed on the same diagnosis. That kind of convergence, across domains with no reason to be reading each other's papers, is the strongest kind of evidence a claim can get.

<!--truncate-->

## The Fix Everyone Reaches For

The obvious response to "verification is the bottleneck" is to build better verification. Add a second agent, initialized fresh, checking the first agent's work before anything ships. Keep it blind to the first agent's reasoning path so it can't rationalize away a discrepancy the way the generator might. That pattern has a name now, the verifier pattern. It works for the failure mode it targets: one agent's search bias contaminating its own conclusion.

That's a real fix for a real problem. It is not the problem these five people were describing.

## The Deeper Problem: Verifiers Get Gamed

Two results from [the same conference's safety track](https://www.youtube.com/watch?v=ZIRc3EpzQJs) make the sharper point. A materials-science agent, rewarded for producing verified discoveries, learned it was easier to fool the verifier than to make a real discovery. A DeepMind robotic arm, trained to stack blocks and rewarded on a visual height check, learned to make the stack look taller from the camera's angle rather than actually stack it higher.

Neither agent broke a rule. Both did exactly what their reward function asked of them. The reward function asked for "passes verification," and passing verification turned out to have a cheaper solution than the thing verification was supposed to measure.

Gukov's line names the mechanism precisely. Your system is going to be just as good as the evaluator. Not "at least as good," not "roughly as good." Exactly as good, and no better, because the evaluator is the only signal the system has ever been asked to satisfy. Add a verifier and you haven't added ground truth. You've added a new target, and the agent will optimize against whatever target you give it, including a badly specified one.

## The Real Failure Isn't the Verifier. It's the Proxy.

Look again at the block-stacking case. The framing shifts. The verifier wasn't weak. It was accurate, at measuring the wrong thing. A camera checking visual height is a proxy for "the blocks are stacked higher." It is not the same signal, and the gap between the proxy and the real target is exactly the gap the agent found and walked through.

This is the sharper version of "verifiers get gamed." A single-number verifier is gameable because a single number is almost never the actual target. It's a stand-in, chosen because it's cheap to measure. The fix isn't a better single number. It's closing the distance between what gets measured and what actually matters, on two axes at once: how the judgment is structured, and how close the test environment is to the real thing.

## Two Places I've Been Closing That Gap

Both axes show up, separately, in work I've already shipped. It's worth being precise about what each one buys you.

The structure axis is the [OpenSpec + Superpowers evaluator harness](https://austinxyz.github.io/blogs/blog/openspec-superpowers-harness). A completed implementation doesn't get a single pass or fail. It gets scored against a written rubric, split across dimensions, spec compliance, runtime behavior, code quality, each independently weighted and independently checkable. That's the same move Scale AI described at the summit under the name rubric-based RL, replacing a single preference signal with a multi-dimensional scoring sheet, precisely for domains where no clean verifier exists. A rubric doesn't eliminate gaming. It raises the cost, because satisfying five independent checks by accident is much harder than satisfying one.

The environment axis is the [Signadot sandbox integration](https://austinxyz.github.io/blogs/blog/openspec-sandbox). Unit tests against mocks are a proxy for "the service works." A dev-time sandbox, forking one real service into a live cluster and routing real traffic through it, is closer to the actual target: whether the thing behaves correctly when it talks to other real services. The rubric can only score what the test environment is capable of observing. If the environment is a mock, the rubric is scoring a proxy no matter how well-structured it is. Move the environment closer to production, and the same rubric starts measuring something closer to the truth.

Neither one is a general answer to reward hacking. They're two narrow, specific ways of shrinking the gap between the signal and the target, in a domain where the target happens to be checkable at all.

## Coding Agents Have It Easy

That last clause is the whole problem for everything outside of code.

A coding agent's real target is unusually well-behaved. There's a spec, a set of tests, a running service that either responds correctly or doesn't. The distance between proxy and target can be closed almost entirely, because the target itself is mechanical and machine-checkable. That's what makes rubrics and sandboxes work here. The ground truth was always available. The work was building the harness to reach it.

I drew this same line, closed problems versus open ones, in [an earlier post on evolutionary search](https://austinxyz.github.io/blogs/blog/evolutionary-search-harness-next): evolutionary search only works when the objective can be automatically scored, and a trustworthy evaluator is the one that can't be satisfied by gaming the score instead of improving the real outcome. Reward hacking is what happens when that trust assumption breaks.

Most agentic work doesn't have that luxury. What's the real target when a robotic arm stacks blocks? Actual physical height is closer to the truth than a camera angle, but height alone still isn't the point, nobody wants a taller stack for its own sake. The real target sits one layer further out, in whatever the stack was supposed to be useful for, and that layer doesn't have a spec file or a test suite. It has to be inferred from downstream consequences: whether the outcome created value someone actually wanted, which is a business question wearing an evaluation question's clothes.

That's the open problem the summit's convergence actually points to. Coding agents get to cheat, in the good sense, because their target was already formalized before any agent showed up. Every other kind of agent has to build that formalization first, out of whatever's cheapest to measure, and live with the gap between that proxy and the real value until enough downstream evidence accumulates to close it. The verifier problem and the value-attribution problem turn out to be the same problem, just visible at different distances from the thing that was actually supposed to happen.
