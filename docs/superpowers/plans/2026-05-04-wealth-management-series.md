# AI 理财系列 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write and publish three-post AI wealth management series across English blog, 掘金, and WeChat.

**Architecture:** Sequential writing order (Post 1 → 2 → 3). Posts 1 is Chinese-only (掘金 + WeChat). Posts 2 and 3 are English-first with Chinese translation. Each post is standalone but loosely linked via series framing at open and close.

**Tech Stack:** Docusaurus 3.x (English blog), Markdown, Chinese + English tech terms (掘金/WeChat)

**Spec:** `docs/superpowers/specs/2026-05-04-wealth-management-series-design.md`

---

## File Map

| File | Post | Purpose |
|------|------|---------|
| `raw_docs/juejin-wealth-01.md` | 1 | 掘金 full tutorial (~5000–8000 words) |
| `raw_docs/wechat-wealth-01.md` | 1 | WeChat condensed version (~2500 words) |
| `blog/YYYY-MM-DD-rwh-overlay-lessons/index.md` | 2 | English blog post |
| `raw_docs/juejin-wealth-02.md` | 2 | 掘金 Chinese translation |
| `raw_docs/wechat-wealth-02.md` | 2 | WeChat condensed version |
| `blog/YYYY-MM-DD-investment-os/index.md` | 3 | English blog post |
| `blog/YYYY-MM-DD-investment-os/images/IOS.png` | 3 | Copied from `raw_docs/images/IOS.png` |
| `raw_docs/juejin-wealth-03.md` | 3 | 掘金 Chinese translation |
| `raw_docs/wechat-wealth-03.md` | 3 | WeChat condensed version |

**Replace `YYYY-MM-DD` with actual publish date when writing each post.**

---

## Series Framing Templates

Use these consistently across all posts.

**Opening (掘金/WeChat):**
> 这是 AI 理财系列的第 N 篇。本系列讲述如何用 Claude Code 和 LLM Wiki 构建个人理财 AI 系统。

**Opening (English blog):**
> This is part N of the AI Wealth Management series, exploring how to use Claude Code and LLM Wiki for personal investing.

**Closing section title:** `延伸阅读 / Further Reading`

**Blog frontmatter template:**
```yaml
---
title: "TITLE"
date: YYYY-MM-DD
authors: [austin]
tags: [wealth-management, ai, claude-code]
description: "One-sentence SEO summary"
---
```

**Truncation marker:** Add `<!--truncate-->` after the intro paragraph.

---

## Task 1: Post 1 — 掘金 Full Tutorial

**Files:**
- Create: `raw_docs/juejin-wealth-01.md`

**Reference material:**
- Raw outline: `raw_docs/理财系列.md` lines 1–59
- Existing Claude Code overview (reference link): https://austinxyz.github.io/blogs/blog/2025/12/16/claude-code-overview
- LLM Wiki gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- GitHub repo: https://github.com/austinxyz/wealth-llm-wiki

- [ ] **Step 1: Write the opening section**

```markdown
# 用 Claude Code 建立你的北美华人理财知识库：从零到可用的完整指南

> 这是 AI 理财系列的第 1 篇。本系列讲述如何用 Claude Code 和 LLM Wiki 构建个人理财 AI 系统。

## 北美华人理财有多复杂？

401(k) Rollover、Roth IRA、应税账户、跨境汇款、美股税务……
每一件事单独都不简单，合在一起更让人头大。

这篇文章要告诉你，怎么用 Claude Code + LLM Wiki，建立一个属于自己的北美华人理财知识库——
不需要编程背景，只需要你愿意把知识沉淀下来。

<!--truncate-->
```

- [ ] **Step 2: Write the "Core Concepts" section**

```markdown
## 什么是 Claude Code，它能做什么？

Claude Code 是 Anthropic 推出的 AI 编程助手，运行在命令行（Terminal）里。
它不只是聊天，而是一个能读取你的文件、理解你的项目、帮你整理和生成内容的 AI Agent。

→ 安装和入门：[Claude Code Overview](https://austinxyz.github.io/blogs/blog/2025/12/16/claude-code-overview)

## 什么是 LLM Wiki？

LLM Wiki 是 AI 科学家 Andrej Karpathy 提出的知识管理框架：
用 AI 把你收集的原始材料（raw_material）蒸馏为结构化知识（wiki），
再结合你的个人情况生成具体建议（output）。

→ 原始 Gist：https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

## 为什么把两者结合？

Claude Code 负责执行，LLM Wiki 负责框架。
结合起来，你得到的是一个随时可以追问、不断更新的私人理财顾问。
```

