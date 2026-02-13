---
title: superspec update
description: 刷新 agent 指令和模板到最新版本
---

# superspec update

刷新 agent 指令和模板到最新版本，同时保留用户配置。

## 语法

```bash
superspec update
```

## 选项

此命令没有额外选项。

## 功能

`update` 命令会：
1. 更新 `AGENTS.md` 到最新版本
2. 更新 AI 编辑器特定的规则文件
3. 更新 slash 命令模板
4. 保留 `superspec.config.json` 中的用户配置

## 示例

```bash
superspec update
```

## 输出示例

```
◆ 更新 Agent 文件
──────────────────────────────────────────────────
✓ AGENTS.md
✓ .cursor/rules/superspec.mdc
✓ 命令模板已更新

✨ 更新完成！
```

## 何时使用

建议在以下情况下运行 `update`：
- 升级 `@superspec/cli` 版本后
- 切换 AI 助手类型后
- 想要获取最新的模板改进时

## 注意事项

1. **配置保留**: 用户的 `superspec.config.json` 不会被覆盖
2. **模板覆盖**: `superspec/templates/` 中的模板可能会被更新
3. **自定义保留**: 如果你修改了模板，建议先备份
