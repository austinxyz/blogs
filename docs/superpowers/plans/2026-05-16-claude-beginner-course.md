# Claude 初学者付费直播课 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 准备好两节 × 2 小时付费直播课的全部演示素材、概念讲义和学员资源

**Architecture:** 每个任务输出一个独立的 Markdown 文件，内容互相引用但可独立使用。课程素材存放在 `course/` 目录，按节次和演示模块分组。

**Tech Stack:** Markdown、Claude Code（演示用）、ppt-master skill（演示用）、Claude Cowork（演示用）

---

## 文件结构

```
course/
  session1/
    slides-outline.md          ← 第一节概念部分幻灯片提纲
    demo-cowork/
      virtual-email.md         ← 虚拟客户询盘邮件（演示素材）
      workflow-config.md       ← Cowork 工作流配置步骤
      expected-output.md       ← 预期报告输出样本
  session2/
    slides-outline.md          ← 第二节概念部分幻灯片提纲
    demo-code/
      source-materials/
        article-01-claude-code-intro.md   ← 知识库原料文章 1
        article-02-llm-wiki-method.md     ← 知识库原料文章 2
        article-03-personal-finance-ai.md ← 知识库原料文章 3
      demo-script.md           ← Claude Code 知识库搭建演示脚本
    demo-skills/
      demo-script.md           ← ppt-master 演示脚本
  student-resources.md         ← 学员资源清单（链接 + 安装指南）
  rehearsal-notes.md           ← 排练计时记录
```

---

## Task 1: 创建课程目录结构

**Files:**
- Create: `course/session1/demo-cowork/.gitkeep`
- Create: `course/session2/demo-code/source-materials/.gitkeep`
- Create: `course/session2/demo-skills/.gitkeep`

- [ ] **Step 1: 创建目录结构**

```bash
mkdir -p course/session1/demo-cowork
mkdir -p course/session2/demo-code/source-materials
mkdir -p course/session2/demo-skills
```

- [ ] **Step 2: 验证目录创建成功**

```bash
find course/ -type d
```

期望输出：
```
course/
course/session1
course/session1/demo-cowork
course/session2
course/session2/demo-code
course/session2/demo-code/source-materials
course/session2/demo-skills
```

- [ ] **Step 3: Commit**

```bash
git add course/
git commit -m "chore: scaffold course materials directory structure"
```

---

## Task 2: 第一节幻灯片提纲

**Files:**
- Create: `course/session1/slides-outline.md`

- [ ] **Step 1: 创建幻灯片提纲**

写入 `course/session1/slides-outline.md`：

```markdown
# 第一节幻灯片提纲
> 概念部分共约 40 分钟（0:00–0:40），每页幻灯片约 2–3 分钟

---

## 模块一：Claude 是什么（0:00–0:20，约 8 页）

### 幻灯片 1 — 封面
- 标题：从零上手 Claude
- 副标题：第一节：认识 Claude · 学会协作 · 掌握 Cowork

### 幻灯片 2 — 你现在可能在用什么
- 列举：ChatGPT、Kimi、文心一言
- 问题：它们有什么局限？

### 幻灯片 3 — Claude 的核心差异
- 更长的上下文窗口（200k tokens）
- 更准确的指令遵循
- Projects 功能：记住你的背景信息
- 适合需要深度分析、长文本处理的工作

### 幻灯片 4 — Claude 能做什么（用图示）
- 写作与润色
- 信息整理与分析
- 自动化工作流（Cowork）
- 文件操作（Claude Code）

### 幻灯片 5 — 如何注册
- 访问 claude.ai
- 推荐 Pro 计划（$20/月）的理由：Projects + 更多用量
- 演示：注册界面截图

### 幻灯片 6 — Claude.ai 界面导览
- 对话区、Projects、附件上传
- 实操演示入口（切换到屏幕共享）

### 幻灯片 7 — 与 GPT 的一句话区别
- "GPT 是百科全书，Claude 是你的专属助理——你告诉它越多，它就越懂你"

### 幻灯片 8 — 小结
- 今天你会学到三件事（预告课程主线）

---

## 模块二：普通人如何与 AI 协作（0:20–0:40，约 6 页）

### 幻灯片 9 — 最常见的错误用法
- 当搜索引擎用：问完就走，不给背景
- 期待一次完美：第一个答案不好就放弃
- 示例对比：❌ "帮我写邮件" vs ✅ "我是市场经理，要写给潜在客户的询盘回复，对方是中小企业主，语气要专业但不冷漠"

### 幻灯片 10 — 协作三原则
1. **给上下文**：你是谁、任务背景、输出要求
2. **迭代而非一次完美**：把 AI 当草稿机，不断精炼
3. **你负责判断**：AI 提供选项，你做决策

### 幻灯片 11 — Projects：让 Claude 记住你
- 创建 Project，写入你的角色/偏好/常用背景
- 之后每次对话都有上下文，不用重复说明

### 幻灯片 12 — 实操演示入口
- "接下来我们看一个真实场景……"
- 切换到屏幕共享

### 幻灯片 13 — 从 Claude.ai 到 Cowork
- 桥接页：Claude.ai 解决单次任务，Cowork 解决重复工作流
- 预告：接下来演示邮件自动化工作流

### 幻灯片 14 — Cowork 是什么（一页简介）
- 多个 AI Agent 协同工作
- 你定义触发条件和流程，Claude 自动执行
- 适合：有规律的重复性工作（邮件处理、定期报告等）
```

