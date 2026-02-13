---
title: 模板参考
description: SuperSpec 模板文件完整参考
---

# 模板参考

SuperSpec 使用模板文件来生成各种 artifact。本文档介绍所有模板的结构和用法。

## 模板位置

模板文件位于 `superspec/templates/` 目录：

```
superspec/
└── templates/
    ├── proposal.md
    ├── spec.md
    ├── tasks.md
    ├── clarify.md
    ├── checklist.md
    └── design.md
```

## 模板变量

所有模板支持以下变量：

| 变量 | 说明 | 示例 |
|------|------|------|
| `{{name}}` | 变更名称 | `add-user-auth` |
| `{{date}}` | 创建日期 | `20240115` |
| `{{boost}}` | 是否增强模式 | `true` / `false` |
| `{{strategy}}` | 策略 | `follow` / `create` |
| `{{description}}` | 变更描述 | `OAuth2 集成` |

---

## proposal.md

变更提案模板，所有变更都会生成此文件。

### 结构

```markdown
---
name: {{name}}
date: {{date}}
status: draft
boost: {{boost}}
strategy: {{strategy}}
depends_on: []
---

# 变更提案: {{name}}

## 概述

{{description}}

## 问题

[描述当前的问题或需求]

## 解决方案

[描述提议的解决方案]

## 成功标准

- [ ] 标准 1
- [ ] 标准 2

## 权衡

### 优点

-

### 缺点

-

## 风险

-

## 时间线

-
```

### Frontmatter 字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 变更名称 |
| `date` | string | 创建日期 |
| `status` | string | 状态（draft/ready/done） |
| `boost` | boolean | 是否增强模式 |
| `strategy` | string | 策略 |
| `depends_on` | array | 依赖列表 |

---

## spec.md（增强模式）

详细规格模板，包含用户故事、功能需求和验收标准。

### 结构

```markdown
---
name: {{name}}
date: {{date}}
status: draft
---

# 规格: {{name}}

## 用户故事 (US)

### US-1: [标题]

作为 [角色]，
我想要 [功能]，
以便 [收益]。

### US-2: [标题]

...

## 功能需求 (FR)

### FR-1: [标题]

**关联 US:** US-1

[详细描述]

### FR-2: [标题]

...

## 验收标准 (AC)

### AC-1: [标题]

**关联 FR:** FR-1

- [ ] 条件 1
- [ ] 条件 2

### AC-2: [标题]

...

## 非功能需求

### 性能

-

### 安全

-

### 可用性

-
```

---

## tasks.md

任务清单模板。

### 结构

```markdown
---
name: {{name}}
date: {{date}}
status: draft
---

# 任务清单: {{name}}

## 阶段 1: [阶段名称]

### 任务 1.1: [任务标题]

**关联:** AC-1

- 描述: [任务描述]
- 预计: [时间估算]
- 状态: [ ] 未开始

### 任务 1.2: [任务标题] [P]

**注:** [P] 标记表示可与上一任务并行执行

...

## 阶段 2: [阶段名称]

### 任务 2.1: [任务标题]

...

## 验证

- [ ] 所有任务完成
- [ ] 通过 lint 检查
- [ ] 通过 validate 检查
```

### 并行标记

使用 `[P]` 标记可并行执行的任务：

```markdown
### 任务 1.1: 创建数据库模型
### 任务 1.2: 创建 API 路由 [P]
### 任务 1.3: 创建前端组件 [P]
```

---

## clarify.md

澄清记录模板。

### 结构

```markdown
---
name: {{name}}
date: {{date}}
---

# 澄清记录: {{name}}

## 问题 1: [问题标题]

**提出时间:** [日期]

**问题描述:**

[详细描述]

**决策:**

[最终决定]

**理由:**

[决策理由]

---

## 问题 2: [问题标题]

...
```

---

## checklist.md（增强模式）

质量检查清单模板。

### 结构

```markdown
---
name: {{name}}
date: {{date}}
status: draft
---

# 质量检查清单: {{name}}

## 代码质量

- [ ] 代码符合项目编码规范
- [ ] 无 lint 错误
- [ ] 无 TypeScript 类型错误
- [ ] 代码已适当注释

## 测试

- [ ] 单元测试覆盖关键功能
- [ ] 集成测试通过
- [ ] 边界情况已测试

## 安全

- [ ] 无硬编码凭证
- [ ] 输入已验证和清理
- [ ] 无 SQL 注入风险
- [ ] 无 XSS 风险

## 性能

- [ ] 无明显性能问题
- [ ] 数据库查询已优化
- [ ] 无内存泄漏

## 文档

- [ ] API 文档已更新
- [ ] README 已更新（如需要）
- [ ] 变更日志已更新

## 部署

- [ ] 环境变量已配置
- [ ] 数据库迁移已准备
- [ ] 回滚计划已准备
```

---

## design.md（增强模式）

设计文档模板。

### 结构

```markdown
---
name: {{name}}
date: {{date}}
status: draft
---

# 设计文档: {{name}}

## 架构概述

[高层架构描述]

## 组件设计

### 组件 1: [名称]

**职责:**

-

**接口:**

```typescript
interface Component1 {
  // ...
}
```

### 组件 2: [名称]

...

## 数据模型

### 实体 1: [名称]

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识 |
| ... | ... | ... |

## API 设计

### [POST] /api/resource

**请求:**

```json
{
  "field": "value"
}
```

**响应:**

```json
{
  "id": "...",
  "field": "value"
}
```

## 技术选型

| 技术 | 选择 | 理由 |
|------|------|------|
| ... | ... | ... |

## 风险与缓解

| 风险 | 缓解措施 |
|------|----------|
| ... | ... |
```

## 自定义模板

你可以修改 `superspec/templates/` 中的模板来适应项目需求。修改后，新创建的变更会使用更新后的模板。

### 注意事项

1. 保持 frontmatter 格式正确
2. 保留必需的变量占位符
3. 运行 `superspec update` 可能会覆盖模板