- [ ] **Step 3: Write the "Project Init" section**

```markdown
## 项目初始化

### 工具安装
1. 安装 [VS Code](https://code.visualstudio.com/)
2. 安装 [Claude Code](https://claude.ai/code)（需要 Claude Pro 订阅）
3. 安装 [Git](https://git-scm.com/)（可选，用于版本管理）

### 建立项目

在 VS Code 中新建一个文件夹，例如 `wealth-llm-wiki/`，然后在 Claude Code 中运行：

**Init Prompt：**
```
我希望用 Karpathy LLM Wiki 的思路建立我的北美华人理财知识库。
请帮我建立以下目录结构：
- raw_material/    # 我收集的原始文章和笔记
- wiki/            # 系统整理后的知识
- output/          # 结合我个人情况的分析（私有，不上传 git）

并建立初始的 CLAUDE.md 文件，加入以下规则：
- 永远不要把含个人金额、账户余额的内容放入 raw_material/ 或 wiki/
- 含个人数据的分析一律写入 output/（已被 .gitignore）
```
```

- [ ] **Step 4: Write the "Obsidian + Skills + Output" section**

```markdown
## 用 Obsidian 提升知识关联度

[Obsidian](https://obsidian.md/) 是一个 Markdown 笔记工具，擅长知识图谱和双向链接。

安装后，把 `wiki/` 目录作为 Vault 打开，你会看到：
- **Graph View**：知识条目的关联图
- **Wiki Link**：`[[401K-Rollover]]` 自动跳转
- **Dataview**：按标签筛选条目

**Prompt — 建立知识点提纲：**
```
我想建立北美华人理财知识库。请在 raw_material/ 下建立知识点提纲，
包含：财务基础、投资、税务、退休规划、跨境、教育资金等版块。
```

**Prompt — 填充某个知识点：**
```
根据 00-知识点提纲，请帮我收集"401K Rollover"的相关信息，
记录来源和核心内容，然后提炼到 wiki/ 目录。
```

## 用 Skill 简化日常操作

Claude Code 支持自定义 Skill（类似快捷指令）。
项目中内置了两个理财专用 Skill：

- **wealth-extract**：从原始文章中提取关键信息到 wiki
- **wealth-sync**：把 wiki 中的信息结合你的个人数据生成建议

```
# 使用示例
/wealth-extract   # 处理 raw_material/ 中的新文章
/wealth-sync      # 更新 output/ 中的个人建议
```

## Output 管理：让 AI 真正了解你

`output/` 目录存放你的个人数据，例如：
- 当前持仓
- 账户余额区间
- 税务情况

这些信息已被 `.gitignore`，不会上传 GitHub，但 Claude Code 可以读取它们，
让建议从"通用知识"变成"针对我的情况"。

## 用 Quartz 分享你的 Wiki

如果你想把知识库的 wiki 部分分享给朋友，可以用 [Quartz](https://quartz.jzhao.xyz/) 发布为网站。
output/ 的内容不会包含在内，保护隐私。
```

- [ ] **Step 5: Write the "Tool List + What's Next + Further Reading" section**

```markdown
## 工具清单

| 工具 | 用途 | 必须 |
|------|------|------|
| Claude Code | AI 执行引擎 | ✅ 必须 |
| VS Code | 项目管理和文件编辑 | ✅ 必须 |
| Git | 版本管理 | 推荐 |
| Obsidian | 知识图谱和双向链接 | 推荐 |
| Quartz | 将 wiki 发布为网站 | 可选 |

最小集只需要 Claude Code + VS Code，其余工具按需添加。

## 下一步可以做什么？

1. **自用**：持续更新 wiki，定期用 /wealth-sync 生成个人建议
2. **分享 raw + wiki**：通过 GitHub 或 Quartz 分享你整理的公开知识
3. **建立自己的客户目录**：如果你是理财从业者，可以为每位客户建立独立的 output/
4. **做更复杂的 Agent**：在这个框架上叠加更多数据源和分析工具

→ 项目 GitHub：https://github.com/austinxyz/wealth-llm-wiki

---

## 延伸阅读 / Further Reading

- [Post 2：我是怎么用 Claude Code 建立炒股 AI 系统的](待发布)
- [Post 3：我的 AI 炒股操作系统全公开](待发布)
```

