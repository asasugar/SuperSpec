---
title: 常见问题
description: SuperSpec 常见问题解答
---

# 常见问题 (FAQ)

## 安装和配置

### Q: SuperSpec 支持哪些 Node.js 版本？

**A:** SuperSpec 需要 Node.js 18.0.0 或更高版本。推荐使用 LTS 版本。

```bash
# 检查 Node.js 版本
node --version
```

### Q: 如何在现有项目中使用 SuperSpec？

**A:** 只需在项目根目录运行初始化命令：

```bash
cd your-project
superspec init
```

SuperSpec 会创建 `superspec/` 目录，不会影响现有代码。

### Q: SuperSpec 支持哪些 AI 编码助手？

**A:** SuperSpec 支持任何能读取 `AGENTS.md` 的 AI 助手，包括：
- Cursor
- Claude Code
- Qwen 通义
- Qoder
- OpenCode
- CodeBuddy
- Codex

### Q: 如何切换中英文模板？

**A:** 初始化时指定语言：

```bash
# 中文模板
superspec init --lang zh

# 英文模板（默认）
superspec init --lang en
```

---

## 工作流程

### Q: 标准模式和增强模式有什么区别？

**A:**

| 模式 | 产物 | 适用场景 |
|------|------|----------|
| 标准模式 | proposal.md + tasks.md | 简单功能、Bug 修复 |
| 增强模式 | + spec.md + design.md + checklist.md | 复杂功能、需要评审 |

```bash
# 标准模式
superspec create myFeature

# 增强模式
superspec create myFeature -b
```

### Q: 为什么限制文件大小为 300 行？

**A:** 300 行的限制是基于 AI 上下文窗口的最佳实践：

- 典型 AI 上下文：8K-128K tokens
- 300 行 ≈ 1.5K tokens
- 留出空间用于对话历史和代码生成

这个限制确保 AI 能完整读取和理解每个文件。

### Q: 可以同时进行多个变更吗？

**A:** 可以。SuperSpec 支持多个变更同时进行：

```bash
# 查看所有活跃变更
superspec status

# 变更之间可以有依赖关系
superspec deps add featureB featureA
```

---

## 命令使用

### Q: `/ss-create` 和 `superspec create` 有什么区别？

**A:** 功能相同，使用场景不同：

- `superspec create` - 在终端中使用
- `/ss-create` - 在 AI 对话中使用（Slash 命令）

### Q: 如何搜索历史变更？

**A:** 使用 search 命令：

```bash
# 搜索包含关键词的变更
superspec search "用户认证"

# 在 AI 对话中
/ss-search 用户认证
```

### Q: 如何验证规格文档的一致性？

**A:** 使用 validate 命令：

```bash
superspec validate

# 或在 AI 对话中
/ss-validate
```

这会检查 proposal、spec、tasks 之间的一致性。

---

## 团队协作

### Q: 如何在团队中使用 SuperSpec？

**A:**

1. 将 `superspec/` 目录纳入版本控制
2. 使用统一的命名规范
3. 规格文档通过 PR 评审
4. 可以集成到 CI/CD 流程

详见 [团队协作教程](/tutorials/team-workflow)。

### Q: 多人同时修改同一个变更怎么办？

**A:** 使用 Git 处理冲突：

1. 先拉取最新变更：`git pull`
2. 解决冲突（通常是 tasks.md 的状态）
3. 保留最新的任务状态

### Q: 如何在 CI 中使用 SuperSpec？

**A:** 添加 lint 和 validate 检查：

```yaml
# .github/workflows/superspec.yml
- run: npm install -g @superspec/cli
- run: superspec lint
- run: superspec validate
```

---

## 故障排除

### Q: 运行命令报错 "command not found"

**A:** SuperSpec CLI 未正确安装。尝试：

```bash
# 全局安装
npm install -g @superspec/cli

# 验证安装
superspec --version
```

### Q: AI 不响应 Slash 命令

**A:** 确保：

1. AI 助手支持读取 `AGENTS.md` 和 `<.AINAME>/commands/`
2. 项目已初始化：`superspec init`
3. `<.AINAME>/commands/` 文件存在且内容正确

### Q: lint 检查失败

**A:** lint 检查文件行数。如果失败：

1. 查看哪些文件超过限制：`superspec lint`
2. 拆分大文件
3. 移除冗余内容

### Q: context.md 内容过多

**A:** context.md 用于 Vibe Coding，如果内容过多：

1. 完成当前变更后归档
2. 清理不需要的 git 变更
3. 重新运行 `superspec sync`

---

## 其他

### Q: SuperSpec 是开源的吗？

**A:** 是的，SuperSpec 基于 MIT 许可开源，完全免费使用。

### Q: 如何反馈问题或建议？

**A:**

1. GitHub Issues: [提交问题](https://github.com/asasugar/SuperSpec/issues)
2. 讨论区: [GitHub Discussions](https://github.com/asasugar/SuperSpec/discussions)
3. 贡献代码: 详见 [贡献指南](/contributing)

### Q: SuperSpec 会收集用户数据吗？

**A:** 不会。SuperSpec 是完全本地化的工具：

- 所有数据存储在项目目录
- 不需要网络连接
- 不发送任何遥测数据

### Q: 如何更新 SuperSpec？

**A:**

```bash
# npm
npm update -g @superspec/cli

# pnpm
pnpm update -g @superspec/cli

# 更新项目模板
superspec update
```

---

还有问题？欢迎到 [GitHub Discussions](https://github.com/asasugar/SuperSpec/discussions) 提问！
