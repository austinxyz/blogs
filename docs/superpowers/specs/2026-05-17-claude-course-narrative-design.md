# Claude 初学者课程叙事设计 Spec

**日期：** 2026-05-17
**状态：** 已批准，待实现

---

## 背景与问题

现有两节付费直播课（各 2 小时）的演示场景是 B2B 询盘邮件处理。问题：学员感觉不到"这是我的问题"，代入感弱，吸引力不足。

**目标：** 用一个贯穿两节课的叙事主线，让学员从第一分钟就感觉"这正是我的处境"，并在课程结束时感受到"我系统地用了 AI"。

---

## 选定方案：方案 A — Austin 找工作（5C 方法论落地）

### 角色设定

主角就是 Austin，资深平台工程师，有多年 IC + Tech Lead 经验，现在主动求职，目标是找到下一个高匹配度的 Platform Engineering / AI Infrastructure 岗位。

不是虚构用例，是真实的人在用 AI 系统化地解决一个学员都懂的问题：**求职信息太乱，很难做到每个机会都跟进到位、每次面试都准备充分。**

### 理论框架：5C 方法论（Nan Li）

贯穿两节课的方法论骨架，来源：`C:\Users\lorra\projects\ai-infra-manager\raw_material\methodology\5C Methods - Nan Li.md`

| C | 核心 | 对应工具 |
|---|------|---------|
| C1 Clarity | 先想清楚要什么再开始投 | 幻灯片讲解 |
| C2 Confidence | 知道自己的价值，填补能力缺口 | **Session 2 主角** |
| C3 Connection | 建关系建口碑，进入隐藏职位市场 | Session 1 Agent 3 |
| C4 Conversion | 把求职当销售漏斗来管 | **Session 1 主角** |
| C5 Commitment | 选对的而非大的，全力投入 | 结尾幻灯片 |

### 两节课的叙事弧度

```
Session 1：进攻阶段
  "我怎么把 50 个机会变成 5 个高质量对话？"
  工具：Cowork（C3 + C4）

Session 2：准备阶段
  "我怎么确保每一次面试都有最充分的准备？"
  工具：Claude Code（C2）+ Superpowers + ppt-master

两节课的情感连接：
  Session 1 结尾："C4 的流水线跑起来了，面试邀请进来了。
  接下来的问题是 C2——怎么快速填上知识缺口？第二节课解决这个问题。"
```

---

## Session 1 详细设计

### 幻灯片调整

现有 14 张幻灯片的概念层**无需改动**，只更新两处示例文字：
- 幻灯片 12（演示入口）：场景改为"JD 处理"
- 幻灯片 13-14（Cowork 介绍）：例子换成求职场景

**新增幻灯片（约 5 分钟）**，插入幻灯片 12 之前：
- 介绍 5C 框架（一页，5 个词 + 一句话定义）
- 重点标出：C3 靠关系、C4 靠系统
- 引导语："今天的 Demo 给你一个可以直接用的 C4 系统"

### Cowork Demo："JD 处理流水线"（约 60 分钟）

**触发：** 粘贴一条真实 JD（直播时用 Austin 实际在投的职位）

```
Agent 1 — JD 分析师（C1 校验）
  输入：JD 文本 + Austin 的目标方向（存在 Project 里）
  提示词框架：用 5C 的 C1 评估这条 JD 是否符合求职方向
  输出：fit 评分 + 建议（值得投 / 暂缓 / 跳过）

Agent 2 — 公司调研员（C3 调研）
  输入：公司名称 + 岗位
  输出：200 字公司简报（规模、工程文化、近期动向、潜在人脉线索）

Agent 3 — Outreach 起草（C3 执行）
  输入：JD 分析 + 公司简报 + Austin 的背景
  输出：一封个性化 LinkedIn message 或邮件草稿

Agent 4 — Pipeline 追踪（C4 系统）
  输出：更新求职状态表，记录下次跟进时间
```

**关键讲解点：**
- Agent 1 演示后："5C 里的 C1 是第一个 C——先判断值不值得投，再花时间。"
- Agent 3 演示后："不是群发，是个性化——量和质可以同时做到。"
- Agent 4 演示后："Nan Li 说：6 个机会被取消，靠的是同时管 15 个机会。这就是 C4 系统。"

### 素材文件（需新建/替换）

| 现有文件 | 替换为 |
|---------|-------|
| `course/session1/demo-cowork/virtual-email.md` | `virtual-jd.md`（平台工程职位 JD） |
| `course/session1/demo-cowork/workflow-config.md` | JD 流水线 4 步配置 |
| `course/session1/demo-cowork/expected-output.md` | 4 个 Agent 的预期输出样本 |

---

## Session 2 详细设计

### 开场衔接（幻灯片，约 5 分钟）

> "C4 的流水线在跑了，面试邀请进来了。Nan Li 说：
> '哪里的自信是空心的？那些就是你的缺口——缺口是可以填的。'
> 今天做的就是 C2——系统性地把缺口填掉。"

### 第一段：Claude Code 从零建知识库（35 分钟）

**课前准备：** 干净演示文件夹，内含 3 篇原料文章：

```
demo-interview-prep/
  raw_material/
    platform-engineering-trends.md
    ai-infra-basics.md
    system-design-interview-tips.md
```

**现场演示步骤：**

```bash
# 进入文件夹，启动 Claude Code
cd demo-interview-prep
claude
```

指令 1（建库）：
```
请读取 raw_material/ 下的所有文章，在 wiki/ 目录里为每篇
生成一个结构化知识条目。

每个条目格式：
## [主题]
是什么：一句话定义
为什么面试会考：2-3 个要点
如何回答：具体角度或框架
关键词：3-5 个标签
```