- [ ] **Step 6: Review checklist before commit**

  - [ ] 全文语气适合掘金读者（中文叙述，English 技术词保留）
  - [ ] 包含系列 Opening（第 1 段）
  - [ ] `<!--truncate-->` 在 intro 段后
  - [ ] 所有 Prompt 示例可以直接复制使用
  - [ ] 工具链接有效
  - [ ] 字数在 5000–8000 字范围内
  - [ ] Further Reading 在文末

- [ ] **Step 7: Commit**

```bash
git add raw_docs/juejin-wealth-01.md
git commit -m "feat: add wealth series post 1 (juejin version)"
```

---

## Task 2: Post 1 — WeChat Condensed Version

**Files:**
- Create: `raw_docs/wechat-wealth-01.md`
- Source: `raw_docs/juejin-wealth-01.md`

- [ ] **Step 1: Write WeChat version**

从掘金版本精简，保留：
1. **开篇 Hook**（与掘金相同，约 200 字）
2. **一段话解释 LLM Wiki + Claude Code**（去掉技术细节）
3. **三个关键步骤**（建库 → 提炼知识 → 结合个人数据），每步一段话，不展示完整 Prompt
4. **工具清单**（仅最小集，一句话介绍每个工具）
5. **What's Next**（保留，略短）
6. **Further Reading**（与掘金相同）

目标：2500 字以内，读者读完能理解"是什么"和"为什么"，细节引导至 GitHub repo。

在文末加：
```markdown
完整操作步骤和示例 Prompt 见：https://github.com/austinxyz/wealth-llm-wiki
```

- [ ] **Step 2: Review checklist**

  - [ ] 字数 ≤ 2500 字
  - [ ] 去掉了所有完整 Prompt 示例（只保留功能说明）
  - [ ] 语气比掘金版轻松，适合公众号读者
  - [ ] 系列 Opening 和 Further Reading 保留

- [ ] **Step 3: Commit**

```bash
git add raw_docs/wechat-wealth-01.md
git commit -m "feat: add wealth series post 1 (wechat version)"
```

---

## Task 3: Post 2 — English Blog Post

**Files:**
- Create: `blog/YYYY-MM-DD-rwh-overlay-lessons/index.md`

**Reference material:**
- Raw outline: `raw_docs/理财系列.md` lines 61–90
- Upstream rwh: https://github.com/kgajjala/rwh
- User's overlay: https://github.com/austinxyz/rwh-overlay
- DevOps at Scale post: `blog/2026-04-26-devops-at-scale/index.md`
- AI Native App Platform post: `blog/2026-04-09-cloud-native-to-ai-native-app-platform/index.md`

- [ ] **Step 1: Create blog directory and write frontmatter + intro**

```bash
mkdir blog/YYYY-MM-DD-rwh-overlay-lessons
```

```markdown
---
title: "From LLM Wiki to Investment Agent: Lessons from Building rwh-overlay"
date: YYYY-MM-DD
authors: [austin]
tags: [wealth-management, ai, claude-code]
description: "A developer's retrospective on extending an open-source stock analysis wiki into a personal AI investment system, and what I learned about skills, agents, and commercialization."
---

> This is part 2 of the AI Wealth Management series, exploring how to use Claude Code and LLM Wiki for personal investing.

I've been using [rwh](https://github.com/kgajjala/rwh) — an open-source LLM wiki for blue-chip stock analysis — as my investment research foundation. But over time, I found myself wanting more: sector analysis, personal position tracking, automated workflows. So I built [rwh-overlay](https://github.com/austinxyz/rwh-overlay), my personal layer on top of it.

This post is a retrospective on what I built, what I learned, and where this kind of system is heading.

<!--truncate-->
```

- [ ] **Step 2: Write "What I Built" section**

