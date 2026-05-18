# Claude 课程叙事更新 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将两节直播课的演示场景从"B2B 询盘邮件"替换为"Austin 求职 + 5C 方法论"，更新所有 Demo 素材和相关幻灯片内容。

**Architecture:** 按文件逐个替换。Session 1 Demo 素材 3 个文件全量重写；Session 2 Demo 素材 5 个文件新建/重写；Session 1 PPT notes 轻量更新；新增 5C 幻灯片 note。每个 Task 产出一个独立文件，commit 后可独立使用。

**Tech Stack:** Markdown，无代码，无构建步骤。每个 Task 完成后直接 `git add` + `git commit`。

**Spec 参考：** `docs/superpowers/specs/2026-05-17-claude-course-narrative-design.md`

---

## 文件结构总览

```
course/
  session1/
    demo-cowork/
      virtual-jd.md           ← Task 1（新建，替代 virtual-email.md）
      workflow-config.md       ← Task 2（全量重写）
      expected-output.md       ← Task 3（全量重写）
  session2/
    demo-code/
      source-materials/
        platform-engineering-trends.md   ← Task 4（新建）
        ai-infra-basics.md               ← Task 5（新建）
        system-design-interview-tips.md  ← Task 6（新建）
      demo-script.md           ← Task 7（全量重写）
    demo-skills/
      demo-script.md           ← Task 8（全量重写）

projects/claude_course_s1_ppt169_20260516/
  notes/
    12_演示入口.md             ← Task 9（更新）
    13_从claude到cowork.md     ← Task 9（更新）
    14_Cowork介绍.md           ← Task 9（更新）
    00_5C方法论.md             ← Task 10（新建）
```

---

## Task 1：创建 virtual-jd.md（演示用职位描述）

**Files:**
- Delete: `course/session1/demo-cowork/virtual-email.md`
- Create: `course/session1/demo-cowork/virtual-jd.md`

- [ ] **Step 1: 删除旧文件**

```bash
git rm course/session1/demo-cowork/virtual-email.md
```

- [ ] **Step 2: 创建 virtual-jd.md**

写入 `course/session1/demo-cowork/virtual-jd.md`：

```markdown
# 演示用职位描述（JD）

> 用途：Session 1 Cowork 演示的触发素材。直播时粘贴到 Cowork 的输入框。
> 选用平台工程岗位，贴近 Austin 真实求职场景，学员代入感强。

---

**职位：** Staff Platform Engineer
**公司：** NovaDeploy（B 轮云基础设施创业公司，约 300 人）
**地点：** Remote（US）
**薪资范围：** $190k–$240k + equity

---

## About NovaDeploy

NovaDeploy helps engineering teams ship faster by providing a unified developer platform — internal developer portal, CI/CD orchestration, and infrastructure self-service. Our platform is used by 500+ engineers across 40+ product teams. We're Series B, profitable, and growing 80% YoY.

## The Role

We're looking for a Staff Platform Engineer to lead the next phase of our Internal Developer Platform (IDP). You'll own the technical roadmap for developer experience tooling, work closely with platform and product engineering teams, and mentor a team of 6 engineers.

## What You'll Do

- Design and evolve our IDP: self-service infrastructure provisioning, service catalog, golden paths for new services
- Own the Kubernetes platform (2,000+ nodes across GCP and AWS), including cluster upgrades, multi-tenancy, and cost optimization
- Drive adoption of platform capabilities — work with product teams to reduce time-to-production from days to hours
- Establish SLOs for platform services; lead incident response and post-mortems
- Mentor 6 platform engineers; participate in hiring and technical interviews
- Collaborate with AI/ML team on GPU cluster provisioning and training job orchestration

## Required

- 8+ years of software/infrastructure engineering experience
- 4+ years with Kubernetes in production (multi-cluster, multi-cloud preferred)
- Strong proficiency in Go or Python for platform tooling
- Experience building Internal Developer Platforms or similar developer experience products
- Proven ability to drive adoption of platform capabilities across engineering orgs
- Track record of leading technical initiatives and mentoring engineers

## Nice to Have

- Experience with Backstage or similar IDP frameworks
- Familiarity with GPU/ML infrastructure (CUDA, NCCL, Slurm, Ray)
- Experience in high-growth startups (Series A–C)
- Published writing or talks on platform engineering

## Interview Process

1. Recruiter screen (30 min)
2. Technical phone screen (45 min)
3. Virtual onsite: System Design + Platform Deep Dive + Behavioral (4.5 hours)
4. Reference checks + offer
```

- [ ] **Step 3: 验证文件内容正确**

确认文件包含：公司名 NovaDeploy、职位 Staff Platform Engineer、薪资范围、Required 和 Nice to Have 两个部分、面试流程。

- [ ] **Step 4: Commit**

```bash
git add course/session1/demo-cowork/virtual-jd.md
git commit -m "docs: replace virtual email with virtual JD for job search demo (NovaDeploy Platform Engineer)"
```

---

## Task 2：重写 workflow-config.md（JD 处理流水线）

**Files:**
- Modify: `course/session1/demo-cowork/workflow-config.md`

- [ ] **Step 1: 重写 workflow-config.md**

