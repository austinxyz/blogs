---
title: "Building AI Agent: From Complex Claude Skills to Production-Grade AI Agents"
date: 2026-05-04T15:00
authors: [austin]
tags: [wealth-management, ai, claude-code]
description: "A developer's retrospective on extending an open-source stock analysis LLM wiki into a personal AI investment system — covering complex command and workflow development, the script/LLM seam, and the real engineering challenges of graduating to a standalone agent."
---

> This is part 2 of the AI Wealth Management series, exploring how to use Claude Code and LLM Wiki for personal investing.

This post is for developers building AI systems. Specifically: how to develop complex, multi-step Claude Code commands and compose them into workflows — and what it actually takes to turn a working personal tool into a production-grade agent.

The domain is stock investing, but the patterns apply broadly. This post stands on its own — if you want background on what Claude Code is, how LLM Wiki works, and how to build a knowledge base from scratch, [Part 1](https://austinxyz.github.io/blogs/blog/2026/05/04/wealth-llm-wiki) covers that, but it's not a prerequisite here.

<!--truncate-->

---

## Starting Point: What RWH Provides

[RWH](https://github.com/kgajjala/rwh) by kgajjala is an open-source LLM wiki for blue-chip stock analysis. The name stands for Richer, Wiser, Happier — a fitting aspiration for an investment knowledge base. It aggregates earnings summaries, analyst ratings, and sector context into a Markdown-based knowledge base that an LLM can reason over directly. Each ticker gets a structured file with fundamentals, recent analyst calls, and thesis notes. The whole thing is designed around Karpathy's LLM Wiki pattern: raw material is distilled into evergreen wiki entries, and you query the wiki to get grounded analysis instead of hallucinated recall.

The benefits are real:
- Well-maintained and actively updated by kgajjala
- Structured consistently, so commands that work on one ticker work on all of them
- Covers the blue-chip universe thoroughly — earnings beats, analyst upgrades/downgrades, competitive dynamics
- The CLAUDE.md in the repo documents the analytical frameworks baked into each ticker's wiki entry, giving any LLM operating on it a clear reasoning scaffold

Three gaps for my use case:

**Coverage.** RWH covers blue chips. I'm also tracking thematic positions — power grid infrastructure, battery storage, optical interconnects, LEO satellite broadband. These require sector-level synthesis that per-ticker summaries don't provide.

**Personalization.** Generic analysis tells you what's happening. Analysis that accounts for my cost basis, account concentration, and tax situation tells me what to do about it. RWH isn't designed to know your portfolio.

**Workflow.** I needed Claude to produce actionable decisions on a schedule — not just surface information when I ask. That requires composing commands into workflows with defined inputs, defined outputs, and consistent logic.

---

## What I Built

[RWH-overlay](https://github.com/austinxyz/rwh-overlay) is a separate repo that sits alongside RWH and adds four layers on top. A nightly merge pipeline pulls RWH's wiki content and combines it with my overlay's analysis — the two repos stay independent.

**Sector and individual stock analysis.** Beyond RWH's per-ticker coverage, I added sector-level synthesis for the themes I track. Claude pulls recent news, earnings signals, and analyst changes across the sector and produces structured summaries. The key insight: RWH gives the LLM grounding in individual businesses; the sector layer provides the "so what does this mean for the theme" reasoning that connects company-level events to multi-year capital deployment stories.

**[finance-skills](https://github.com/himself65/finance-skills) integration.** finance-skills is an open-source collection of Claude Code skills for financial data retrieval and analysis. It covers a wide range — earnings calendars, options flow, technical indicator calculation, and more. Claude Code skills have two modes: self-use (stored in your project's `.claude/commands/`) and plugin mode (installed globally, shared across projects). I use finance-skills as a plugin, so I get their updates without managing the code. Notable: `finance-market-analysis:sepa-strategy` provides full SEPA technical analysis, which I use as an input to my `/morning-check` command.

**Custom integration commands.** The overlay adds commands that wire RWH's wiki content and finance-skills' data retrieval together with my private data. The actual command inventory:

| Command | Purpose |
|---------|---------|
| `/kb-sync` | Build and sync the combined stock knowledge base from upstream + overlay |
| `/stock-analyze <TICKER>` | Full research pipeline: 15-section thesis with BAIT, Moneyball PW EV, Asset Type |
| `/stock-refresh <TICKER>` | Thesis update after earnings or material news |
| `/stock-entry <TICKER>` | Entry and exit point analysis for a specific ticker |
| `/morning-check <TICKER>` | Open-time decision: thesis check, SEPA status, entry/stop/target |
| `/morning-check ALL` | Batch scan across all positions; surfaces anything requiring action |
| `/etf-analyze <TICKER>` | Deep ETF analysis: holdings review, expense ratio, liquidity, sector purity |
| `/etf-check` | Event-driven ETF sector DCA decision — checks trigger conditions |
| `/chen-integrate` | Parse Chen Yun observations and flag tickers for research |
| `/chen-validate <TICKER>` | Cross-validate a Chen-mentioned ticker against the investment frameworks |
| `/market-daily` | Daily market report and sector health summary |
| `/market-weekly` | Weekly taxable account action plan: TLH opportunities, blue chip candidates, DCA execution |
| `/market-monthly` | Monthly portfolio and thesis review |
| `/market-quarterly` | Quarterly portfolio and strategy review |

Each command reads from three sources: RWH's wiki (public, upstream), my overlay's sector analysis (public, mine), and `data/positions.md` + `data/profile.md` (private, git-ignored). The combination is what makes the output specific rather than generic.

**Auto-merge pipeline.** Nightly, a script merges RWH's wiki content with my overlay analysis into a `stock-kb` directory, rendered via [Quartz](https://quartz.jzhao.xyz) as a browsable site. The wiki is shareable. So is the output directory — it holds date-tagged market reports with no personal position data. Only the data directory is private — that's where position-specific files live, and it's git-ignored.

---

## The Workflow Is the Product

Individual commands are tools. The workflow is what makes them useful.

Here's the actual decision flow for a new position in the Roth IRA, showing how the commands compose:

```
[Idea enters]
    │
    ├─ Sector scan / Chen Yun signal / earnings surprise
    │
    ↓
[/stock-analyze <TICKER>]
    │
    ├─ Reads RWH wiki entry (if blue chip) + sector analysis
    ├─ Applies BAIT framework: identifies mispricing type
    ├─ Runs Moneyball PW EV: Bull/Base/Bear scenarios → weighted EV
    ├─ Applies Asset Type framework: confirms correct valuation lens
    │
    ↓ PW EV > current price + 15%, upside/downside > 2:1?
    │
    ├─ No → Watch list, re-evaluate after next catalyst
    └─ Yes ↓
         │
    [/morning-check <TICKER>]
         │
         ├─ finance-market-analysis:sepa-strategy checks Stage 2 + Trend Template
         ├─ Identifies pattern (VCP / cup-handle / flat base) and pivot point
         ├─ Checks market environment (SPY/QQQ vs 200MA)
         │
         ↓ Output: Execute / Chase 50% / Wait / Skip
```

The `/morning-check ALL` variant runs this logic across all current positions each morning, surfacing stops that need attention, approaching targets, and thesis-breaking signals.

The taxable account has a parallel workflow driven by `/market-weekly`: every Sunday, it generates a structured action plan covering tax loss harvesting opportunities (checking wash sale compliance), blue chip candidates from RWH's latest Initiate/Add recommendations, and DCA execution for VTI/QQQ. That plan writes to a private file that never gets committed.

This workflow — not any individual command — is what makes the system useful. The commands are reusable components; the workflow is the product.

In total: 4 primary workflows (stock entry, daily monitoring, ETF sector DCA, and Chen Yun integration), 14 commands spanning research, position management, and periodic reporting, and a build script that merges the upstream RWH wiki with overlay analysis nightly.

These four workflows, taken together, form a six-stage investment process — from idea generation through position management. That full picture is documented separately in [Part 3: The Investment Operating System](https://austinxyz.github.io/blogs/blog/2026/05/04/investment-os), which covers how all the stages connect without going into implementation detail.

---

## Five Lessons

### 1. Decouple from Upstream Ruthlessly

First rule: never modify RWH's content files directly. The only exception is the root index, which auto-regenerates from the wiki structure.

The temptation to "just add a note here" is constant. The cost: upstream merges become painful — you're reconciling diffs against files you've touched, and eventually you fork instead of overlay. That means losing free improvements from kgajjala.

The payoff: pulling RWH updates is a clean `git merge`. My work compounds on top of a maintained foundation.

Implementation: RWH and RWH-overlay are separate repos. The nightly merge pipeline pulls from RWH's repo, reads its wiki content, combines it with my overlay's analysis, and writes to the `stock-kb` directory. Scripts never write back to RWH's files. The boundary is enforced by convention in the pipeline, not by repo structure — which means it requires discipline to maintain.

### 2. Build Workflow from Pain, Not from Features

Every command I built started with a specific frustration. `/morning-check` started with: "Before the market opens, I need to know which positions are approaching stops, which have earnings this week that affect the thesis, and which patterns are breaking out. I need this in five minutes, not thirty."

The alternative — designing a comprehensive AI investment advisor and working backward — produces a system that's feature-complete but doesn't fit how you actually think about a portfolio. The scope expands indefinitely because there's always more you could surface.

Needs-driven design also reveals what RWH and finance-skills actually give you. I didn't plan to use `finance-market-analysis:sepa-strategy` — I discovered it while looking for a way to automate the SEPA Stage Analysis that was the most time-consuming part of my morning routine. The pain pointed to the tool.

### 3. Scripts for Data, LLMs for Interpretation

The commands that work best have a clean seam: a deterministic script fetches and structures the data; the LLM interprets it.

For earnings signals: a Python script hits the relevant APIs, normalizes the output into a structured staging file. Claude reads the staging file and reasons over it — is this beat significant given the trend? Does it change the thesis? The script doesn't answer those questions. The LLM doesn't fetch structured financial data.

This matters because LLMs hallucinate facts but reason well over provided facts. Ask an LLM to recall a specific EPS number from memory and you're in trouble. Give it the number and ask what it means in context and you're in good shape. The seam between "retrieval" and "interpretation" is where most AI system bugs live.

For complex commands, I used Superpowers' brainstorm/plan/TDD workflow: test the script logic independently, wire the LLM reasoning around verified structured output. The scripted parts are fully testable; the LLM parts aren't — which is exactly why you want the LLM touching only interpretation, where the "right answer" is judgment, not a deterministic fact.

### 4. The Directory Boundaries Are Load-Bearing

The project has four directories. The distinctions between them look like organizational decisions. They're structural ones.

**raw/**: source material — articles, transcripts, notes collected for research. Input only.

**wiki/**: distilled evergreen analysis, organized by ticker and sector. Publicly shareable. Thesis notes, sector syntheses, framework documentation — work you'd put in a public repo.

**output/**: date-tagged reports with no personal position data. Market dailies, sector summaries, public analysis outputs. Shareable — market commentary that's useful without knowing your holdings.

**data/**: the private layer. Strategy documents tied to your actual positions, and date-tagged analysis reports that incorporate your holdings. Git-ignored. Never shareable.

The load-bearing distinction is between wiki + output (public) and data (private). Blur this and you get one of two failure modes: you accidentally expose holdings or cost basis, or you can't share your market research because it's tangled up with personal data.

The boundary also forces clarity about what the LLM is doing. When it writes to wiki or output, it's doing analysis you'd stand behind publicly. When it writes to data, it's doing synthesis against your specific situation. Keeping them separate makes the system easier to audit and easier to understand when something goes wrong.

### 5. Know the Scaling Limit

The LLM wiki approach works well when the ticker universe is bounded. At 150 tickers with regular updates, context window management is still tractable — especially if each command reads selectively rather than loading the full wiki. The limit becomes real when you're trying to reason over thousands of data points simultaneously.

That's when RAG stops being optional. The wiki's file structure makes chunking natural, and Quartz's rendered output provides a retrieval surface. The architecture anticipates this: the same file organization that works for LLM-in-context today works for vector retrieval later, without restructuring the knowledge base.

---

## From Commands to Agent: The Real Engineering Challenges

The current system is largely autonomous — commands run on a schedule, produce structured output, and I review and decide. Claude Code is the runtime.

The natural next question: what does it take to make this into a standalone agent that doesn't require my Claude Code session as its runtime — one that could serve multiple users?

The business logic is the easy part. It's already validated: I've been running these workflows for weeks, the decision logic is battle-tested, and the framework is documented. Converting validated business logic to a standalone API is mechanical work.

The hard part is the operational layer that makes agents trustworthy at scale:

**Script architecture doesn't travel for free.** Scripts written for single-user local execution have hidden assumptions — local file paths, sequential execution, shared environment variables. Making them stateless and containerizable means making those assumptions explicit and eliminating them. Scripts that call `/morning-check` natively assume there's only one user's `data/positions.md`. Multi-user means per-tenant data isolation from the start.

**Non-determinism becomes a governance problem.** In personal use, if the recommendation varies slightly from yesterday on the same input, I notice and adjust. At scale, users expect consistency, regulators may require explainability, and debugging requires reproducibility. This means adding prompt versioning, structured input/output logging, and human-in-the-loop gates for consequential actions — none of which are in the current implementation.

**Testing requires a different approach.** Testing commands locally is easy — run them and see what happens. Testing them properly for a production system requires:
- Sandbox market data (historical prices, not live)
- Fixture-based LLM responses for deterministic behavior testing
- End-to-end integration tests across the full workflow
- A staging environment that mirrors production without affecting real positions

The Superpowers TDD workflow already enforces clean testing of script logic. But the full agent path requires environment discipline — a staging layer that validates behavior without burning real API tokens or making real decisions.

**Observability is different for agents.** When an agent produces a wrong recommendation, you need to know: what data it read, which framework it applied, what alternatives it considered, why it chose what it chose. Standard logging doesn't capture this. You need structured agent tracing — recording the full decision context, not just the inputs and outputs. This is the difference between a log that says "recommended Exit" and one that says "recommended Exit because BAIT returned 1 overlap (insufficient), Moneyball PW EV was below current price, and Stage 2 criteria failed."

**Agents need first-class infrastructure treatment.** Running agents in production means answering questions that don't arise for personal use: What does it mean to release a new version of a command? How do you roll back if `/morning-check` starts producing bad output? How do you enforce spend limits when agent calls are expensive? How do you monitor whether an agent is "working" when correct output is inherently non-deterministic?

**Development methodology shifts fundamentally.** Building Claude Code commands is largely prompt-driven — the Superpowers brainstorm/plan/TDD workflow handles the complexity well, and you can iterate in the terminal without writing much code. A standalone agent is a software product: it requires spec-driven development, proper software architecture, and the full code-level engineering that comes with building a real service. The gap between "I can describe what I want in a prompt" and "I can build and maintain a production codebase that does it reliably" is real, and it's often the most underestimated part of the transition.

These are the challenges covered in the [DevOps at Scale](https://austinxyz.github.io/blogs/blog/2026/04/26/devops-at-scale) post — and the reason the [AI Native App Platform](https://austinxyz.github.io/blogs/blog/cloud-native-to-ai-native-app-platform) post argues that standard DevOps patterns need to adapt for AI-native systems, where observability, governance, and the agent itself need to be first-class infrastructure concepts.

For RWH-overlay specifically: the productization path is visible, but the real blocker isn't engineering. Investment advice is a regulated activity. The path from personal tool to product for others involves compliance work that has nothing to do with the codebase. That's worth being clear-eyed about before investing in the operational layer.

For now: the value is real and immediate for personal use. That's a reasonable place to be.

---

## Further Reading

- [Part 1: Building Your Personal Finance Knowledge Base with Claude Code](https://austinxyz.github.io/blogs/blog/2026/05/04/wealth-llm-wiki)
- [Part 3: The Investment Operating System — Full Workflow Walkthrough](https://austinxyz.github.io/blogs/blog/2026/05/04/investment-os)
- [RWH on GitHub](https://github.com/kgajjala/rwh)
- [RWH-overlay on GitHub](https://github.com/austinxyz/rwh-overlay)
- [finance-skills on GitHub](https://github.com/himself65/finance-skills)
- [AI Native App Platform](https://austinxyz.github.io/blogs/blog/cloud-native-to-ai-native-app-platform)
- [DevOps at Scale for AI Systems](https://austinxyz.github.io/blogs/blog/2026/04/26/devops-at-scale)