```markdown
## What I Built on Top of rwh

The upstream rwh provides a solid wiki of blue-chip stock theses. My overlay adds:

**1. Sector and Individual Stock Analysis**
Hot sector tracking (power grid, storage, optical interconnects, LEO) with Claude analyzing news and earnings reports for pattern signals.

**2. finance-skills Integration**
[finance-skills](https://github.com/...) provides a complete toolkit for stock analysis. I integrated these as Claude Code Skills, accessible via `/morning-check`, `/etf-check`, and `/market-weekly`.

**3. Custom Integration Skills**
Beyond built-in tools, I wrote skills that bridge rwh's wiki data with my personal positions — for example, `/wealth-advise` cross-references my current holdings against the latest rwh thesis updates.

**4. Auto-Merge Pipeline**
rwh and my personal analysis merge nightly into `stock-kb`, a unified knowledge base. [Quartz](https://quartz.jzhao.xyz/) renders it as a browsable website — the public wiki is visible; my output/ stays private.

**5. Personal Profile + Position Management**
My `output/` directory contains current positions, account balances, and tax status. Claude reads these to turn generic recommendations into "for your situation specifically" advice.
```

- [ ] **Step 3: Write "Key Architectural Lessons" section**

```markdown
## Key Architectural Lessons

### 1. Decouple from Upstream
My rule: never modify rwh's content (except the root index, which auto-generates). This lets me pull upstream updates cleanly. Any customization lives in my overlay layer.

### 2. Needs-Driven Development
I didn't build features speculatively. Each skill started with a specific pain: "I need to know which of my holdings have a new analyst rating this week." Pain → workflow → tool. Reverse-engineering from the tool tends to produce solutions looking for problems.

### 3. Script + Prompt for Complex Skills
Fetching real-time data (news, earnings, analyst ratings) requires deterministic scripts. Interpreting it requires LLM. The combination works better than either alone — scripts handle the "get," prompts handle the "understand."

### 4. Wiki vs Output: Know the Boundary
- **Wiki:** Evergreen, publicly shareable, no personal data
- **Output:** Time-sensitive, contains positions and amounts, `.gitignore`'d

This boundary is load-bearing. Blur it and you either expose private data or lose the ability to share your knowledge work.
```

- [ ] **Step 4: Write "From Skills to Agent" + "Complete Business Story" sections**

```markdown
## From Skill-Based Workflow to Agent

The current rwh-overlay workflow is already largely autonomous. Claude runs skills, merges data, and produces reports — I review and approve. But it still requires Claude Code as its runtime.

What would a fully independent agent look like? Here's my comparison:

| Dimension | Claude Code Runtime | Standalone Agent |
|-----------|--------------------|--------------------|
| Dependencies | Claude Code subscription | API keys + infrastructure |
| Ecosystem | Rich — many Skills and MCPs available out of the box | Self-contained |
| Scale | Single user (subagents help, but limited concurrency) | Hundreds of concurrent users |
| Cost | Subscription cap | Pay-per-token, harder to bound |
| Iteration speed | Fast — errors visible immediately, fix in-session | Slower — needs CI/CD, monitoring |

For rwh-overlay today: I'm the only user. Claude Code runtime is the right call — fast iteration, rich ecosystem, no DevOps overhead.

**When would I switch to a standalone agent?**
When the product is validated and I want to serve more than 10 users. But even then, the dev complexity jumps significantly: you need deployment pipelines, monitoring, versioning, error handling for production. I covered this in [DevOps at Scale for AI Systems](https://austinxyz.github.io/blogs/blog/2026/04/26/devops-at-scale).

**One scaling limitation to flag:** LLM Wiki works well when your ticker universe is small (< 50 stocks). As the wiki grows — daily reports, quarterly earnings, analyst updates per ticker — the context window becomes a bottleneck. That's when RAG (Retrieval-Augmented Generation) becomes necessary.

## The Complete Business Story

For personal use, the story is already complete:
- Build your knowledge base (see Post 1)
- Overlay your workflows on top of proven upstream content
- Keep private data private, share knowledge openly

For productization, the path is:
1. Validate the workflow for yourself (done)
2. Turn it into an AI-native product — [AI Native App Platform](https://austinxyz.github.io/blogs/blog/cloud-native-to-ai-native-app-platform)
3. Apply AI-native DevOps practices to operate it at scale

The investment management market is large enough to support a product here. The challenge is the regulatory environment, not the technology.

---

## Further Reading

- [Post 1: Building Your Personal Finance Knowledge Base with Claude Code](待发布)
- [Post 3: The Investment Operating System — Full Workflow Walkthrough](待发布)
- [DevOps at Scale for AI Systems](https://austinxyz.github.io/blogs/blog/2026/04/26/devops-at-scale)
- [Cloud Native to AI Native App Platform](https://austinxyz.github.io/blogs/blog/cloud-native-to-ai-native-app-platform)
```