写入 `course/session1/demo-cowork/workflow-config.md`：

```markdown
# Cowork 工作流配置说明：JD 处理流水线

> 直播演示步骤，按顺序操作，每步可暂停讲解。
> 演示主题：C4 Conversion——用 Cowork 把一条 JD 变成可用的 outreach + pipeline 追踪。

---

## 演示前准备

- 打开 Claude Cowork
- 新建工作流，命名："求职 JD 处理流水线"
- 在 Claude Project 中预存 Austin 的背景简介（见下方）

**Project 背景（预存内容）：**
```
我是 Austin，资深平台工程师，有 12 年基础设施和平台工程经验。
目标岗位：Staff / Principal Platform Engineer 或 AI Infrastructure Manager。
技术背景：Kubernetes（大规模多集群）、GCP/AWS、Go/Python、内部开发者平台。
求职偏好：B/C 轮成长型公司，工程师文化，有 AI/ML 基础设施需求。
当前状态：主动求职，每周处理 10-15 条 JD。
```

---

## 演示流程（共 4 步，约 60 分钟含讲解）

### Step 1：输入 JD（5 分钟）

- 触发方式：手动触发
- 粘贴 `virtual-jd.md` 的完整内容作为输入

**讲解要点：** "真实场景下，这个触发可以是：收到猎头邮件自动触发，或者你从 LinkedIn 复制 JD 粘贴进来。我们这里手动演示，逻辑是一样的。"

---

### Step 2：Agent 1 — JD 分析师，C1 Clarity 校验（15 分钟）

- 添加 Agent：JD 分析师
- 提示词：

```
你是一位求职策略顾问，专注于帮助资深工程师做职业决策。

根据以下 JD 和求职者背景，用 5C 方法论中的 C1（Clarity）评估这条机会：

1. **岗位匹配度（1-10 分）**：这条 JD 与求职者的目标方向、技术背景、职业阶段匹配程度如何？
2. **值得投入度**：建议（值得全力投入 / 观望 / 跳过），给出 2-3 句理由。
3. **关键要求提取**：列出 5 个最重要的岗位要求（区分必须满足 vs 加分项）。
4. **能力缺口**：对比求职者背景，指出 1-2 个潜在缺口和应对建议。

求职者背景：{project_context}
JD 内容：{input}

输出格式：结构化列表，不超过 400 字。
```

- 运行，展示输出

**讲解要点：** "5C 里第一个 C 是 Clarity——先判断值不值得花时间，再花时间。这个 Agent 帮我做这个决策，不是靠感觉，是靠系统。"

---

### Step 3：Agent 2 — 公司调研员，C3 Connection 准备（15 分钟）

- 添加 Agent：公司调研员
- 提示词：

```
你是一位商业情报分析师。根据以下 JD，对目标公司做一份简要调研。

输出以下内容：
1. **公司概况**：规模、融资阶段、主营业务、近期动向（如有）
2. **工程文化信号**：从 JD 语言、技术栈、岗位描述中读取的工程文化特征
3. **人脉切入点**：这类公司通常在哪些社区/会议/开源项目活跃？有没有可以提前建立联系的路径？
4. **一句话定位**：如果要用一句话形容这家公司，是什么？

JD 内容：{input}

输出格式：四个部分，每部分不超过 100 字。
```

- 运行，展示输出

**讲解要点：** "C3 是 Connection——在发 outreach 之前先了解对方，才能做到真正的个性化。注意第 3 点'人脉切入点'，这就是进入隐藏职位市场的方法。"

---

### Step 4：Agent 3 — Outreach 起草，C3 执行（15 分钟）

- 添加 Agent：Outreach 起草
- 提示词：

```
你是一位资深职场沟通顾问。根据以下 JD、公司调研结果和求职者背景，
起草一封发给目标公司内部员工（非 HR，是工程师或 EM）的 LinkedIn 连接请求附言。

要求：
- 长度：150-200 字（LinkedIn 连接附言上限是 300 字，留空间让对方感觉不压迫）
- 语气：真诚、专业，不推销，表达真实的兴趣
- 必须包含：一个具体的共同点或兴趣点（来自公司调研）
- 不要：复制粘贴式自我介绍，不要直接说"我在找工作"
- 结尾：开放式问题，邀请对方分享经验

求职者背景：{project_context}
JD 分析：{jd_analysis_output}
公司调研：{company_research_output}
```

- 运行，展示输出

**讲解要点：** "注意这封信不提'我在找工作'——因为 C3 的本质是建立真实的关系，不是推销自己。人们愿意帮助他们认识的人，不是陌生人的求职请求。"

---

### Step 5：Agent 4 — Pipeline 追踪，C4 系统化（10 分钟）

- 添加 Agent：Pipeline 追踪
- 提示词：

```
你是一位求职项目管理助理。根据以下信息，生成一条求职追踪记录。

输出格式（Markdown 表格一行）：
| 公司 | 职位 | 来源 | 状态 | 下次行动 | 截止日期 | 匹配度 | 备注 |
|------|------|------|------|---------|---------|-------|------|

