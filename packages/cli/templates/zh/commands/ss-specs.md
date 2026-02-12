---
name: /ss-specs
id: ss-specs
category: SuperSpec
description: 为大型变更创建多能力域 spec 结构
---
<!-- SUPERSPEC:START -->
**用途**
当一个变更涉及多个独立能力域（如 auth, api, ui）且 spec.md 可能超过 300 行时，使用此命令将 spec 拆分为多个能力域文件。

**适用场景**
- 变更跨多个系统模块（认证 + API + UI）
- 单个 spec.md 预计超过 300 行
- 需要并行开发多个独立能力
- 需要清晰的关注点分离

**目录结构**
```
{specDir}/changes/<name>/
├── proposal.md
├── design.md          （可选，架构决策）
├── specs/
│   ├── auth/          — 认证能力域
│   │   └── spec.md
│   ├── api/           — API 层能力域
│   │   └── spec.md
│   └── ui/            — UI 组件能力域
│       └── spec.md
├── tasks.md
└── checklist.md
```

**能力域识别指南**
常见能力域类型:
- **auth**: 认证、授权、会话管理
- **api**: REST/GraphQL API、接口定义
- **ui**: 前端组件、页面布局
- **data**: 数据模型、数据库 schema
- **workflow**: 业务流程、状态机
- **integration**: 外部系统集成
- **infra**: 基础设施、部署配置

**每个 spec.md 应包含**
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
<!-- 明确此能力域的边界 -->

## 用户故事
### US-<capability>-1: [标题]
...

## 功能需求
### FR-<capability>-1: [标题]
...

## 跨能力域依赖
<!-- 列出与其他能力域的交互点 -->
- 依赖 `auth/spec.md` 的 FR-auth-2
- 为 `ui/spec.md` 提供 API-1

## 边界情况
...
```

**命名约定**
- User Story ID: `US-<capability>-<number>` (例: US-auth-1, US-api-1)
- Functional Requirement ID: `FR-<capability>-<number>` (例: FR-auth-1, FR-ui-2)
- Acceptance Criteria ID: `AC-<capability>-<number>.<sub>` (例: AC-auth-1.1)

**跨能力域引用**
在 tasks.md 中引用时:
```markdown
## Phase 1: Authentication (auth capability)
- [ ] Task 1.1: 实现 FR-auth-1 (参考 specs/auth/spec.md)
- [ ] Task 1.2: 集成 FR-api-3 依赖

## Phase 2: API Layer (api capability)
- [ ] Task 2.1: 实现 FR-api-1 (参考 specs/api/spec.md)
- [ ] Task 2.2: 依赖 US-auth-2 完成
```

**创建步骤**
1. 在 proposal.md 中识别独立能力域（建议 2-5 个）
2. 为每个能力域创建 `specs/<capability>/` 目录
3. 在每个目录下创建 spec.md，使用上述模板
4. 在 design.md 中说明能力域划分理由和交互关系
5. 确保每个 spec.md < 300 行
6. 在 tasks.md 中按能力域分组任务

**验证清单**
- [ ] 每个能力域有明确的边界和职责
- [ ] 能力域之间的依赖关系已明确
- [ ] 每个 spec.md 文件 < 300 行
- [ ] ID 命名遵循 `<type>-<capability>-<number>` 格式
- [ ] tasks.md 正确引用各能力域需求
- [ ] checklist.md 包含所有能力域的检查项

**示例：用户认证系统**
```
changes/20260212-add-auth-system/
├── proposal.md                      （概述：添加完整认证系统）
├── design.md                        （架构：JWT + OAuth2 + RBAC）
├── specs/
│   ├── auth/                        （认证能力）
│   │   └── spec.md                  US-auth-1: 用户登录
│   │                                FR-auth-1: JWT 生成
│   ├── api/                         （API 能力）
│   │   └── spec.md                  US-api-1: 认证中间件
│   │                                FR-api-1: Token 验证
│   └── ui/                          （UI 能力）
│       └── spec.md                  US-ui-1: 登录表单
│                                    FR-ui-1: 错误提示
├── tasks.md                         （按能力域分 Phase）
└── checklist.md                     （涵盖所有能力域）
```

**何时不需要拆分**
- 变更仅涉及单一模块
- spec.md 预计 < 200 行
- 能力域之间高度耦合，难以分离
- 快速原型或实验性变更

<!-- SUPERSPEC:END -->