- [ ] **Step 2: 自检：每个时间段都有对应幻灯片吗？**

检查 0:00–0:20 有 8 页（≈2.5 分钟/页），0:20–0:40 有 6 页（≈3 分钟/页），总体节奏合理。

- [ ] **Step 3: Commit**

```bash
git add course/session1/slides-outline.md
git commit -m "docs: add session 1 slides outline"
```

---

## Task 3: Cowork 虚拟演示素材

**Files:**
- Create: `course/session1/demo-cowork/virtual-email.md`
- Create: `course/session1/demo-cowork/workflow-config.md`
- Create: `course/session1/demo-cowork/expected-output.md`

- [ ] **Step 1: 创建虚拟询盘邮件**

写入 `course/session1/demo-cowork/virtual-email.md`：

```markdown
# 虚拟演示邮件

> 用途：Cowork 演示的触发素材。在直播时粘贴到 Cowork 的邮件输入框。

---

**发件人：** li.ming@techstartup.cn
**收件人：** [你的邮箱]
**主题：** 询盘：SaaS 项目管理工具合作意向

---

李总，

您好！我是科技初创公司 TechStart 的采购负责人李明。

我们公司目前有 30 人团队，正在评估项目管理工具的采购方案。我们在网上看到了贵司的产品介绍，对其 AI 自动化功能很感兴趣。

想了解以下几点：
1. 30 人团队的年度授权价格区间？
2. 是否支持与飞书、钉钉的数据同步？
3. 有没有金融/科技行业的客户案例可以参考？

如方便，希望本周内能安排一次 30 分钟的线上演示。

谢谢！
李明
TechStart 采购部
```

- [ ] **Step 2: 创建 Cowork 工作流配置说明**

写入 `course/session1/demo-cowork/workflow-config.md`：

