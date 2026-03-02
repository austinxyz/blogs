① 配置 CLAUDE.md（最重要）
CLAUDE.md 是 Claude 每次会话都会自动读取的文件。在里面写清楚项目概览、构建命令、代码规范，Claude 就不用每次都去扫描代码库来搞清楚"怎么运行测试"这类问题。 Eesel AI
CLAUDE.md 建议不超过 150 行，保持精简。 GitHub
② 先 Plan 再执行
对复杂任务使用四步流程：先让 Claude 给出实现计划（加上"think hard"让它认真推理），明确说"不要写代码，只给计划"，review 和修改计划直到满意，再放行执行。 Eesel AI 这能避免 Claude 理解错需求后大量返工。
③ 主动管理上下文，不要等它满
每次开始新任务就 /clear。不需要用历史吃掉 token，上箭头可以翻回之前的对话作参考。 Builder.io
④ 配置权限白名单
用 /permissions 命令或编辑 settings.json 设置允许自动执行的命令白名单。比如允许 git commit 自动跑，但 rm -rf 之类的继续询问确认。 Eesel AI
⑤ 用 .claudeignore 排除无用文件
排除 node_modules/、dist/、coverage/ 等目录。仅排除 node_modules 一项就能在标准 Node.js 项目里省 3-10 万 token。 SFEIR Institute
⑥ 给示例而不是写规则
与其写很多文字规范，不如直接引用已有文件："Create a new ProductCard component following the same pattern as components/UserCard.tsx"。参考具体文件比 100 字的说明更有效。 SFEIR Institute
⑦ 用 Subagent 隔离复杂子任务
对安全审查、代码 review 等专项工作，显式告诉 Claude "用 subagent 来做"——subagent 有独立的上下文窗口，不会污染主会话。 Claude
