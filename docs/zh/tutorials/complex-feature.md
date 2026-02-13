---
title: 复杂功能开发
description: 使用增强模式开发复杂功能的完整流程
---

# 复杂功能开发

本教程演示如何使用增强模式（Boost Mode）开发一个复杂的功能模块。

## 场景设定

我们要为电商平台开发**购物车功能**，包括：
- 添加/删除商品
- 修改数量
- 优惠券应用
- 库存检查
- 价格计算

## 为什么使用增强模式？

| 场景 | 标准模式 | 增强模式 |
|------|----------|----------|
| 简单功能 | ✓ | - |
| 复杂功能 | - | ✓ |
| 需要评审 | - | ✓ |
| 多人协作 | - | ✓ |
| 验收标准多 | - | ✓ |

购物车功能复杂度高、验收标准多，适合使用增强模式。

## 步骤 1：创建变更 + 生成 Artifacts

使用 `/ss-create -b` 一次完成：创建文件夹、生成 proposal、spec、自动 checklist。

```
/ss-create -b 添加购物车功能 @jay
```

AI 自动执行以下流程：

### 1.1 CLI 创建文件夹 + 分支

```bash
superspec create addShoppingCart -b --intent-type feature --user jay
```

```
╭────────────────────────────────────────────────╮
    创建变更: feature-20260213-addShoppingCart-jay
╰────────────────────────────────────────────────╯

⚡ 增强模式已启用
✓ Branch: feature-20260213-addShoppingCart-jay

✨ 变更创建成功！
路径: superspec/changes/feature-20260213-addShoppingCart-jay/
模板参考: superspec/templates/
预期 Artifacts: proposal, spec, design, tasks, checklist
下一步: AI 按需通过 /ss-create 生成 artifacts
```

CLI 只创建空文件夹和 git 分支，不生成任何文件。

### 1.2 AI 生成 proposal.md（聚焦需求背景）

```markdown
---
name: addShoppingCart
status: draft
strategy: follow
depends_on: []
input: "-b 添加购物车功能 @jay"
---

# 提案: addShoppingCart

> 创建日期: 2026-02-13

## 背景
当前平台没有购物车功能，用户只能单品购买，影响购物体验和转化率。

## 目标
- [ ] 用户可以将商品添加到购物车
- [ ] 支持修改商品数量和删除商品
- [ ] 支持应用优惠券
- [ ] 实时计算价格（含优惠）
- [ ] 下单前验证库存

## 非目标
- 不实现收藏夹功能
- 不实现跨设备同步（后续迭代）

## 方案概述
- 前端：React + Redux 状态管理
- 后端：RESTful API + Redis 缓存
- 数据库：购物车表 + 购物车项表

## 影响范围
- **涉及模块**: Cart 模块（新增）
- **涉及文件**: cart.controller, cart.service, coupon.service
- **依赖变更**: 新增 carts, cart_items 表

## 风险与权衡
| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 高并发下库存超卖 | 高 | Redis 分布式锁 |
| 优惠券叠加计算复杂 | 中 | 限制单张优惠券 |
```

### 1.3 AI 生成 spec.md（需求细节 + 交互）

```markdown
# Spec: addShoppingCart

## 用户故事

### US-1: 添加商品到购物车
作为 **买家**，我想要 **将商品添加到购物车**，以便 **之后一起结算**。

**验收标准：**
- [ ] AC-1.1: 点击"加入购物车"后，商品出现在购物车中
- [ ] AC-1.2: 如果商品已存在，增加数量
- [ ] AC-1.3: 显示成功提示
- [ ] AC-1.4: 购物车图标显示商品数量

### US-2: 修改购物车
作为 **买家**，我想要 **修改购物车中的商品数量或删除商品**。

**验收标准：**
- [ ] AC-2.1: 可以增加/减少商品数量
- [ ] AC-2.2: 数量最小为 1
- [ ] AC-2.3: 可以删除商品
- [ ] AC-2.4: 修改后实时更新价格

### US-3: 应用优惠券
**验收标准：**
- [ ] AC-3.1: 可以输入优惠券码
- [ ] AC-3.2: 验证优惠券有效性
- [ ] AC-3.3: 显示折扣金额
- [ ] AC-3.4: 无效时显示错误信息

## 功能需求

### FR-1: 购物车数据结构
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/cart | 获取购物车 |
| POST | /api/cart/items | 添加商品 |
| PUT | /api/cart/items/:id | 更新数量 |
| DELETE | /api/cart/items/:id | 删除商品 |
| POST | /api/cart/coupon | 应用优惠券 |

### FR-2: 业务规则
1. 单个商品最大数量：99
2. 购物车最大商品种类：50
3. 优惠券只能使用一张

## 非功能需求
- 购物车页面加载 < 1s
- 添加商品响应 < 200ms

## 边界情况
- 商品下架后购物车中的处理
- 价格变动后的提示
- 库存不足时的降级策略
```