```markdown
# Cowork 工作流配置说明

> 直播演示步骤，按顺序操作，每步都可以暂停讲解

---

## 演示流程（共 4 步，约 60 分钟含讲解）

### Step 1：展示触发条件（5 分钟）
- 打开 Claude Cowork 界面
- 新建工作流，命名："客户询盘处理"
- 触发方式：手动触发（直播演示用，真实场景可设为邮件触发）
- 粘贴 `virtual-email.md` 的邮件内容作为输入

**讲解要点：** "真实场景下，这个触发可以是：收到新邮件自动触发，或者定时扫描收件箱。我们这里手动演示，逻辑是一样的。"

### Step 2：配置调研 Agent（15 分钟）
- 添加 Agent：竞品调研
- 提示词：
  ```
  你是一位市场调研助手。根据以下客户询盘，调研该客户所在行业（科技初创）
  对项目管理工具的主要需求点，以及市场上同类产品（Jira、飞书项目、Notion）
  的定价策略。输出一份 300 字以内的调研摘要。
  
  客户询盘：{input}
  ```
- 运行，展示输出

**讲解要点：** "注意 {input} 是变量，会自动替换为第一步的邮件内容。这就是 Agent 协作的核心——上游的输出是下游的输入。"

### Step 3：配置报告生成 Agent（15 分钟）
- 添加 Agent：回复草稿
- 提示词：
  ```
  你是一位 B2B 销售助理。根据以下客户询盘和调研摘要，起草一封专业的回复邮件。
  要求：
  - 逐条回答客户的 3 个问题（价格给范围区间，集成能力肯定，案例提供 1 个虚构示例）
  - 语气：专业、友好，不过度推销
  - 结尾：提议本周四下午 3 点或周五上午 10 点进行线上演示
  - 长度：200–250 字
  
  客户询盘：{input}
  调研摘要：{research_output}
  ```
- 运行，展示回复草稿

### Step 4：配置定时发送（10 分钟）
- 添加动作：定时发送
- 设置：明天上午 9:00 发送（而非立刻，显示"深思熟虑"）
- 展示：工作流完整图示

**讲解要点：** "定时发送不只是技巧，是策略——客户看到你在工作时间回复，印象更专业。这整个流程，你只花了 2 分钟配置，剩下的 AI 帮你完成。"
```

- [ ] **Step 3: 创建预期输出样本**

写入 `course/session1/demo-cowork/expected-output.md`：

```markdown
# Cowork 演示预期输出

> 如果直播时网络或工具出问题，可用此备份展示"应该看到的结果"

---

## 调研摘要（Agent 1 输出）

科技初创公司在项目管理工具采购上，核心关注点通常包括：团队协作效率、
与现有工具的集成能力（飞书/钉钉在中国市场占主导）、以及明确的 ROI。
30 人规模团队年预算通常在 3–8 万元区间。

竞品参考：
- Jira：功能强但学习曲线陡，适合技术团队；年费约 ¥800/人
- 飞书项目：国内集成生态好，¥0–600/人/年
- Notion：灵活度高，但项目管理功能较弱

**差异化机会：** AI 自动化功能是主要卖点，本土集成支持是关键门槛。

---

## 回复邮件草稿（Agent 2 输出）

李明您好，

感谢您的询盘！很高兴 TechStart 对我们的 AI 自动化功能感兴趣，以下是您关心
的三个问题的回答：

**1. 30 人团队价格：** 我们的团队版年度授权区间为 4–7 万元，具体取决于功能
模块选择。演示后我们可以根据贵司需求给出精确报价。

**2. 飞书/钉钉集成：** 支持。我们提供开箱即用的飞书双向同步和钉钉通知集成，
无需额外开发。

**3. 行业案例：** 我们服务过多家金融科技客户，其中一家 50 人规模的 FinTech
公司使用后，项目交付周期缩短了 30%。我可以在演示时分享详细案例。

**演示时间：** 建议本周四下午 3 点或周五上午 10 点，请问哪个时间方便？

期待与您的交流！
[你的名字]
```

- [ ] **Step 4: Commit**

```bash
git add course/session1/demo-cowork/
git commit -m "docs: add Cowork virtual demo materials for session 1"
```

---

## Task 4: 第二节幻灯片提纲

**Files:**
- Create: `course/session2/slides-outline.md`

- [ ] **Step 1: 创建幻灯片提纲**

写入 `course/session2/slides-outline.md`：

