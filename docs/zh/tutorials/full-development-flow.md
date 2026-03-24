# SuperSpec 标准模式全流程记录（从 init 到完成）

> 目标：给用户完整展示本次需求的开发流程与产物
> 变更：`feature-20260324-Flow29149LinkCoupon-jay`
---

## 0. 使用 `superpowers` plugin 的指令 `/brainstorming` 理解整体代码库架构
- 让 Agent 理解整体代码库架构

## 1. 初始化阶段：`superspec init`

### 1.1 初始化目标
- 在仓库中建立 SuperSpec 的基础能力：配置、模板、命令、规则。
- 让后续 `/ss-create`、`/ss-tasks`、`/ss-apply` 有统一入口与规范约束。

### 1.2 产物（主要文件）
- `superspec.config.json`
- `superspec/templates/proposal.md`
- `superspec/templates/spec.md`
- `superspec/templates/design.md`
- `superspec/templates/tasks.md`
- `superspec/templates/checklist.md`
- `superspec/templates/clarify.md`
- `.cursor/commands/ss-create.md`
- `.cursor/commands/ss-tasks.md`
- `.cursor/commands/ss-apply.md`
- `.cursor/commands/ss-checklist.md`
- `.cursor/rules/superspec.mdc`
- `AGENTS.md`（ Superspec 工作流说明）

---

## 2. 需求创建阶段：`/ss-create`

### 2.1 输入与解析
- 输入命令：`/ss-create ...（比如一些需求链接，可通过 mcp 工具识别） Flow29149 -d '根据这个文档生成规格描述，路由是 /marketing/marketing-configure/link-coupon-config' @jay`
- 解析结果：
  - feature：`Flow29149LinkCoupon`
  - intent type：`feature`
  - user：`jay`
  - 路由目标：`/marketing/marketing-configure/link-coupon-config`

### 2.2 上下文收集
- 读取项目配置与规范：
  - `superspec.config.json`
  - `AGENTS.md`
  - `README.md`
- 获取外部需求文档内容（知识库页面）并转为可执行需求点。

### 2.3 创建变更与分支
- 创建 change + branch（初始命名）。
- 后续按要求重命名为：
  - 分支：`feature-20260324-Flow29149LinkCoupon-jay`
  - 规格目录：`superspec/changes/feature-20260324-Flow29149LinkCoupon-jay`

### 2.4 生成规格文档
- 生成并完善：
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/proposal.md`
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/checklist.md`
- 文档重点包含：
  - 业务背景、目标、非目标
  - 功能需求与技术方案
  - 影响范围、风险与缓解策略
  - 路由与模块落点

---

## 3. 任务拆解阶段：`/ss-tasks`

### 3.1 拆解原则
- 基于 `proposal.md` 拆为可执行任务。
- 任务按阶段组织：Infrastructure / Core / Integration。
- 每项任务都包含：
  - 任务描述
  - 主要文件
  - 依赖关系
  - 验证标准（Verify）

### 3.2 产物
- `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/tasks.md`

---

## 4. 开发实施阶段：`/ss-apply`

### 4.1 实施前对齐（先读后写）
- 阅读同域既有实现，确保遵循项目模式：
  - 列表页/详情页结构
  - service/type 组织方式
  - 路由挂载方式

### 4.2 Phase 1：基础建设
- 新增类型定义：
  - `packages/types/src/services/marketing/linkCouponConfig.d.ts`
  - `packages/types/src/services/marketing/index.d.ts`（补充引用）
- 新增服务层 API：
  - `packages/services/src/marketing/linkCouponConfig.ts`
  - `packages/services/src/marketing/index.ts`（补充导出）
- 新增路由：
  - `packages/femarketing/src/router/marketing.tsx`
    - `marketing-configure/link-coupon-config`
    - `marketing-configure/link-coupon-config/:type/:id?`

### 4.3 Phase 2：核心功能
- 新增列表页：
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/list/index.tsx`
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/list/config.tsx`
- 新增操作记录抽屉与快照：
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/list/components/index.ts`
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/list/components/record-drawer/index.tsx`
- 新增详情页（Formily 四态 + 校验 + CRM 回显）：
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/detail/index.tsx`
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/detail/config.tsx`

### 4.4 Phase 3：集成与验证
- 完成列表与详情联动（create/edit/copy/read 跳转与回刷）。
- 运行检查并修正问题：
  - 局部诊断：`ReadLints`（针对本次文件）
  - 全量检查：`pnpm lint`
- 更新任务状态：
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/tasks.md`（全部勾选完成）

### 4.5 Phase 4：同步与状态确认

#### 4.5.1 同步上下文
- 执行：`superspec sync feature-20260324-Flow29149LinkCoupon-jay`
- 生成：
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/context.md`

### 4.5.2 状态确认
- 执行：`superspec status`
- 结果：当前变更 proposal/checklist/tasks 均已完成，处于可继续流转状态。

---

## 5. 本次流程产物清单（最终）

- 规格文档：
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/proposal.md`
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/checklist.md`
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/tasks.md`
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/context.md`
- 本流程说明文档：
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/full-process.md`
- 业务实现代码：
  - `packages/femarketing/src/router/marketing.tsx`
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/**`
  - `packages/services/src/marketing/linkCouponConfig.ts`
  - `packages/services/src/marketing/index.ts`
  - `packages/types/src/services/marketing/linkCouponConfig.d.ts`
  - `packages/types/src/services/marketing/index.d.ts`

---

## 6. 标准执行链路（可复用）

1. `superspec init`（首次初始化）
2. `/ss-create`（产出 proposal + checklist）
3. `/ss-tasks`（产出 tasks）
4. `/ss-apply`（按任务开发并回填状态）
5. `superspec sync <change-name>`（刷新 context）
6. `/ss-checklist`（可选复核）
7. `/ss-archive`（完成归档）