指令 2（使用知识库）：
```
我明天要面一个 Platform Engineering Lead 岗位，
从 wiki/ 里的知识给我一个 2 小时速成准备方案，
以及 5 个最可能被问到的问题和答题框架
```

**讲解重点：**
> "这个知识库是累积的——你每面一次，把复盘加进去，
> 它就越来越懂你。这是 C2 的实际工作方式：
> 不是临时抱佛脚，是有系统地消灭空心的自信。"

**"Level Up" 时刻（5 分钟）**

从零搭完后，切到 ai-infra-manager，说：
> "你们刚才看到的是起点。这是我跑了两个月之后的样子——
> 同样的结构，多了自定义 skills、公司专属文件夹、mock interview 记录。
> 路是一样的，区别只是时间。"

只展示文件夹结构，不 Demo，5 分钟内结束。

### 第二段：Superpowers Brainstorming（10 分钟）

```
/brainstorming

"帮我想清楚：对于一个 Platform Engineering Lead 岗位，
 我的背景里哪几点最值得强调？
 哪些可能是 gap，我需要提前准备说法？"
```

**讲解重点：** "Superpowers 不是生成内容，是帮你想清楚。先想清楚，再输出——这个顺序很重要。"

### 第三段：ppt-master 自我介绍（25 分钟）

输入来自演示文件夹里刚建的知识库（学员刚刚一起参与建立的，代入感强）。

```
/ppt-master

主题：面试自我介绍
受众：Engineering Manager + Hiring Committee
来源：wiki/ 里的知识条目 + Superpowers 定位建议
幻灯片：4 页

结构：
1. 我是谁（一句话专业定位，10 秒能记住的那种）
2. 我做过什么（最相关的 2 个项目，数字说话）
3. 我能带来什么（对应 JD 关键词）
4. 为什么是你们（真实的兴趣点）
```

现场调整一页演示迭代：
> "第 2 页的描述太长了，压缩成两句话，加一个具体数字"

### Session 2 结尾：完整工具链回顾

```
C1 Clarity：想清楚自己要什么（幻灯片）
     ↓
C3/C4 Cowork：JD 进来 → 分析 → outreach → pipeline 追踪（Session 1）
     ↓
C2 Claude Code：知识库 → 速成方案 → 消灭知识缺口（Session 2）
     ↓
Superpowers：想清楚怎么定位自己
     ↓
ppt-master：自我介绍 PPT（C2 的输出）
     ↓
C5 Commitment：选对的 offer，全力投入
```

**最后一句话：**
> "这不是 AI 替你找工作。这是 AI 让你能同时管 15 个机会，
> 但每一个都像只管这一个一样用心。"

### 素材文件（需新建）

| 文件 | 内容 |
|-----|------|
| `course/session2/demo-code/source-materials/platform-engineering-trends.md` | 平台工程趋势文章（演示原料） |
| `course/session2/demo-code/source-materials/ai-infra-basics.md` | AI 基础设施入门（演示原料） |
| `course/session2/demo-code/source-materials/system-design-interview-tips.md` | 系统设计面试技巧（演示原料） |
| `course/session2/demo-code/demo-script.md` | 替换现有演示脚本 |
| `course/session2/demo-skills/demo-script.md` | 替换现有演示脚本 |

---

## 备选方案 B（存档备用）

### 方案 B：虚构理财顾问

供未来调研潜在学员意见后参考。

**角色：** 赵梅，独立理财顾问，想用 AI 服务更多客户并提升内容输出。

**Session 1 Cowork：**
- 潜在客户询盘进来 → Agent 做客户背景调研 → 个性化回复 → 预约会议 → 跟进工作流
- 适合小业主和有客户管理需求的职场人

**Session 2 Claude Code：**
- 建理财知识库（原料：Austin 已有的 blog 文章 `raw_docs/` 下的理财系列）
- Superpowers 为具体客户做投资方案 brainstorm
- ppt-master 做客户讲座幻灯片（这个用例极好）

**适用前提：** 学员里自雇 / 小业主比例更高，或已完成 Idea A 课程后的进阶场景。

**现成原料：**
- `raw_docs/wechat-ai-ordinary-people-*.md` — 理财系列文章
- Austin 的理财知识库 blog 文章

---

## 待实现的文件变更

### 新建 / 替换（Session 1）
- [ ] `course/session1/demo-cowork/virtual-jd.md` — 平台工程职位 JD
- [ ] `course/session1/demo-cowork/workflow-config.md` — JD 流水线 4 步配置
- [ ] `course/session1/demo-cowork/expected-output.md` — 4 个 Agent 输出样本

### 新建 / 替换（Session 2）
- [ ] `course/session2/demo-code/source-materials/platform-engineering-trends.md`
- [ ] `course/session2/demo-code/source-materials/ai-infra-basics.md`
- [ ] `course/session2/demo-code/source-materials/system-design-interview-tips.md`
- [ ] `course/session2/demo-code/demo-script.md` — 替换现有脚本
- [ ] `course/session2/demo-skills/demo-script.md` — 替换现有脚本

### 更新（Session 1 幻灯片）
- [ ] `projects/claude_course_s1_ppt169_20260516/` — 幻灯片 12-14 文字更新
- [ ] 新增 5C 幻灯片 SVG（插入幻灯片 12 之前）

### 保持不变
- Session 1 概念幻灯片 1-11（Claude 是什么、协作三原则、Projects）
- Session 2 概念幻灯片（Claude Code 介绍、LLM Wiki 方法）
- `course/student-resources.md`
- `course/rehearsal-notes.md`
