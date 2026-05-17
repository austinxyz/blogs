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
