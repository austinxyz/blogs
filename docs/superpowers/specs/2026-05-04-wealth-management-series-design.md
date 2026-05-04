# AI 理财系列 — Design Spec

**Date:** 2026-05-04  
**Series:** AI-Powered Wealth Management / AI 理财系列  
**Status:** Approved

---

## Series Overview

Three blog posts forming a loose series on using AI (Claude Code + LLM Wiki) for personal wealth management. Posts are related but independently readable. Each opens with a one-sentence series context and closes with cross-post references.

**Narrative arc:**  
Post 1 (入门) → Post 2 (实战复盘) → Post 3 (完整框架)  
*Knowledge base basics → Advanced system development → Full Investment OS*

---

## Post 1: LLM Wiki Personal Finance Knowledge Base

**Target platforms:** 掘金 + WeChat 老奥杂说  
**Language:** Chinese (with English technical terms)  
**Audience:** Non-technical Chinese immigrants in North America  
**Tone:** Approachable tutorial, step-by-step

### Titles
- 掘金: `用 Claude Code 建立你的北美华人理财知识库：从零到可用的完整指南`
- WeChat: `不会编程也能用 AI 管理理财？我是怎么做到的`

### Structure
1. **Hook** — The unique complexity of personal finance for Chinese in North America (taxes, cross-border accounts, 401K, investment accounts)
2. **Core Concepts** — What is Claude Code / What is LLM Wiki (Karpathy method) / Why combine them
3. **Step-by-Step Guide**
   - Project init: VS Code + Git + CLAUDE.md
   - Init prompt: directory structure (raw_material / wiki / output)
   - Obsidian for knowledge linking
   - Prompts for building knowledge areas (retirement, tax, cross-border, education)
   - Skills to simplify recurring prompts (wealth-extract, wealth-sync)
   - Output management: private data isolation
   - Publishing with Quartz
4. **Tool List** — Minimum set (Claude Code, VS Code) vs Nice-to-have (Git, Obsidian, Quartz)
5. **What's Next** — Self-use / sharing wiki / building toward an Agent

### Platform Differences
- **掘金:** Full tutorial with example prompts and screenshots, 5000–8000 words
- **WeChat:** Focus on Why + high-level How, skip operational details, ~2500 words, link to GitHub repo

### Key References
- Existing blog: https://austinxyz.github.io/blogs/blog/2025/12/16/claude-code-overview
- Karpathy LLM Wiki: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- GitHub repo: https://github.com/austinxyz/wealth-llm-wiki

### Output Files
- `raw_docs/juejin-wealth-01.md`
- `raw_docs/wechat-wealth-01.md`

---

## Post 2: rwh-overlay Project Retrospective

**Target platforms:** English main blog + 掘金 + WeChat  
**Language:** English first, then Chinese translation  
**Audience:** Professional AI / software developers  
**Tone:** Technical retrospective with architectural insights

### Titles
- English: `From LLM Wiki to Investment Agent: Lessons from Building rwh-overlay`
- 掘金/WeChat: `我是怎么用 Claude Code 建立炒股 AI 系统的：rwh-overlay 项目复盘`

### Structure
1. **Background** — What rwh is, why I extended it, the LLM Wiki foundation
2. **What I Built**
   - Hot sector + individual stock analysis
   - finance-skills integration
   - Custom workflow / integration skills
   - Auto-merge rwh + personal analysis → stock-kb
   - Quartz display + personal profile/position management
3. **Key Architectural Lessons**
   - Decouple principle: keep upstream content unchanged
   - Needs-driven development: pain point → workflow → tools
   - Complex skills: script + prompt combination
   - Wiki (evergreen / public) vs Output (time-sensitive / private) boundary
4. **From Skills to Agent: The Evolution Path**
   - Five-point comparison: Claude Code runtime vs fully independent Agent
   - rwh-overlay positioning: personal prototype → commercialization path
   - LLM Wiki limitations at scale: when RAG becomes necessary
5. **The Complete Business Story** — prototype → AI Native product → AI Native DevOps

### Platform Differences
- **English blog:** Full technical depth, links to DevOps at Scale and AI Native App Platform posts
- **掘金:** Chinese narrative, key technical terms in English, full depth
- **WeChat:** Focus on the story arc, reduce technical detail

### Key References
- DevOps at Scale: https://austinxyz.github.io/blogs/blog/2026/04/26/devops-at-scale
- AI Native App Platform: https://austinxyz.github.io/blogs/blog/cloud-native-to-ai-native-app-platform

### Output Files
- `blog/2026-XX-XX-rwh-overlay/index.md` (English)
- `raw_docs/juejin-wealth-02.md`
- `raw_docs/wechat-wealth-02.md`

---

## Post 3: The Investment Operating System

**Target platforms:** English main blog + 掘金 + WeChat  
**Language:** English first, then Chinese translation  
**Audience:** Investors wanting systematic AI tools + AI developers seeing real-world use cases  
**Tone:** Explanatory walkthrough, grounded in a real diagram

### Titles
- English: `The Investment Operating System: How I Use AI to Manage My Portfolio Systematically`
- 掘金/WeChat: `我的 AI 炒股操作系统全公开：从选股到持仓管理的完整 Workflow`

### Structure
1. **Opening** — Why "operating system" thinking matters; most investors rely on intuition, not repeatable systems
2. **IOS Framework Overview** — Show the diagram, six stages at a glance
3. **Stage-by-Stage Breakdown** (each: what it is + how AI participates)
   - Idea Generation: Claude analyzes earnings, news, sector rotation
   - Fundamental Research: company analysis + thesis quality check
   - Technical Confirmation: 5-step analysis template
   - Portfolio Allocation: account decision framework (Taxable vs IRA)
   - Execution: entry plan + risk management
   - Position Management: HOLD / TRIM / EXIT decision loop + tax loss harvesting
4. **The Private Data Layer** — output directory, personal profile, position tracking
5. **A Week in the Life** — brings the system alive as a real practice, not just a static framework
6. **Closing** — Cross-references to Post 1 (how to build) and Post 2 (developer perspective)

### Platform Differences
- **English blog:** IOS.png diagram, technical terms in English, investment-literate audience assumed
- **掘金/WeChat:** Chinese annotations on diagram, WeChat version emphasizes "a week in the life" narrative

### Visual Asset
- `raw_docs/images/IOS.png` (English version of the Investment OS diagram)

### Key References
- synthesis.md: `C:\Users\lorra\projects\personal\stock-kb\wiki\frameworks\synthesis.md`

### Output Files
- `blog/2026-XX-XX-investment-os/index.md` (English)
- `raw_docs/juejin-wealth-03.md`
- `raw_docs/wechat-wealth-03.md`

---

## Cross-Series Conventions

| Convention | Detail |
|-----------|--------|
| Opening tag | One sentence locating the post in the series |
| Closing section | "延伸阅读 / Further Reading" linking to other posts |
| Tags (English blog) | `wealth-management`, `ai`, `claude-code` |
| Tags (掘金) | `Claude Code`, `理财`, `LLM`, `Knowledge Base` |
| Commit prefix | `feat: add wealth series post N` |

---

## Writing Order

1. Post 1 (Chinese) → publish to 掘金 + WeChat
2. Post 2 (English) → translate → publish all platforms
3. Post 3 (English) → translate → publish all platforms