### 1.4 自动复杂度评估

AI 评估：
- spec < 300 行，无需拆分
- 不涉及跨系统架构决策，无需 design.md

### 1.5 自动执行 checklist（Boost 检查项，满分 / 25）

AI 自动评估所有已有 artifacts，生成 checklist.md：

```markdown
# 质量检查清单: addShoppingCart

## Boost 模式检查项（满分 / 25）

### 提案质量
- [x] 背景和动机清晰
- [x] 目标可衡量
- [x] 非目标明确
- [x] 风险已识别并有缓解措施
- [x] 影响范围已评估

### 需求完整性
- [x] 每个目标至少有一个用户故事
- [x] 用户故事格式完整（角色/意图/价值）
- [x] 验收标准可测试
- [x] 功能需求覆盖所有用户故事
- [x] 优先级已标注

### 规格一致性
- [x] US 与 FR 交叉引用一致
- [x] AC 可追踪到 FR
- [x] 无遗漏的需求
- [x] 无矛盾的需求
- [x] 边界情况已识别

### 技术可行性
- [x] API 设计完整
- [x] 数据模型已定义
- [x] 非功能需求可衡量
- [x] 依赖关系清楚
- [x] 无阻塞性开放问题

### 实施就绪
- [x] 需求粒度足以拆分任务
- [x] 验收标准可自动化测试
- [x] 文档间无冲突
- [x] 所有开放问题已关闭或标记为非阻塞
- [x] 具备开始实施的条件

**总分**: 25 / 25
**状态**: ✅ 通过

> 可以执行 `/ss-tasks` 生成任务清单
```

## 步骤 2：生成任务

checklist 通过后，执行：

```
/ss-tasks
```

AI 根据 proposal + spec 生成详细任务：

```markdown
# Tasks: addShoppingCart

## Phase 1: 基础设施
- [ ] 1.1 数据库：创建 carts 表
- [ ] 1.2 数据库：创建 cart_items 表
- [ ] 1.3 后端：Cart 实体和 Repository

## Phase 2: 核心 API
- [ ] 2.1 GET /api/cart 实现
- [ ] 2.2 POST /api/cart/items 实现
- [ ] 2.3 PUT /api/cart/items/:id 实现
- [ ] 2.4 DELETE /api/cart/items/:id 实现

## Phase 3: 优惠券
- [ ] 3.1 POST /api/cart/coupon 实现
- [ ] 3.2 优惠券验证逻辑
- [ ] 3.3 价格计算逻辑

## Phase 4: 前端
- [ ] 4.1 CartPage 组件
- [ ] 4.2 CartItem 组件
- [ ] 4.3 CartSummary 组件
- [ ] 4.4 CouponInput 组件
- [ ] 4.5 Redux 状态管理
- [ ] 4.6 API 集成

## Phase 5: 测试
- [ ] 5.1 API 单元测试
- [ ] 5.2 前端组件测试
- [ ] 5.3 E2E 测试
```

## 步骤 3：执行任务

```
/ss-apply
```

AI 按依赖顺序逐个执行任务，每完成一个标记 ✅。

期间可用 `/ss-validate` 验证 US/FR/AC 交叉引用一致性。

## 步骤 4：完成和归档

所有任务完成后：

```bash
superspec archive addShoppingCart
```

## 增强模式 vs 标准模式

| 方面 | 标准模式 | 增强模式 |
|------|----------|----------|
| 产物 | proposal + checklist + tasks | + spec（支持拆分子 spec）+ design（可选） |
| /ss-create 流程 | proposal → checklist /10 | proposal → spec → [拆分? design?] → checklist /25 |
| 任务粒度 | 灵活 | < 1 小时/任务 |
| 适用 | 简单功能 | 复杂功能 |
| 交叉验证 | — | US↔FR↔AC↔tasks |

## 下一步

- [最佳实践](/zh/guides/best-practices) - 提高效率的技巧
- [配置详解](/zh/api/configuration) - 自定义配置