- [ ] **Step 5: Review checklist**

  - [ ] Frontmatter complete (title, date, authors, tags, description)
  - [ ] `<!--truncate-->` after intro paragraph
  - [ ] Series Opening in first paragraph
  - [ ] All GitHub links are real (not placeholder)
  - [ ] Internal blog links use correct paths
  - [ ] Further Reading section at end
  - [ ] Tone: technical retrospective, developer audience

- [ ] **Step 6: Commit**

```bash
git add blog/YYYY-MM-DD-rwh-overlay-lessons/
git commit -m "feat: add wealth series post 2 (english blog)"
```

---

## Task 4: Post 2 — Chinese Adaptation (掘金 + WeChat)

**Files:**
- Create: `raw_docs/juejin-wealth-02.md`
- Create: `raw_docs/wechat-wealth-02.md`
- Source: `blog/YYYY-MM-DD-rwh-overlay-lessons/index.md`

- [ ] **Step 1: Write 掘金 version**

从英文版翻译，规则：
- 中文散文叙述，技术名词保留英文：rwh-overlay, Claude Code, LLM Wiki, Skill, MCP, wiki, output, RAG, DevOps, Workflow, Agent, Context
- 加系列 Opening（第 1 段前）
- 表格和代码块保留，标题翻译
- 开头加：`> 这是 AI 理财系列的第 2 篇。本系列讲述如何用 Claude Code 和 LLM Wiki 构建个人理财 AI 系统。`

- [ ] **Step 2: Write WeChat version**

从掘金版精简：
- 保留：Background + What I Built（用叙述代替 bullet list）+ 最核心的 2 条 Lessons + Skills vs Agent 比较表
- 去掉：技术细节代码、完整的 5 点 vs 表格（用一段话概括）
- 结尾强调故事线（原型 → 产品 → DevOps）

- [ ] **Step 3: Review checklist**

  - [ ] 掘金版英文技术词保留
  - [ ] WeChat 版 ≤ 3000 字
  - [ ] 两个版本都有系列 Opening 和 Further Reading
  - [ ] 语气：掘金版技术深度，WeChat 版故事感

- [ ] **Step 4: Commit**

```bash
git add raw_docs/juejin-wealth-02.md raw_docs/wechat-wealth-02.md
git commit -m "feat: add wealth series post 2 (chinese versions)"
```

---

## Task 5: Post 3 — English Blog Post

**Files:**
- Create: `blog/YYYY-MM-DD-investment-os/index.md`
- Create: `blog/YYYY-MM-DD-investment-os/images/IOS.png` (copy from `raw_docs/images/IOS.png`)

**Reference material:**
- IOS diagram: `raw_docs/images/IOS.png`
- Framework synthesis: `C:\Users\lorra\projects\personal\stock-kb\wiki\frameworks\synthesis.md`
- Raw outline: `raw_docs/理财系列.md` lines 92–96

- [ ] **Step 1: Create blog directory and copy image**

```bash
mkdir blog/YYYY-MM-DD-investment-os
mkdir blog/YYYY-MM-DD-investment-os/images
cp raw_docs/images/IOS.png blog/YYYY-MM-DD-investment-os/images/IOS.png
```

- [ ] **Step 2: Write frontmatter + intro + IOS overview**

```markdown
---
title: "The Investment Operating System: How I Use AI to Manage My Portfolio Systematically"
date: YYYY-MM-DD
authors: [austin]
tags: [wealth-management, ai, claude-code]
description: "A walkthrough of the Investment Operating System — a six-stage framework for systematic stock investing, powered by Claude Code and LLM Wiki."
---

> This is part 3 of the AI Wealth Management series, exploring how to use Claude Code and LLM Wiki for personal investing.

Most investors make decisions reactively: a hot tip, a news headline, a gut feeling. I used to do the same. What changed wasn't my knowledge of investing — it was building a system.

The Investment Operating System (IOS) is the framework I use to go from idea to execution systematically. This post walks through it.

<!--truncate-->

![Investment Operating System](./images/IOS.png)

## The Six Stages at a Glance

1. **Idea Generation** — Where does the initial signal come from?
2. **Fundamental Research** — Does the thesis hold up?
3. **Technical Confirmation** — Is the timing right?
4. **Portfolio Allocation** — Where does it go (Roth vs Taxable)?
5. **Execution** — How do I enter?
6. **Position Management** — Hold, trim, or exit?
```