```markdown
# 第二节幻灯片提纲
> 概念部分共约 25 分钟（0:00–0:25），其余为演示和进阶路径

---

## 开场回顾（0:00–0:05，约 2 页）

### 幻灯片 1 — 回顾第一节
- 三件事：✅ 认识 Claude ✅ 理解协作方式 ✅ 用 Cowork 管理信息流
- 今天目标：沉淀知识 + 输出成果

### 幻灯片 2 — 第二节路线图
- 0:05 Claude Code 搭建知识库（45 分钟）
- 0:50 Skills：PPT Master（50 分钟）
- 1:40 进阶路径简介（12 分钟）
- 1:52 Q&A + 资源清单

---

## Claude Code 概念（0:05–0:20，约 5 页）

### 幻灯片 3 — Claude Code 是什么
- 命令行工具（不是网页）
- 可以读写你电脑上的文件
- 你用自然语言下指令，它帮你操作文件

### 幻灯片 4 — 为什么这很强大
- 对比：Claude.ai 是"聊天"，Claude Code 是"操作"
- 例子：整理 100 个文档、处理 Excel 数据、搭建知识库
- 关键点：**不需要写代码**

### 幻灯片 5 — 安装步骤（一页）
```bash
# 需要 Node.js（nodejs.org）
npm install -g @anthropic-ai/claude-code
# 需要 Claude Pro 订阅（$20/月）
```
- Windows / Mac 通用
- 演示：安装完成后的界面

### 幻灯片 6 — LLM Wiki 方法简介
```
raw_material/  ← 你收集的原始资料
wiki/          ← AI 整理成结构化知识
output/        ← 基于你的情况生成分析
```
来源：Karpathy 的 LLM Wiki 概念

### 幻灯片 7 — 今天我们要搭建什么
- 主题：AI 工具使用知识库（课程相关，学员能直接复用）
- 演示入口："接下来我打开终端……"

---

## Skills 概念（演示后，约 0:50–1:00，约 4 页）

### 幻灯片 8 — Skills 是什么
- Claude Code 的"插件"系统
- 安装一次，之后用 `/skill-name` 调用
- 社区可以分享 Skills

### 幻灯片 9 — Superpowers
- 一个 Skills 集合包
- 包含：ppt-master、deep-research 等
- 安装方式：（演示）

### 幻灯片 10 — PPT Master
- 输入：Markdown 内容
- 输出：SVG 格式幻灯片
- 今天演示：把知识库内容转成汇报 PPT

### 幻灯片 11 — 演示入口
- "我用刚才搭建的知识库，现在让它生成一份 PPT……"

---

## 进阶路径（1:40–1:52，约 3 页）

### 幻灯片 12 — 如果你想用 Claude 编程
- 这节课教的是"用 Claude 完成工作"
- 下一个层次是"用 Claude 构建产品"
- 需要：Claude Code + Superpowers + OpenSpec

### 幻灯片 13 — OpenSpec 是什么
- 先写需求文档（Spec），再让 AI 实现
- 适合：有想法但不想手写代码的人
- 参考：系列文章（掘金链接）

### 幻灯片 14 — 学习路径建议
- 第一步：掌握本课程内容（Claude.ai + Cowork + Code 基础）
- 第二步：阅读 Superpowers + OpenSpec 系列文章
- 第三步：从一个小项目开始
```

- [ ] **Step 2: Commit**

```bash
git add course/session2/slides-outline.md
git commit -m "docs: add session 2 slides outline"
```

---

## Task 5: Claude Code 知识库演示素材

**Files:**
- Create: `course/session2/demo-code/source-materials/article-01-claude-code-intro.md`
- Create: `course/session2/demo-code/source-materials/article-02-llm-wiki-method.md`
- Create: `course/session2/demo-code/source-materials/article-03-ai-work-habits.md`
- Create: `course/session2/demo-code/demo-script.md`

- [ ] **Step 1: 创建知识库原料文章 1**

写入 `course/session2/demo-code/source-materials/article-01-claude-code-intro.md`：

```markdown
# Claude Code 入门指南

Claude Code 是 Anthropic 推出的命令行 AI 工具。核心能力：
- 读取和修改本地文件
- 执行终端命令
- 理解项目结构并做出智能修改

典型用途：
- 整理和分类大量文档
- 处理 CSV/Excel 数据
- 搭建和维护个人知识库
- 自动化重复性文件操作

定价：需要 Claude Pro 订阅（$20/月），按 token 使用量计费。

安装：`npm install -g @anthropic-ai/claude-code`（需要 Node.js）
```

- [ ] **Step 2: 创建知识库原料文章 2**

写入 `course/session2/demo-code/source-materials/article-02-llm-wiki-method.md`：