字段说明：
- 状态：初步评估 / outreach 已发 / 等待回复 / 面试安排中 / 面试中 / offer / 放弃
- 下次行动：具体行动 + 建议时间（如"7 天无回复则 follow up"）
- 匹配度：来自 JD 分析的 1-10 分

JD 分析：{jd_analysis_output}
Outreach 状态：已起草，待发送
```

- 运行，展示输出

**讲解要点：** "Nan Li 说她同时管着 10-15 个机会，其中 6 个被取消还没崩溃，靠的就是这个系统。C4 的核心是：永远知道每个机会在哪个阶段，下一步是什么。这一行，就是你的 pipeline 的一个条目。"

---

## 完整工作流展示

演示结束后，展示工作流的完整图示：

```
JD 文本输入
    ↓
Agent 1：C1 校验（值不值得投？）
    ↓
Agent 2：C3 公司调研（了解对方）
    ↓
Agent 3：C3 Outreach 起草（建立连接）
    ↓
Agent 4：C4 Pipeline 追踪（系统化管理）
```

**最后一句话（自然桥接到 Session 2）：**
"C4 的系统跑起来了，面试邀请陆续进来。
下一个问题是 C2——我怎么快速补上每家公司、每个岗位的知识缺口，
确保每次面试都不是靠运气？第二节课解决这个问题。"
```

- [ ] **Step 2: 验证文件包含 4 个 Agent 配置、完整提示词、讲解要点**

- [ ] **Step 3: Commit**

```bash
git add course/session1/demo-cowork/workflow-config.md
git commit -m "docs: rewrite session1 cowork workflow config for JD pipeline (5C C3+C4)"
```

---

## Task 3：重写 expected-output.md（JD 流水线预期输出）

**Files:**
- Modify: `course/session1/demo-cowork/expected-output.md`

- [ ] **Step 1: 重写 expected-output.md**

写入 `course/session1/demo-cowork/expected-output.md`：

```markdown
# Cowork JD 流水线演示预期输出

> 如果直播时网络或工具出问题，用此备份展示"应该看到的结果"。
> 基于 NovaDeploy Staff Platform Engineer JD 生成的示例输出。

---

## Agent 1 输出：JD 分析（C1 Clarity 校验）

**岗位匹配度：9/10**

**值得投入度：值得全力投入**

理由：NovaDeploy 的规模（B 轮，500+ 工程师使用平台）和技术栈（Kubernetes 大规模、Go、IDP）与你的背景高度吻合。GPU cluster provisioning 这个 nice-to-have 正是你的差异化优势，值得在 outreach 和面试中主动提及。

**关键要求（必须满足）：**
1. 8+ 年工程经验，4+ 年 K8s 生产环境经验 ✅
2. Go 或 Python 平台工具开发能力 ✅
3. IDP 或开发者体验产品经验 ✅
4. 跨团队驱动平台能力采用的经历 ✅
5. 领导技术方向、培养工程师的经历 ✅

**潜在缺口：**
- Backstage 经验（nice-to-have，非硬性要求）：准备好说"没有直接使用，但熟悉其架构，并有类似内部工具的建设经验"

---

## Agent 2 输出：公司调研（C3 Connection 准备）

**公司概况：**
NovaDeploy 是一家 B 轮云基础设施 SaaS 公司，约 300 人，服务 40+ 企业客户。产品聚焦 IDP（内部开发者平台）和 CI/CD 编排。增速 80% YoY，已盈利，估值未公开但对标 Cortex/Port 等同类产品。

**工程文化信号：**
JD 语言显示工程师文化：强调"reduce time-to-production from days to hours"（实用导向），"work with product teams"（非孤岛），"SLOs for platform services"（SRE 成熟度）。Kubernetes + Go 组合是典型 cloud-native 优先文化。

**人脉切入点：**
平台工程领域活跃社区：PlatformCon（年度大会）、CNCF Slack #platform-engineering 频道、Backstage 开源社区。可以先找 LinkedIn 上在 NovaDeploy 的 Principal/Staff 工程师，看是否有共同的会议发言或开源贡献经历。

**一句话定位：**
"帮工程团队把基础设施变成产品，让每个开发者都能自助上线。"

---

## Agent 3 输出：Outreach 草稿（LinkedIn 附言）

Hi [Name],

I came across your work at NovaDeploy while researching the IDP space — your post about golden paths adoption at scale resonated with something I've been thinking about in my own platform work.

I've been building and scaling developer platforms for 12 years, most recently running Kubernetes infrastructure for a 600-engineer org. I'm particularly interested in how NovaDeploy approaches the "platform as product" model and the challenge of driving adoption without mandates.

Would you be open to a brief chat? I'd love to hear how the team is thinking about the IDP roadmap for the next year — no agenda, just genuinely curious.

Thanks,
Austin

---

## Agent 4 输出：Pipeline 追踪记录

| 公司 | 职位 | 来源 | 状态 | 下次行动 | 截止日期 | 匹配度 | 备注 |
|------|------|------|------|---------|---------|-------|------|
| NovaDeploy | Staff Platform Engineer | LinkedIn | outreach 已发 | 7 天无回复则 follow up | 2026-05-24 | 9/10 | GPU infra 差异化优势；Backstage 缺口可解释 |
```

