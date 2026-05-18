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