```markdown
# LLM Wiki 方法

由 Andrej Karpathy 提出的个人知识管理方法，核心是用 AI 帮你整理知识。

## 三层结构

**raw_material/**：原始素材
- 你收集的文章、笔记、链接
- 不需要整理，堆在这里就行

**wiki/**：结构化知识
- AI 读取 raw_material，提炼成标准格式的知识条目
- 每个条目：是什么、为什么重要、如何使用

**output/**：个性化输出
- 基于 wiki + 你的具体情况，生成建议/分析
- 每次生成都是针对你当前情况的定制结果

## 使用流程

1. 往 raw_material 扔素材
2. 让 Claude Code 更新 wiki（`/wiki-update` 或自然语言指令）
3. 描述你的问题，让 Claude 从 wiki 里找答案

## 适用场景

- 个人理财决策
- 行业知识积累
- 学习新领域
- 任何需要"积累+查询"的场景
```

- [ ] **Step 3: 创建知识库原料文章 3**

写入 `course/session2/demo-code/source-materials/article-03-ai-work-habits.md`：

```markdown
# AI 时代的工作习惯

## 从"搜索"到"协作"

搜索引擎时代：你问问题，它返回链接，你自己整合。
AI 时代：你描述问题，它直接给你可用的答案——如果你给了足够的上下文。

## 高效使用 AI 的三个习惯

**1. 维护个人上下文文件**
把你的角色、常用偏好、背景信息写成一个文件，每次开新对话都带上它。
Claude Projects 功能可以自动注入，省去每次粘贴的麻烦。

**2. 用 AI 做草稿，你来决策**
不要期待 AI 第一次就给出完美答案。用它快速生成 3 个选项，你选择并修改。
这比从零开始写快 5–10 倍。

**3. 把重复工作流自动化**
每周都做的事（整理邮件、生成周报、更新文档）都值得用 Cowork 或 Claude Code 自动化。
初始配置花 1 小时，之后每次节省 30 分钟。

## 不该用 AI 做的事

- 需要你个人判断的决策（AI 给选项，你来决定）
- 涉及隐私敏感信息的任务（注意数据安全）
- 需要情感连接的沟通（给客户或朋友的真情实感）
```

- [ ] **Step 4: 创建 Claude Code 演示脚本**

写入 `course/session2/demo-code/demo-script.md`：

```markdown
# Claude Code 知识库演示脚本

> 时间：约 45 分钟（0:05–0:50）
> 前提：Claude Code 已安装，终端已打开

---

## 第一部分：展示空项目结构（5 分钟）

**操作：**
```bash
# 在桌面创建演示文件夹
mkdir ai-knowledge-base
cd ai-knowledge-base

# 创建三层目录
mkdir raw_material wiki output