- [ ] **Step 2: 验证文件包含 4 个 Agent 的完整输出示例**

- [ ] **Step 3: Commit**

```bash
git add course/session1/demo-cowork/expected-output.md
git commit -m "docs: rewrite session1 expected outputs for JD pipeline demo"
```

---

## Task 4：创建 platform-engineering-trends.md（Session 2 演示原料）

**Files:**
- Create: `course/session2/demo-code/source-materials/platform-engineering-trends.md`

- [ ] **Step 1: 创建文件**

写入 `course/session2/demo-code/source-materials/platform-engineering-trends.md`：

```markdown
# Platform Engineering in 2025: What Companies Are Looking For

Platform engineering has moved from niche to mainstream. In 2025, most companies with 200+ engineers have a dedicated platform team. Here's what's driving the demand and what interviewers actually care about.

## The Shift: From DevOps to Platform Engineering

DevOps was about culture and practices. Platform engineering is about building products for your internal developers. The key insight: **developers are your customers**. A platform team's success is measured not by uptime, but by adoption and developer satisfaction.

The Gartner prediction from 2022 came true: 80% of software engineering organizations now have platform teams. The teams that succeeded did two things: they treated their platform as a product with a roadmap, and they obsessed over developer experience metrics (time-to-first-PR, deployment frequency, MTTR).

## Core Technical Areas

**Kubernetes at Scale**
Production K8s is no longer just "install and configure." At 1,000+ nodes, the real challenges are: multi-tenancy without blast radius, cost attribution, cluster autoscaling tuning, and GitOps at scale. Interviewers want to hear about real incidents you resolved and trade-offs you made.

**Internal Developer Portals (IDP)**
Backstage by Spotify has become the de facto standard, but many companies build their own. Key capabilities: service catalog, self-service scaffolding, golden paths, software templates. The hardest part isn't the technology — it's adoption. How do you get developers to use your platform instead of going around it?

**CI/CD Modernization**
GitHub Actions, Tekton, ArgoCD, Flux — the ecosystem is rich but the principles are consistent: fast feedback loops, immutable artifacts, progressive delivery. Staff-level candidates should be able to discuss build cache strategies and pipeline security.

## What Differentiates Senior Candidates

1. **Business impact vocabulary**: Can you translate "reduced p99 latency by 40%" into "helped 200 engineers ship 3x faster"?
2. **Platform adoption stories**: Have you run an internal conference? Written documentation that developers actually read? Measured adoption with data?
3. **Cross-functional leadership**: Can you say no to a team's infrastructure request and make them thank you for it?

## AI/ML Infrastructure: The New Frontier

GPU clusters, training job orchestration, model serving infrastructure — these are the fastest-growing areas in platform engineering. Companies building AI products need platform engineers who understand CUDA memory management, distributed training communication patterns (NCCL), and the difference between inference and training infrastructure requirements.

If you have this experience, lead with it. It's the highest-leverage differentiator in the 2025 market.
```

- [ ] **Step 2: 验证文件约 500 字，涵盖 K8s、IDP、AI 基础设施三个主题**

- [ ] **Step 3: Commit**

```bash
git add "course/session2/demo-code/source-materials/platform-engineering-trends.md"
git commit -m "docs: add platform engineering trends article for session2 demo"
```

---

## Task 5：创建 ai-infra-basics.md（Session 2 演示原料）

**Files:**
- Create: `course/session2/demo-code/source-materials/ai-infra-basics.md`

- [ ] **Step 1: 创建文件**

写入 `course/session2/demo-code/source-materials/ai-infra-basics.md`：

```markdown
# AI Infrastructure Basics: What Every Platform Engineer Needs to Know

You don't need to be an ML engineer to work on AI infrastructure. But you do need to understand the infrastructure requirements that make ML workloads different from web services.

## Why AI Workloads Are Different

Traditional web services: stateless, horizontally scalable, CPU-bound, milliseconds latency.
AI training workloads: stateful (checkpoints), vertically specialized (GPUs), communication-bound (inter-GPU bandwidth), hours-to-days duration.

This difference changes everything about how you architect the supporting infrastructure.

## GPU Clusters: The Physical Layer

**H100 vs A100**: H100 (Hopper architecture) delivers ~3x the training throughput of A100 for large language models due to FP8 support and NVLink 4.0. For platform engineers, the key is: H100 clusters are more expensive to provision correctly, require NVSwitch topology awareness, and have different cooling requirements.

**NVLink vs InfiniBand**: Within a single node, GPUs communicate via NVLink (ultra-high bandwidth, ~900 GB/s for H100 NVSwitch). Across nodes, the standard is InfiniBand (400 Gb/s HDR or 800 Gb/s NDR). Getting network topology wrong is the #1 cause of training job performance degradation.

**NUMA awareness**: GPU memory is not uniform. Pinning CPU workers to NUMA nodes closest to the GPUs they serve can improve data loading throughput by 30-50%.

## Distributed Training: The Software Layer

**Data Parallelism**: Each GPU has a full model copy, sees a different mini-batch. Gradients are averaged across GPUs after each step (AllReduce via NCCL). Simple to implement, scales well for most model sizes.

**Tensor/Model Parallelism**: For models too large for one GPU, split the model itself across GPUs. Requires careful sharding strategy. Megatron-LM and DeepSpeed handle this. Platform engineers rarely implement this — but they need to provision the right interconnect topology for it to work.

**NCCL (NVIDIA Collective Communications Library)**: The library that runs AllReduce, AllGather, and Broadcast operations across GPUs. Misconfigured NCCL is the most common source of "training is slow" tickets that platform teams receive. Key env vars: `NCCL_DEBUG`, `NCCL_SOCKET_IFNAME`, `NCCL_IB_GID_INDEX`.

## Kubernetes for ML: Key Differences

**Job scheduling**: ML training uses `Job` or `MPIJob` (via Kubeflow), not `Deployment`. Jobs need GPU resource requests, tolerations for GPU nodes, and often priority classes.

**Storage**: Training data is large (TB-scale). Options: mounting object storage (GCS/S3) via CSI driver, network filesystems (NFS, Lustre), or local NVMe for hot data. Throughput matters more than IOPS for most training jobs.

**Checkpointing**: Long training jobs checkpoint every N steps. Platform teams need to provision fast shared storage that multiple pods can write to simultaneously without corruption.

## Interview Tips

If asked about AI infrastructure, structure your answer as:
1. What layer are we talking about? (hardware / networking / compute orchestration / storage / monitoring)
2. What's the scale? (single GPU / single node / multi-node / multi-cluster)
3. What's the bottleneck? (compute / memory / network / storage)

This framework works for both "design a training cluster" and "debug a slow training job."
```