- [ ] **Step 3: Write stages 1–3**

```markdown
## Stage 1: Idea Generation

Signals come from four sources:
- **Chat method (Chen Yun):** AI analyst whose recommendations I cross-reference for sector themes
- **Earnings reports:** Quarterly signals for thesis updates
- **News & sector research:** Structural trends (power grid, storage, optical interconnects, LEO satellites)
- **Sector rotation signals:** Market breadth and relative strength shifts

Claude Code skill: `/stock-analyze <TICKER>` starts the research pipeline when a signal meets ≥3 of 5 screening criteria.

## Stage 2: Fundamental Research

Three frameworks run in parallel:

**BAIT** (Behavioral, Analytical, Informational, Technical mispricing) — identifies *why* the market is wrong about this stock. I require ≥3 overlap categories for a high-conviction thesis.

**Moneyball PW EV** — probability-weighted expected value vs current price. I require PW EV > current price by 15%+ and asymmetric upside > 2:1.

**Asset Types** — determines which valuation metrics matter for this business model (SaaS, hardware, commodity, etc.).

All three outputs go into `wiki/tickers/<TICKER>/thesis.md`.

## Stage 3: Technical Confirmation

Even a strong fundamental thesis needs the right entry timing. I use SEPA (Stage Analysis + Trend Template):

- **Stage 2 confirmation:** Stock must be in a Stage 2 uptrend (not Stage 3 topping or Stage 4 declining)
- **Trend Template:** ≥5 of 8 criteria pass
- **Pattern recognition:** VCP, cup-and-handle, or flat base with a clear pivot point
- **Volume confirmation:** Breakout volume > 150% of average

Claude Code skill: `/morning-check <TICKER>` runs this analysis and outputs Execute / Chase 50% / Wait / Skip.
```

- [ ] **Step 4: Write stages 4–6 + Private Data Layer**

```markdown
## Stage 4: Portfolio Allocation

Where a position goes depends on its characteristics:

| Asset type | Account |
|-----------|---------|
| Leveraged ETFs (TQQQ, TSLL) | Roth IRA only |
| High-growth individual stocks (<$100B market cap) | Roth IRA |
| Sector theme ETFs | Roth IRA |
| Blue-chip stocks (>$100B, moat, hold ≥1 year) | Taxable |
| Broad index ETFs (VTI, QQQ) | Taxable (DCA) |

The logic: Roth shelters high-churn, high-gain positions from tax. Taxable uses Tax Loss Harvesting (TLH) to offset capital gains.

## Stage 5: Execution

Claude Code skill `/morning-check` outputs:
- Entry price range (pivot ± 5%)
- Stop-loss level (based on Moneyball Bear Case or MA50)
- T1 and T2 price targets
- Risk/reward ratio (must be ≥ 2:1 to execute)
- Market environment check (SPY/QQQ vs 200-day MA)

## Stage 6: Position Management

Positions aren't bought and forgotten. The framework has explicit rules for each signal:

**Roth IRA positions:**
| Signal | Action |
|--------|--------|
| Hits stop-loss | Exit 100% — no exceptions |
| P&L > +20%, Stage 2 healthy | Hold, raise stop to breakeven |
| P&L > +20%, breaks MA50 | Trim 50%, trail stop remainder |
| Single-day gap +30% | Trim 50% to lock gains |
| Thesis broken | Lower trim threshold, consider full exit |

**Taxable positions:**
Tax is a first-class variable. A −15% drawdown on a blue chip held < 1 year triggers a tax calculation before any sell decision. Claude skill `/market-weekly` generates a weekly taxable account action plan including TLH opportunities.

## The Private Data Layer

The IOS is powered by data only I have:

- `output/positions.md` — current holdings per account
- `output/profile.md` — risk tolerance, time horizon, tax bracket
- `data/strategy/roth-2026.md` and `taxable-2026.md` — annual strategy

These files live in `.gitignore`'d directories. Claude reads them to turn framework recommendations into "for your situation specifically" advice. Without this layer, the system gives generic guidance. With it, it says: "You're already at 6 Roth individual stocks — you need to exit one before adding NVDA."

## A Week in the Life

**Monday morning:** Run `/morning-check ALL` — scans all positions, flags any that need attention (stop-loss approach, earnings this week, thesis updates).

**During the week:** Any Chen Yun signal or news event triggers `/stock-analyze <TICKER>` for a full research pass if it meets screening criteria.

**Weekend:** Run `/market-weekly` — generates the taxable account action plan (TLH candidates, blue-chip candidates, DCA execution for the coming week).

**Monthly:** Review wiki updates from upstream rwh, run `/stock-refresh` on core holdings to update theses with latest earnings.

---

## Further Reading

- [Post 1: Building Your Personal Finance Knowledge Base with Claude Code](待发布)
- [Post 2: From LLM Wiki to Investment Agent — rwh-overlay Retrospective](待发布)
```

