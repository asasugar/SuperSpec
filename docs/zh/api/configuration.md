---
title: 配置详解
description: superspec.config.json 配置文件完整参考
---

# 配置详解

SuperSpec 通过 `superspec.config.json` 文件进行配置。本文档详细介绍所有配置选项。

## 配置文件位置

配置文件位于项目根目录：

```
your-project/
└── superspec.config.json
```

## 完整配置示例

```json
{
  "lang": "zh",
  "aiEditor": "cursor",
  "specDir": "superspec",
  "branchPrefix": "",
  "branchTemplate": "{prefix}{intentType}-{date}-{feature}-{user}",
  "changeNameTemplate": "{intentType}-{date}-{feature}-{user}",
  "boost": false,
  "strategy": "follow",
  "context": [
    ".cursor/rules/coding-style.mdc",
    "AGENTS.md",
    "docs/conventions.md"
  ],
  "templates": {
    "spec": "spec.md",
    "proposal": "proposal.md",
    "tasks": "tasks.md",
    "clarify": "clarify.md",
    "checklist": "checklist.md",
    "design": "design.md"
  },
  "archive": {
    "dir": "archive",
    "datePrefix": true
  },
  "limits": {
    "targetLines": 300,
    "hardLines": 400
  },
  "artifacts": ["proposal"],
  "boostArtifacts": ["proposal", "spec", "design", "tasks", "checklist"]
}
```

## 配置选项详解

### lang

模板和 CLI 提示的语言。

| 值 | 说明 |
|---|---|
| `"en"` | 英文（默认） |
| `"zh"` | 中文 |

```json
{
  "lang": "zh"
}
```

### aiEditor

AI 编辑器类型，用于安装对应的规则和命令。

| 值 | 说明 |
|---|---|
| `"cursor"` | Cursor（默认） |
| `"claude"` | Claude Code |
| `"qwen"` | Qwen 通义 |
| `"opencode"` | OpenCode |
| `"codex"` | Codex |
| `"codebuddy"` | CodeBuddy |
| `"qoder"` | Qoder |

```json
{
  "aiEditor": "claude"
}
```

### specDir

Spec 文件夹名称。

```json
{
  "specDir": "superspec"
}
```

目录结构：

```
your-project/
└── superspec/          # specDir
    ├── changes/        # 变更文件夹
    └── templates/      # 模板文件夹
```

### branchPrefix

Git 分支前缀。

```json
{
  "branchPrefix": ""
}
```

### branchTemplate

Git 分支名称模板。

**可用变量：**
- `{prefix}` - branchPrefix 的值
- `{intentType}` - 意图类型（feature/hotfix/bugfix/refactor/chore）
- `{feature}` - 功能名称
- `{date}` - 日期（YYYYMMDD）
- `{user}` - 开发者标识

```json
{
  "branchTemplate": "{prefix}{intentType}-{date}-{feature}-{user}"
}
```

**示例输出：** `feature-20240115-add-auth-jay`

### changeNameTemplate

变更文件夹名称模板。使用与 `branchTemplate` 相同的变量。

```json
{
  "changeNameTemplate": "{prefix}{intentType}-{date}-{feature}-{user}"
}
```

**示例输出：** `feature-20240115-add-auth-jay`

### boost

默认是否启用增强模式。

```json
{
  "boost": false
}
```

### strategy

默认策略。

| 值 | 说明 |
|---|---|
| `"follow"` | 遵循项目规则（默认） |
| `"create"` | 可以提出新方案 |

```json
{
  "strategy": "follow"
}
```

### context

AI 需要读取的项目规则文件列表。

```json
{
  "context": [
    ".cursor/rules/coding-style.mdc",
    "AGENTS.md",
    "docs/conventions.md"
  ]
}
```

### templates

模板文件名映射。

```json
{
  "templates": {
    "spec": "spec.md",
    "proposal": "proposal.md",
    "tasks": "tasks.md",
    "clarify": "clarify.md",
    "checklist": "checklist.md",
    "design": "design.md"
  }
}
```

### archive

归档配置。

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `dir` | 归档子目录名 | `"archive"` |
| `datePrefix` | 是否添加日期前缀 | `true` |

```json
{
  "archive": {
    "dir": "archive",
    "datePrefix": true
  }
}
```

### limits

Artifact 大小限制。

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `targetLines` | 目标最大行数 | `300` |
| `hardLines` | 硬限最大行数 | `400` |

```json
{
  "limits": {
    "targetLines": 300,
    "hardLines": 400
  }
}
```

### artifacts

标准模式生成的 artifact 列表。

```json
{
  "artifacts": ["proposal"]
}
```

### boostArtifacts

增强模式生成的 artifact 列表。

```json
{
  "boostArtifacts": ["proposal", "spec", "design", "tasks", "checklist"]
}
```

## 配置覆盖

命令行参数可以覆盖配置文件的值：

```bash
# 覆盖 lang
superspec create add-feature --lang en

# 覆盖 boost
superspec create add-feature -b

# 覆盖 branchPrefix
superspec create add-feature --branch-prefix hotfix/
```

## 配置验证

SuperSpec 会在启动时验证配置文件：

- JSON 格式是否正确
- 字段类型是否匹配
- 必需字段是否存在

如果配置文件有问题，会显示警告并使用默认值。