- [ ] **Step 2: 验证文件约 500 字，涵盖 GPU 硬件、分布式训练、K8s for ML 三个主题**

- [ ] **Step 3: Commit**

```bash
git add "course/session2/demo-code/source-materials/ai-infra-basics.md"
git commit -m "docs: add AI infrastructure basics article for session2 demo"
```

---

## Task 6：创建 system-design-interview-tips.md（Session 2 演示原料）

**Files:**
- Create: `course/session2/demo-code/source-materials/system-design-interview-tips.md`

- [ ] **Step 1: 创建文件**

写入 `course/session2/demo-code/source-materials/system-design-interview-tips.md`：

```markdown
# System Design Interviews for Platform Engineers: A Practical Guide

System design interviews for platform roles differ from generic "design Twitter" interviews. The emphasis is on infrastructure trade-offs, operational concerns, and developer experience — not just scalability.

## The Framework: RADIO

Use RADIO to structure any system design answer:

**R — Requirements**: Clarify before designing. Ask: scale (users, QPS, data volume), SLA requirements (availability, latency), operational constraints (team size, existing systems to integrate with), and whether this is green-field or a migration.

**A — API Design**: Define the interface before the implementation. For platform tools: what does the developer CLI look like? What are the API endpoints? What events does the system emit?

**D — Data Model**: What do you store, where, and why? Distinguish between hot data (fast access, expensive), warm data (moderate), and cold data (cheap, slow). For platform tools, consider: config as code (Git-stored) vs config as data (database-stored) — each has different consistency and auditability trade-offs.

**I — Infrastructure Design**: Now draw the boxes. Layer your design: client tier → API tier → processing tier → storage tier. For platform engineering: add observability layer, secrets management, and deployment mechanism from the start.

**O — Optimization & Operational Concerns**: Where will this break at 10x load? What's the on-call story? How do you roll out changes safely? What's your rollback plan?

## Common Platform Engineering Design Questions

**Design an Internal Developer Portal**
Key decision: build on Backstage vs custom. Backstage has a plugin ecosystem but is complex to operate. Custom is simpler to start but you rebuild common features. Answer: use Backstage for mid-large orgs (200+ engineers), custom for small orgs or very specific needs.

**Design a Multi-Tenant Kubernetes Platform**
Key isolation dimensions: namespace isolation (soft), node pool isolation (medium), separate clusters (hard). Cost vs isolation is the central trade-off. Answer: start with namespace isolation + RBAC, graduate to node pools for sensitive workloads, separate clusters for compliance/regulated data.

**Design a CI/CD System for 500 Teams**
Key challenges: build caching (mono-repo vs poly-repo changes everything), test parallelization, artifact management, deployment approvals. Answer: separate "build" (fast, cheap, parallelizable) from "deploy" (gated, auditable, progressive).

**Design a GPU Training Job Scheduler**
Key tensions: utilization vs fairness, priority preemption, gang scheduling (all-or-nothing for distributed jobs). Answer: Volcano or Kueue for K8s-native scheduling; describe the queue → scheduling → preemption lifecycle.

## The Behavioral Dimension

For Staff-level roles, every system design question has an implicit behavioral component:
- "Who would you align with before making this decision?"
- "How would you get adoption from skeptical teams?"
- "What would you do differently if you were doing this again?"

Prepare one real story for each of the four common designs above. "I actually built something similar at [company]" is worth more than a perfect theoretical design.

## Timing

45-minute system design interview:
- 5 min: requirements clarification
- 5 min: API/interface design
- 20 min: core design (draw boxes, explain choices)
- 10 min: deep dive on the area they care most about
- 5 min: operational concerns + your questions

If they cut you off to go deeper earlier, that's good — they're engaged.
```

