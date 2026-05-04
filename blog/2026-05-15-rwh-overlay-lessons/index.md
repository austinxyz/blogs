---
title: "From LLM Wiki to Investment Agent: Lessons from Building rwh-overlay"
date: 2026-05-15
authors: [austin]
tags: [wealth-management, ai, claude-code]
description: "A developer's retrospective on extending an open-source stock analysis LLM wiki into a personal AI investment system — lessons on architecture, skills, agents, and the path to productization."
---

> This is part 2 of the AI Wealth Management series, exploring how to use Claude Code and LLM Wiki for personal investing.

Six months ago I was managing my portfolio the way most developers do: a spreadsheet, some bookmarked finance sites, and the vague sense that I was missing something. I had the tooling instincts but not the workflow. Then I found [rwh](https://github.com/kgajjala/rwh) — an open-source LLM wiki for blue-chip stock analysis by kgajjala — and things clicked. Not because rwh solved my problem out of the box, but because it gave me a foundation worth building on.

<!--truncate-->

This post is a retrospective on building [rwh-overlay](https://github.com/austinxyz/rwh-overlay), my personal extension layer on top of rwh. It's less about the financial outcomes (too early to claim those) and more about the architectural decisions, what worked, what surprised me, and where this kind of system naturally wants to go next.

## Background: Why Extend rwh?

rwh is a well-structured LLM wiki. kgajjala built it to aggregate blue-chip stock analysis into a knowledge base that an LLM can reason over — earnings summaries, analyst ratings, fundamentals, sector context. It's clean, opinionated, and maintained.

But it has a specific scope: blue-chip stocks, generalized analysis, no personal data. For my use case, that left three gaps:

1. **Sector-level analysis.** I'm interested in thematic positions — power grid infrastructure, battery storage, optical interconnects, LEO satellite broadband. rwh covers individual tickers well but doesn't have a sector-synthesis layer.
2. **Personal position tracking.** Generic analysis is useful. Analysis that accounts for my actual cost basis, concentration risk, and tax situation is much more useful.
3. **AI-assisted decision workflow.** I wanted Claude to help me think through weekly decisions, not just surface data.

So I built an overlay — a separate repo that treats rwh as upstream, adds my personal layer on top, and makes the whole thing accessible as Claude Code skills.

## What I Built

The overlay adds four things on top of rwh.

**Sector and individual stock analysis.** Claude analyzes the sectors I care about — power grid, battery storage, optical interconnects, LEO satellites — pulling news, earnings signals, and analyst rating changes. For individual stocks, this runs on a configurable ticker list and surfaces anything material from the past week. The key insight is that rwh's per-stock structure gives the LLM good grounding; the sector layer gives it the "so what does this mean for the theme" reasoning.

**finance-skills integration.** These are Claude Code skills that make the analysis interactive. `/morning-check` gives me a 5-minute portfolio pulse each morning. `/etf-check` compares my sector ETF positions against recent inflows and price momentum. `/market-weekly` synthesizes the week — macro context, sector moves, any position-level flags. These aren't dashboards; they're conversations with context.

**Custom integration skills.** The most useful one is `/wealth-advise`. It cross-references my current holdings against the latest rwh thesis updates. So if rwh's analysis of a stock I hold has changed materially — say, a downgrade or a significant revision to forward estimates — the skill flags it and offers a "given your position size and cost basis, here's how I'd think about this." That last part requires the personal context, which brings me to the output directory.

**Auto-merge pipeline.** Nightly, a script merges rwh's wiki data with my overlay analysis and writes to a `stock-kb` directory, which gets rendered via [Quartz](https://quartz.jzhao.xyz/) as a browsable site. The wiki content is public — shareable knowledge work. The `output/` directory is `.gitignore`'d. It contains my current positions, account balances, tax lot details, and any recommendations generated from that data. This boundary matters; I'll come back to it.

## Four Architectural Lessons

### Lesson 1: Decouple from Upstream Ruthlessly

The first thing I established was a rule: never modify rwh's content files directly. The only exception is the root index, which auto-regenerates from the wiki structure. Everything else in the upstream repo is read-only from my perspective.

This sounds obvious, but in practice there's constant temptation to "just add a note here" or "fix this summary." The cost of that habit is that upstream merges become painful — you're reconciling diffs against files you've touched, and eventually you fork instead of overlay.

The payoff of the discipline is that pulling upstream updates is a clean `git merge`. kgajjala ships improvements and I get them for free. My customization compounds on top of a maintained foundation rather than diverging from it.

The practical implementation: my overlay lives in a separate repo that mounts rwh as a git submodule. My scripts read from the submodule, write to overlay directories, and the merge pipeline combines them. The content boundary is enforced by repo structure, not willpower.

### Lesson 2: Start with the Pain, Not the Tool

Every skill I built started with a specific frustration. `/wealth-advise` started with: "I just saw that analysts revised their target price on a stock I hold. I have no idea if this changes my thesis or not, and I'll spend 30 minutes digging into it." Pain → workflow → tool.

The alternative — designing a comprehensive AI investment advisor and working backward — produces a different kind of system. One that's technically interesting but doesn't fit naturally into how you actually think about your portfolio.

The needs-driven approach also keeps scope honest. When a skill starts from a real pain, it has a natural stopping point: does it solve the pain? When you're designing from the tool outward, the scope tends to expand indefinitely because there's always more you could surface.

Concretely: `/morning-check` runs in under two minutes and tells me the three things I actually need to know before the market opens. That constraint came from the pain (I have 10 minutes before my first meeting) not from a feature list.

### Lesson 3: Scripts for Data, LLMs for Interpretation

The skills that work best have a clear seam: a deterministic script fetches and structures the data, and the LLM interprets it.

For earnings-related signals, a Python script hits the relevant APIs, normalizes the output into a structured format, and writes it to a staging file. Claude reads the staging file and reasons over it — is this beat or miss significant given the trend? Does this change the thesis? The script doesn't try to answer those questions. The LLM doesn't try to reliably fetch structured financial data.

This matters because LLMs hallucinate facts but reason well over provided facts. The moment you ask an LLM to recall a specific earnings number from memory, you're in trouble. The moment you give it the number and ask it to reason, you're in good shape. The seam between "data retrieval" and "interpretation" is where a lot of AI system bugs live — keeping it explicit saves debugging time.

### Lesson 4: Wiki vs. Output — The Boundary Is Load-Bearing

The distinction I maintain between wiki content and output content sounds like a minor organizational choice. It's actually structural.

**Wiki:** Evergreen, organized by ticker and sector, publicly shareable, no personal data. This is knowledge work — the kind of thing you'd be comfortable putting in a public repo.

**Output:** Time-sensitive, contains position sizes, cost basis, account balances, tax lot details. `.gitignore`'d. Not shareable.

Blur this boundary and you get one of two failure modes: you accidentally expose private data in a public repo, or you lose the ability to share your knowledge work because it's entangled with personal data.

The boundary also forces clarity about what the LLM is doing. When Claude is writing to the wiki, it's doing analysis — the kind of reasoning you'd stand behind publicly. When it's writing to output, it's doing synthesis against your specific situation — recommendations that depend on context that's unique to you. Keeping these separate makes it easier to audit, to share the wiki with others, and to understand what the system is actually producing.

## From Skills to Agent: The Evolution Path

The current workflow is already largely autonomous. Claude runs skills on a schedule, merges data, produces reports. I review the output, decide what to act on, and approve. Claude Code is the runtime.

The natural next question is: what would a fully independent investment agent look like — one that doesn't require Claude Code as its runtime? Here's how I think about the tradeoffs:

| Dimension | Claude Code Runtime | Standalone Agent |
|-----------|--------------------|--------------------|
| Dependencies | Claude Code subscription | API keys + infrastructure |
| Ecosystem | Rich — many Skills and MCPs available | Self-contained |
| Scale | Single user | Hundreds of concurrent users |
| Cost model | Subscription cap | Pay-per-token, harder to bound |
| Iteration speed | Fast — errors visible immediately | Slower — needs CI/CD, monitoring |

For rwh-overlay today, I'm the only user. The Claude Code runtime is the correct choice — it's low infrastructure overhead, fast to iterate, and the subscription cost is predictable. Building a standalone agent at this stage would be premature optimization. I'd spend engineering time on deployment pipelines and monitoring instead of on the analysis quality.

The calculus changes when the product is validated and I want to serve 10+ users. At that point the dev complexity jump is real: you need proper deployment infrastructure, monitoring, versioning, and production error handling. None of that is prohibitive — but it's a different kind of work.

One scaling limit worth flagging now: the LLM wiki approach works well when the ticker universe is small, roughly under 50 stocks. As the wiki grows — daily reports, quarterly earnings, analyst updates per ticker — the context window becomes a bottleneck. You're eventually trying to reason over more content than fits in a single context. That's when RAG stops being optional. I'm not there yet, but the architecture is designed to accommodate it: the wiki structure makes chunking natural, and Quartz's rendering gives me a retrieval surface to work from.

## The Complete Business Story

For personal use, the story is already coherent. rwh provides the foundation, the overlay adds personalization and workflow, and the result is something that materially improves how I think about my portfolio. I spend less time on information gathering and more time on actual decisions.

The productization path is visible from here, though. It goes roughly: validate the workflow for yourself (done), turn it into an AI-native product, and apply AI-native DevOps practices to operate it at scale. For the latter two, I've written about the patterns that apply: the [DevOps at Scale](https://austinxyz.github.io/blogs/blog/2026/04/26/devops-at-scale) post covers operating AI systems in production, and the [AI Native App Platform](https://austinxyz.github.io/blogs/blog/cloud-native-to-ai-native-app-platform) post covers the infrastructure thinking.

The investment management market is large enough to support a product in this space. The challenge isn't the technology — the technology is tractable. The challenge is the regulatory environment. Investment advice is a regulated activity, which means the path from "personal tool" to "product for others" involves compliance work that has nothing to do with the codebase. That's a solvable problem, but it's worth being clear-eyed that it's the actual bottleneck.

For now, the value is real and immediate for my own use. That's a reasonable place to be in month six.

## Further Reading

- Part 1: Building Your Personal Finance Knowledge Base with Claude Code *(coming soon)*
- Part 3: The Investment Operating System — Full Workflow Walkthrough *(coming soon)*
- [DevOps at Scale for AI Systems](https://austinxyz.github.io/blogs/blog/2026/04/26/devops-at-scale)
- [Cloud Native to AI Native App Platform](https://austinxyz.github.io/blogs/blog/cloud-native-to-ai-native-app-platform)
