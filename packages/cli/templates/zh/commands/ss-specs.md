---
name: /ss-specs
id: ss-specs
category: SuperSpec
description: 为大型变更创建多能力域 spec 结构
---
<!-- SUPERSPEC:START -->
**用途**
当 spec.md 因涉及多个独立能力域可能超过 300 行时，拆分为能力域维度的 spec 文件。

**何时拆分**
- 变更跨多个系统模块（如 auth + API + UI）
- 单个 spec.md 预计超过 300 行
- 需要并行开发多个独立能力

**何时不拆分**
- 单一模块变更或 spec.md < 200 行
- 能力域之间高度耦合
- 快速原型或实验性变更

**能力域类型**
`auth`（认证/授权）· `api`（REST/GraphQL）· `ui`（前端）· `data`（模型/schema）· `workflow`（业务流程）· `integration`（外部集成）· `infra`（部署）

**Spec 模板**
```markdown
---
name: <name>-<capability>
status: draft
strategy: {{strategy}}
depends_on: []
capability: <capability-name>
---
# Spec: <name> - <Capability>

## 能力域范围
## 用户故事
### US-<capability>-1: [标题]
## 功能需求
### FR-<capability>-1: [标题]
## 跨能力域依赖
- 依赖 `auth/spec.md` 的 FR-auth-2
- 为 `ui/spec.md` 提供 API-1
## 边界情况
```

**ID 约定**: `US-<cap>-<n>`, `FR-<cap>-<n>`, `AC-<cap>-<n>.<sub>`

**Steps**
1. 在 proposal.md 中识别 2-5 个独立能力域
2. 为每个能力域创建 `specs/<capability>/spec.md`，使用上述模板
3. 在 design.md 中说明拆分理由
4. 在 tasks.md 中按能力域分组任务
5. 验证：边界清晰、依赖明确、每个 spec < 300 行、ID 遵循约定
<!-- SUPERSPEC:END -->