- [ ] **Step 2: 验证文件约 500 字，涵盖 RADIO 框架、常见题型、时间分配三个主题**

- [ ] **Step 3: Commit**

```bash
git add "course/session2/demo-code/source-materials/system-design-interview-tips.md"
git commit -m "docs: add system design interview tips article for session2 demo"
```

---

## Task 7：重写 Session 2 Claude Code 演示脚本

**Files:**
- Modify: `course/session2/demo-code/demo-script.md`

- [ ] **Step 1: 重写 demo-script.md**

写入 `course/session2/demo-code/demo-script.md`：

```markdown
# Session 2：Claude Code 面试知识库演示脚本

> 时间：约 40 分钟（含 5 分钟 "Level Up" 时刻）
> 前提：Claude Code 已安装，终端已打开，演示文件夹已准备好

---

## 演示前准备

桌面建立演示文件夹：

```bash
mkdir demo-interview-prep
cd demo-interview-prep
mkdir raw_material wiki
cp [课程source-materials路径]/*.md raw_material/
```

文件夹结构：
```
demo-interview-prep/
  raw_material/
    platform-engineering-trends.md
    ai-infra-basics.md
    system-design-interview-tips.md
```

---

## 第一部分：展示起点（3 分钟）

**操作：**
```bash
ls raw_material/
```

**说：** "我现在有 3 篇关于平台工程和面试的文章，放在 raw_material 里。
这就是我们的起点——原材料，还没有整理。
接下来我用 Claude Code 把它们变成一个可以查询的知识库。"

---

## 第二部分：启动 Claude Code（2 分钟）

**操作：**
```bash
claude
```

**说：** "这就是 Claude Code 的界面。它能读取这个文件夹里的所有文件。
接下来我用中文下指令。"

---

## 第三部分：建立知识库（15 分钟）

**输入指令：**
```
请读取 raw_material/ 目录下的所有文章，为每篇文章在 wiki/ 目录下
创建一个对应的知识条目。

每个条目的格式：
## [主题名]
**是什么：** 一句话定义
**为什么面试会考：** 2-3 个要点
**如何回答：** 具体框架或角度
**关键词：** 3-5 个标签
**最可能被问到的问题：** 2 个具体问题
```

**等待 Claude 执行，展示生成过程**

**说：** "注意它在实时创建文件。我没有写一行代码——只是用中文说了我要什么格式。"

**展示生成的 wiki 文件，快速过一遍结构。**

---

## 第四部分：用知识库准备明天的面试（10 分钟）

**输入指令：**
```
我明天要面 NovaDeploy 的 Staff Platform Engineer 岗位，
JD 里强调 Kubernetes 大规模多集群、内部开发者平台、和 GPU 基础设施。
请从 wiki/ 里找相关知识，给我一个 2 小时速成准备方案，
以及最可能被问到的 5 个问题和答题框架。
```

**展示输出，重点说明：**
"它的答案来自我们刚才建立的知识库——不是通用建议，
是针对这 3 篇文章内容的定制回答。"

---

## 第五部分："Level Up" 时刻（5 分钟）

**切换到 ai-infra-manager 文件夹（不要 demo，只展示结构）**

**说：**
"你们刚才看到的是起点——3 篇文章，20 分钟，一个基础知识库。
这是我跑了两个月之后的状态。"

**展示文件夹结构：**
- `skills/tech/` — 按主题分类的技术知识（几十个条目）
- `jobs/` — 每家公司一个文件夹，有 JD 分析、简历、面试 prep
- `.claude/skills/` — 我自己写的自定义 Skills：jd-analyzer、mock-interview

**说：**
"路是一样的，区别只是时间和积累。
你们今天学的这套方法，就是这个系统的起点。"

**立刻切回演示文件夹，进入下一部分。**

---

## 第六部分：桥接到 Skills（2 分钟）

**说：**
"我们现在有了知识库，也有了准备方案。
接下来——怎么把这些内容变成一份面试自我介绍 PPT？
这就是 Skills 的价值：把知识库的输出变成可以直接用的成果。"

**切换到 Skills 演示。**
```

- [ ] **Step 2: 验证脚本包含 6 个部分、完整指令文本、Level Up 时刻**

- [ ] **Step 3: Commit**

```bash
git add course/session2/demo-code/demo-script.md
git commit -m "docs: rewrite session2 claude code demo script for job search knowledge base"
```

---

## Task 8：重写 Session 2 Skills 演示脚本

**Files:**
- Modify: `course/session2/demo-skills/demo-script.md`

- [ ] **Step 1: 重写 demo-script.md**

写入 `course/session2/demo-skills/demo-script.md`：

```markdown
# Session 2：Skills + ppt-master 演示脚本

> 时间：约 35 分钟（1:05–1:40）
> 前提：Superpowers 已安装，Claude Code 正在运行，知识库已建立

---

## 第一部分：Superpowers Brainstorming（10 分钟）

**背景设定（讲给学员听）：**
"我明天要面 NovaDeploy。知识库有了，准备方案有了。
但还差一件事：我怎么定位自己？我的背景里哪几点最值得强调？
Superpowers 里有一个 brainstorming skill，专门用来想清楚这种问题。"

**输入指令：**
```
/brainstorming

帮我想清楚：对于 NovaDeploy 的 Staff Platform Engineer 岗位，
我的背景里哪几点最值得在面试中强调？
哪些可能是 gap，我需要提前准备说法？

我的背景：12 年平台工程经验，大规模 K8s，内部开发者平台，
最近一年在 AI 基础设施方向有实战经验（GPU 集群管理、训练任务调度）。
JD 要求：IDP 经验、K8s 多集群、Backstage（nice-to-have）、GPU 经验。
```

**等待输出，展示 brainstorming 结果**

**讲解要点：**
"注意这个 skill 不是帮我生成内容，是帮我想清楚框架。
先想清楚定位，再输出——这个顺序很重要，避免面试时说了很多但抓不住重点。"

---

## 第二部分：ppt-master 生成自我介绍 PPT（25 分钟）

**背景设定：**
"场景：面试开始，面试官说'先介绍一下你自己'。
大多数人说了 5 分钟没有重点，或者照着简历读了一遍。
用 ppt-master，我们来做一份 4 页的自我介绍——
每一页对应一个问题：我是谁、我做过什么、我能带来什么、为什么是你们。"

**输入指令：**
```
/ppt-master

主题：面试自我介绍
受众：NovaDeploy 的 Engineering Manager + Hiring Committee，
     他们关注：平台工程深度、驱动采用的经验、团队领导力
来源：读取 wiki/ 目录下的知识条目，以及以下定位框架：
     强调点：大规模 K8s、IDP 建设经验、AI 基础设施差异化优势
     准备好解释的 gap：Backstage 没有直接使用，但熟悉架构
幻灯片数量：4 页
风格：简洁专业，每页不超过 5 个要点，有数字

结构：
第 1 页：我是谁（一句话专业定位，10 秒能记住的那种）
第 2 页：我做过什么（最相关的 2 个项目/经历，各含 1 个具体数字）
第 3 页：我能带来什么（对应 JD 的 3 个关键需求）
第 4 页：为什么是 NovaDeploy（真实的兴趣点，不是套话）
```

**等待生成，展示输出**

**说：**
"注意第 1 页的'一句话定位'——这是整个自我介绍的核心。
面试官记住的往往只有这一句。让我们看看 ppt-master 给了什么建议。"

**现场调整演示（迭代）：**
```
第 2 页的项目描述太笼统了，
把第一个项目改成：'在 [公司名] 管理 2,000 节点 K8s 集群，
帮助 600 名工程师从部署耗时 2 天缩短到 2 小时'
```

**讲解要点：**
"这就是迭代——不是接受第一个输出，而是快速调整到你满意。
Claude 提供草稿，你做决策。"

---

## 第三部分：完整工具链回顾（5 分钟）

**在白板/幻灯片画出完整流程：**

```
5C 方法论
     ↓
C1 Clarity：想清楚要投哪类公司、哪类岗位
     ↓
C3/C4 Cowork（Session 1）：
  JD 进来 → C1 校验 → 公司调研 → Outreach → Pipeline 追踪
     ↓
C2 Claude Code（Session 2）：
  原料文章 → 知识库 → 针对性准备方案
     ↓
Superpowers Brainstorming：
  想清楚定位：强调什么、如何解释 gap
     ↓
ppt-master：自我介绍 PPT
     ↓
C5 Commitment：拿到 offer，选对的，全力投入
```

**最后一句话：**
"这不是 AI 替你找工作。
这是 AI 让你能同时管 15 个机会，但每一个都像只管这一个一样用心。
这就是 Nan Li 说的 C4 系统的实际面貌。"
```

- [ ] **Step 2: 验证脚本包含 Brainstorming、ppt-master、完整工具链三个部分**

- [ ] **Step 3: Commit**

```bash
git add course/session2/demo-skills/demo-script.md
git commit -m "docs: rewrite session2 skills demo script for job search self-intro PPT"
```

---

## Task 9：更新 Session 1 PPT notes（幻灯片 12-14）

**Files:**
- Modify: `projects/claude_course_s1_ppt169_20260516/notes/12_演示入口.md`
- Modify: `projects/claude_course_s1_ppt169_20260516/notes/13_从claude到cowork.md`
- Modify: `projects/claude_course_s1_ppt169_20260516/notes/14_Cowork介绍.md`

- [ ] **Step 1: 读取现有内容**

先读取三个文件的现有内容，再决定如何更新。

- [ ] **Step 2: 更新幻灯片 12 演讲稿**

在 `projects/claude_course_s1_ppt169_20260516/notes/12_演示入口.md` 中，
将场景描述从"客户询盘"改为"求职 JD 处理"：

找到类似"接下来我们看一个真实场景"的文字，补充：
```
接下来我们看一个真实场景——
我现在正在找工作，每天收到猎头推送和 LinkedIn JD，
今天我把这个流程接入了 Cowork。
```

- [ ] **Step 3: 更新幻灯片 13 演讲稿**

在 `projects/claude_course_s1_ppt169_20260516/notes/13_从claude到cowork.md` 中，
将桥接说明从邮件场景改为求职场景：

将"Claude.ai 解决单次任务，Cowork 解决重复工作流"的例子，
从"邮件自动化"改为"JD 处理流水线"：
```
单次任务：用 Claude.ai 分析一条 JD
重复工作流：每天 10 条 JD，用 Cowork 自动分析、生成 outreach、追踪进度
```

- [ ] **Step 4: 更新幻灯片 14 演讲稿**

在 `projects/claude_course_s1_ppt169_20260516/notes/14_Cowork介绍.md` 中，
将演示预告从"邮件处理"改为"求职 JD 处理"：
```
演示场景：我收到一条 Staff Platform Engineer 的 JD，
Cowork 自动分析匹配度、调研公司、起草 outreach 邮件，
最后更新我的求职 pipeline。
整个流程我只花了 30 秒触发。
```

- [ ] **Step 5: Commit**

```bash
git add projects/claude_course_s1_ppt169_20260516/notes/
git commit -m "docs: update session1 PPT notes slides 12-14 for job search demo narrative"
```

---

## Task 10：新建 5C 方法论幻灯片 note

**Files:**
- Create: `projects/claude_course_s1_ppt169_20260516/notes/00_5C方法论.md`

> 注：这是一张新幻灯片的内容 note，插入在幻灯片 11（Projects 功能）之后、幻灯片 12（演示入口）之前。
> SVG 生成需要后续单独用 ppt-master 运行。

- [ ] **Step 1: 创建 note 文件**

写入 `projects/claude_course_s1_ppt169_20260516/notes/00_5C方法论.md`：

```markdown
# 幻灯片：5C 方法论简介

> 位置：插入幻灯片 11（Projects 功能）之后，幻灯片 12（演示入口）之前
> 时间：约 5 分钟
> 目的：为 Cowork 演示建立方法论框架，让学员理解"我们在解决什么问题"

---

## 幻灯片内容（供 ppt-master 生成 SVG 使用）

**标题：** 5C 方法论：中职场人求职的系统

**正文：**

| # | C | 核心一句话 |
|---|---|-----------|
| C1 | Clarity | 先想清楚要什么，再开始投 |
| C2 | Confidence | 知道自己的价值，填补知识缺口 |
| C3 | Connection | 建关系建口碑，进入隐藏职位市场 |
| C4 | Conversion | 把求职当销售漏斗来管 |
| C5 | Commitment | 选对的 offer，全力投入 |

**强调框（高亮 C3 + C4）：**
"今天的演示聚焦 C3 + C4——用 Cowork 把这两个 C 变成自动化工作流"

**来源：** Nan Li，MidCareer Reboot（2026）

---

## 演讲稿

"在进入演示之前，我想介绍一个方法论框架——5C 方法论，
来自职业教练 Nan Li，她用这套方法在最难的就业市场之一拿到了 10 个终轮面试。

五个 C：
- C1 Clarity：先想清楚你要什么，再开始投简历。大多数人跳过这一步。
- C2 Confidence：不是表演自信，是真正填补你的知识缺口。
- C3 Connection：80% 的岗位不在 JD 上，靠的是关系。
- C4 Conversion：把求职当销售漏斗管——永远知道每个机会在哪个阶段。
- C5 Commitment：拿到 offer 之后，选对的，不选最大的。

今天的 Cowork 演示，聚焦的是 C3 和 C4。
下一节课的 Claude Code 演示，聚焦的是 C2。
5C 是地图，Claude 是交通工具。"
```

- [ ] **Step 2: 验证 note 包含幻灯片内容和完整演讲稿**

- [ ] **Step 3: Commit**

```bash
git add "projects/claude_course_s1_ppt169_20260516/notes/00_5C方法论.md"
git commit -m "docs: add 5C methodology slide note for session1 PPT"
```

---

## Self-Review

**Spec 覆盖检查：**

| Spec 要求 | 对应 Task | 状态 |
|----------|----------|------|
| virtual-jd.md（替代 virtual-email.md） | Task 1 | ✅ |
| workflow-config.md（4 Agent JD 流水线） | Task 2 | ✅ |
| expected-output.md（4 Agent 输出样本） | Task 3 | ✅ |
| 3 篇 Session 2 演示原料文章 | Task 4-6 | ✅ |
| Session 2 Claude Code 演示脚本 | Task 7 | ✅ |
| Session 2 Skills 演示脚本（含 ppt-master 自我介绍） | Task 8 | ✅ |
| PPT notes 幻灯片 12-14 更新 | Task 9 | ✅ |
| 5C 方法论新幻灯片 note | Task 10 | ✅ |
| 方案 B 存档 | Spec 文档已包含，本计划无需实现 | ✅ |

**Placeholder 检查：** 无 TBD/TODO。每个 Task 包含完整文件内容。

**一致性检查：**
- NovaDeploy 公司名在 Task 1-3 及 Task 7-8 中一致使用
- 5C 编号（C1-C5）在所有文件中一致
- Superpowers brainstorming 在 Task 8 中调用，与 Session 2 spec 一致
- "Level Up" 时刻在 Task 7 中实现（5 分钟，展示结构不 demo）