- [ ] **Step 5: Review checklist**

  - [ ] Frontmatter complete
  - [ ] `<!--truncate-->` after intro paragraph
  - [ ] IOS image referenced correctly (`./images/IOS.png`)
  - [ ] Series Opening in first paragraph
  - [ ] All 6 IOS stages covered
  - [ ] Private data layer section present
  - [ ] "Week in the Life" section present
  - [ ] Further Reading at end
  - [ ] No Chinese text in English blog post
  - [ ] Run `npm run build` to verify no broken links

- [ ] **Step 6: Commit**

```bash
git add blog/YYYY-MM-DD-investment-os/
git commit -m "feat: add wealth series post 3 (english blog)"
```

---

## Task 6: Post 3 — Chinese Adaptation (掘金 + WeChat)

**Files:**
- Create: `raw_docs/juejin-wealth-03.md`
- Create: `raw_docs/wechat-wealth-03.md`
- Source: `blog/YYYY-MM-DD-investment-os/index.md`

- [ ] **Step 1: Write 掘金 version**

从英文版翻译，规则：
- 中文叙述，技术词保留英文：IOS, Roth IRA, Taxable, BAIT, Moneyball, SEPA, TLH, Wiki, output, Skill, Claude Code, Stage, Pivot, VCP
- 加系列 Opening
- 表格直接使用，标题翻译
- 图片引用改为：`![Investment Operating System](../raw_docs/images/IOS.png)` 或上传图到掘金

- [ ] **Step 2: Write WeChat version**

从掘金版精简：
- 保留：IOS 图 + 六阶段简介 + "Week in the Life"（这部分画面感最强）
- 去掉：详细的框架说明（BAIT/Moneyball 细节），完整的 Position Management 表格
- 结尾引导到 GitHub repo 或英文博客看完整内容

目标：3000 字以内，重点是让读者理解"这是一套可复现的系统"。

- [ ] **Step 3: Review checklist**

  - [ ] 掘金版技术词保留英文
  - [ ] WeChat 版 ≤ 3000 字
  - [ ] 两版都有系列 Opening 和 Further Reading
  - [ ] IOS 图可以正常显示（掘金需要上传图片）

- [ ] **Step 4: Commit**

```bash
git add raw_docs/juejin-wealth-03.md raw_docs/wechat-wealth-03.md
git commit -m "feat: add wealth series post 3 (chinese versions)"
```

---

## Self-Review Against Spec

- [x] Post 1: 掘金 (juejin-wealth-01.md) + WeChat (wechat-wealth-01.md) ✅
- [x] Post 2: English blog + juejin-wealth-02.md + wechat-wealth-02.md ✅
- [x] Post 3: English blog + IOS image + juejin-wealth-03.md + wechat-wealth-03.md ✅
- [x] Series Opening template defined ✅
- [x] Further Reading / 延伸阅读 in every post ✅
- [x] Frontmatter template for English blog posts ✅
- [x] `<!--truncate-->` included in English blog steps ✅
- [x] Writing order: 1 → 2 → 3 ✅
- [x] Platform differences respected (掘金 depth, WeChat narrative) ✅
- [x] `npm run build` check in Post 3 task ✅