# 把三篇原料文章复制进来
cp [source-materials路径]/*.md raw_material/
```

**说：** "这是我们的起点——三篇关于 Claude 和 AI 工作习惯的文章，堆在 raw_material 里，还没有整理。"

---

## 第二部分：启动 Claude Code（5 分钟）

**操作：**
```bash
claude
```

**说：** "这就是 Claude Code 的界面。看起来很简单，但它能读取我们这个文件夹里的所有文件。接下来我用中文下指令。"

---

## 第三部分：让 Claude 建立知识库（20 分钟）

**输入指令：**
```
请读取 raw_material/ 目录下的所有文章，为每篇文章在 wiki/ 目录下
创建一个对应的知识条目。

每个条目的格式：
## [主题名]
**是什么：** 一句话定义
**为什么重要：** 2–3 个要点
**如何使用：** 具体步骤或建议
**关键词：** 3–5 个标签
```

**等待 Claude 执行，展示生成过程**

**说：** "注意看它在实时创建文件。我没有写一行代码——只是用中文说了我要什么。"

**展示生成的 wiki 文件，逐条讲解。**

---

## 第四部分：用知识库回答问题（10 分钟）

**输入指令：**
```
我是一个完全不懂编程的职场人，想用 Claude Code 整理工作笔记。
请根据 wiki/ 里的知识，给我一个 3 步入门方案。
```

**展示输出，重点说明：**
"它的回答来自我们刚才建立的知识库，不是通用建议——是针对这个库里内容的定制回答。"

---

## 第五部分：桥接到 Skills（5 分钟）

**说：** "我们现在有了一个知识库。接下来，Skills 可以把它变成 PPT 汇报。这就是工具链的价值——每一步的输出都是下一步的输入。"

**切换到 Skills 演示。**
```

- [ ] **Step 5: Commit**

```bash
git add course/session2/demo-code/
git commit -m "docs: add Claude Code knowledge base demo materials"
```

---

## Task 6: Skills / PPT Master 演示脚本

**Files:**
- Create: `course/session2/demo-skills/demo-script.md`

- [ ] **Step 1: 创建演示脚本**

写入 `course/session2/demo-skills/demo-script.md`：

```markdown
# Skills + PPT Master 演示脚本

> 时间：约 50 分钟（0:50–1:40）
> 前提：Superpowers 已安装，Claude Code 正在运行，知识库已建立

---

## 第一部分：解释 Skills 是什么（10 分钟，配合幻灯片 8–10）

切换到幻灯片，讲解概念（参考 session2/slides-outline.md 幻灯片 8–11）。

---

## 第二部分：展示 Superpowers 安装（5 分钟）

**操作（如果学员要跟着做）：**
```bash
# 在 Claude Code 里安装 Superpowers
/install-skill superpowers
```

**说：** "安装一次，之后就可以随时调用。ppt-master 是 Superpowers 里的一个 Skill。"

---

## 第三部分：以知识库为输入，生成 PPT（25 分钟）

**背景设定（讲给学员听）：**
"场景：你的老板让你周五汇报一下'我们团队如何使用 AI 工具提效'。你有刚才建立的知识库，现在用 ppt-master 5 分钟生成汇报 PPT。"

**输入指令：**
```
/ppt-master

主题：AI 工具提效汇报
受众：公司管理层，不熟悉技术细节
来源：读取 wiki/ 目录下的所有知识条目
幻灯片数量：6–8 页
风格：简洁专业，使用数据和要点而非大段文字

结构建议：
1. 现状问题（为什么需要 AI 工具）
2. 我们使用的工具（Claude 生态介绍）
3. 三个核心场景（Cowork / Claude Code / Skills）
4. 效益说明（时间节省、质量提升）
5. 建议下一步（推广方案）
6. Q&A
```

**等待生成，展示过程**

**说：** "它正在读取我们的知识库，然后用 ppt-master 的模板生成 SVG 幻灯片。注意——输入是我们自己的知识库内容，不是通用模板。"

**展示生成的幻灯片：**
- 逐页展示
- 重点：内容来自知识库，结构来自 ppt-master 模板
- 可以现场调整一页演示迭代：
  ```
  第 3 页的三个场景描述太长了，每个场景压缩到一句话，加一个具体数字
  ```

---

## 第四部分：总结工具链价值（10 分钟）

**在白板/幻灯片画出完整流程：**

```
邮件进来
   ↓
Cowork 处理（调研 → 报告 → 发送）
   ↓
经验沉淀到知识库（Claude Code）
   ↓
知识库输出成汇报 PPT（ppt-master）
```

**说：** "这就是今天两节课的完整工具链。你不需要写代码，不需要是技术人，只需要知道你想要什么——Claude 帮你完成中间所有的工作。"
```

- [ ] **Step 2: Commit**

```bash
git add course/session2/demo-skills/
git commit -m "docs: add Skills and ppt-master demo script"
```

---

## Task 7: 学员资源清单

**Files:**
- Create: `course/student-resources.md`

- [ ] **Step 1: 创建资源清单**

写入 `course/student-resources.md`：

```markdown
# 学员资源清单

> 课程结束后发给学员，包含所有链接和安装指南

---

## 课程参考文章

| 主题 | 链接 |
|------|------|
| Claude 是什么、能做什么 | https://juejin.cn/post/7585412203978047531 |
| 普通人如何与 AI 协作 | https://juejin.cn/post/7636587578021560355 |
| Claude Cowork 演示视频 | https://youtu.be/_cVTzXvb7xs |
| Claude Code 不写代码也能用 | https://juejin.cn/post/7635681418753163304 |
| 搭建 LLM 个人知识库 | https://austinxyz.github.io/blogs/blog/building-finance-knowledge-base |
| Superpowers + OpenSpec 介绍 | https://austinxyz.github.io/blogs/blog/openspec-superpowers-combined |

---

## Claude Code 安装指南

### 前提条件

**Windows:**
1. 安装 Node.js：https://nodejs.org（下载 LTS 版本）
2. 打开命令提示符（Win+R → 输入 cmd → 回车）

**Mac:**
1. 安装 Node.js：`brew install node`（需要先装 Homebrew）
2. 打开终端

### 安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### 验证安装

```bash
claude --version
```

看到版本号说明安装成功。

### 首次登录

```bash
claude
```

会提示你登录 Claude 账号（需要 Claude Pro 订阅，$20/月）。

---

## Superpowers 安装

Claude Code 安装完成后，在 Claude Code 内输入：

```
/install-skill superpowers
```

---

## 常见问题

**Q: 必须用 Claude Pro 吗？**
A: Claude Code 需要 Pro 订阅。Claude.ai 和 Cowork 的基础功能免费版可用，但有用量限制。

**Q: 在中国大陆可以用吗？**
A: Claude 目前不在中国大陆提供服务，需要使用代理。

**Q: Claude Code 会不会误删我的文件？**
A: Claude Code 在修改文件前会告诉你它打算做什么，你确认后才执行。建议在演示用的测试文件夹里操作。
```

- [ ] **Step 2: Commit**

```bash
git add course/student-resources.md
git commit -m "docs: add student resource list with install guide"
```

---

## Task 8: 排练计时记录

**Files:**
- Create: `course/rehearsal-notes.md`

- [ ] **Step 1: 创建排练记录模板**

写入 `course/rehearsal-notes.md`：

```markdown
# 排练计时记录

> 直播前至少完整排练一次，记录每个模块实际用时，调整节奏

---

## 第一节排练记录

| 模块 | 计划时间 | 实际用时 | 备注 |
|------|---------|---------|------|
| Claude 是什么 | 20 分钟 | | |
| 普通人如何协作 | 20 分钟 | | |
| Cowork 演示 | 70 分钟 | | |
| Q&A + 预告 | 10 分钟 | | |
| **合计** | **120 分钟** | | |

---

## 第二节排练记录

| 模块 | 计划时间 | 实际用时 | 备注 |
|------|---------|---------|------|
| 回顾 + 目标 | 5 分钟 | | |
| Claude Code 演示 | 45 分钟 | | |
| Skills 演示 | 50 分钟 | | |
| 进阶路径 | 12 分钟 | | |
| Q&A + 总结 | 8 分钟 | | |
| **合计** | **120 分钟** | | |

---

## 排练问题记录

排练过程中遇到的问题，直播前修复：

- [ ] 问题 1：
- [ ] 问题 2：
- [ ] 问题 3：

---

## 直播前检查清单

- [ ] Claude.ai 账号已登录，Pro 功能正常
- [ ] Claude Code 已安装，版本最新
- [ ] Cowork 工作流配置已保存
- [ ] 知识库原料文章已准备好（course/session2/demo-code/source-materials/）
- [ ] Superpowers 已安装，ppt-master 可用
- [ ] 学员资源清单已准备好发送
- [ ] 备用网络（如 Cowork 或 Claude Code 卡顿时的备用演示截图）
```

- [ ] **Step 2: Commit**

```bash
git add course/rehearsal-notes.md
git commit -m "docs: add rehearsal timing template and pre-live checklist"
```

---

## Self-Review

**Spec 覆盖检查：**
- ✅ Claude 是什么/安装 → Task 2（幻灯片 1–8）
- ✅ 普通人协作方式 → Task 2（幻灯片 9–14）
- ✅ Claude Cowork 邮件工作流 → Task 3
- ✅ Claude Code 知识库 → Task 5
- ✅ Skills / ppt-master → Task 6
- ✅ 进阶路径简介 → Task 4（幻灯片 12–14）
- ✅ 每节概念 PPT → Task 2 + Task 4
- ✅ 学员资源清单 + 安装指南 → Task 7
- ✅ 演示素材（虚拟邮件、知识库文章） → Task 3 + Task 5

**Placeholder 检查：** 无 TBD 或 TODO，所有步骤含具体内容。

**一致性检查：** 知识库在 Task 5 创建，在 Task 6 引用为 `wiki/` 目录，路径一致。
