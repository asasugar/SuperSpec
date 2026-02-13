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

## 步骤 1：创建变更（增强模式）

```bash
superspec create shoppingCart -b --user jay
```

输出：
```
✓ Created change (boost mode): feature-20260213-shoppingCart-jay
  └── .superspec/changes/feature-20260213-shoppingCart-jay/
      ├── proposal.md
      ├── spec.md      # 增强模式额外产物
      ├── tasks.md
      └── checklist.md # 增强模式额外产物
```

## 步骤 2：编写 Proposal

```markdown
# Proposal: shoppingCart

## 概述
为电商平台实现完整的购物车功能，支持商品管理、优惠计算和库存验证。

## 背景
当前平台没有购物车功能，用户只能单品购买，影响购物体验和转化率。

## 目标
1. 用户可以将商品添加到购物车
2. 支持修改商品数量和删除商品
3. 支持应用优惠券
4. 实时计算价格（含优惠）
5. 下单前验证库存

## 方案概述
- 前端：React + Redux 状态管理
- 后端：RESTful API + Redis 缓存
- 数据库：购物车表 + 购物车项表

## 影响范围
- 前端：新增 Cart 模块
- 后端：cart.controller, cart.service, coupon.service
- 数据库：carts, cart_items 表
```

## 步骤 3：编写 Spec（增强模式核心）

使用 `/ss-clarify` 让 AI 帮助细化规格：

```
/ss-clarify
```

AI 会提问澄清需求，然后填充 spec.md：

```markdown
# Spec: shoppingCart

## 用户故事 (User Stories)

### US-1: 添加商品到购物车
作为 **买家**，
我想要 **将商品添加到购物车**，
以便 **之后一起结算**。

**验收标准：**
- [ ] AC-1.1: 点击"加入购物车"后，商品出现在购物车中
- [ ] AC-1.2: 如果商品已存在，增加数量
- [ ] AC-1.3: 显示成功提示
- [ ] AC-1.4: 购物车图标显示商品数量

### US-2: 修改购物车
作为 **买家**，
我想要 **修改购物车中的商品数量或删除商品**，
以便 **调整购买计划**。

**验收标准：**
- [ ] AC-2.1: 可以增加/减少商品数量
- [ ] AC-2.2: 数量最小为 1
- [ ] AC-2.3: 可以删除商品
- [ ] AC-2.4: 修改后实时更新价格

### US-3: 应用优惠券
作为 **买家**，
我想要 **应用优惠券**，
以便 **获得折扣**。

**验收标准：**
- [ ] AC-3.1: 可以输入优惠券码
- [ ] AC-3.2: 验证优惠券有效性
- [ ] AC-3.3: 显示折扣金额
- [ ] AC-3.4: 无效时显示错误信息

## 功能需求 (Functional Requirements)

### FR-1: 购物车数据结构
```typescript
interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}
```

### FR-2: API 设计
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/cart | 获取购物车 |
| POST | /api/cart/items | 添加商品 |
| PUT | /api/cart/items/:id | 更新数量 |
| DELETE | /api/cart/items/:id | 删除商品 |
| POST | /api/cart/coupon | 应用优惠券 |

### FR-3: 业务规则
1. 单个商品最大数量：99
2. 购物车最大商品种类：50
3. 优惠券只能使用一张
4. 库存不足时提示用户

## 非功能需求

### NFR-1: 性能
- 购物车页面加载 < 1s
- 添加商品响应 < 200ms

### NFR-2: 可用性
- 支持离线浏览购物车（使用本地缓存）
- 登录后自动同步

## 技术设计

### 前端架构
```
src/features/cart/
├── components/
│   ├── CartPage.tsx
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   └── CouponInput.tsx
├── hooks/
│   └── useCart.ts
├── store/
│   └── cartSlice.ts
└── api/
    └── cartApi.ts
```

### 后端架构
```
src/modules/cart/
├── cart.controller.ts
├── cart.service.ts
├── cart.repository.ts
└── dto/
    ├── add-item.dto.ts
    └── update-item.dto.ts
```
```

## 步骤 4：生成检查清单

```
/ss-checklist
```

生成 checklist.md：

```markdown
# Checklist: shoppingCart

## 代码质量
- [ ] 所有新文件 < 300 行
- [ ] 测试覆盖率 > 80%
- [ ] 无 TypeScript 错误
- [ ] 无 ESLint 警告

## 功能验证
- [ ] US-1 所有验收标准通过
- [ ] US-2 所有验收标准通过
- [ ] US-3 所有验收标准通过

## 性能验证
- [ ] 页面加载 < 1s
- [ ] API 响应 < 200ms

## 安全检查
- [ ] 接口已添加认证
- [ ] 参数已验证
- [ ] 无 SQL 注入风险

## 文档
- [ ] API 文档已更新
- [ ] README 已更新
```

## 步骤 5：生成任务

```
/ss-tasks
```

AI 根据 spec.md 生成详细任务：

```markdown
# Tasks: shoppingCart

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

## 进度
- 总任务：17
- 已完成：0
```

## 步骤 6：执行任务

逐个执行任务：

```
/ss-apply 1.1
```

每完成一个任务，更新 checklist：

```
/ss-validate
```

## 步骤 7：完成和归档

所有任务完成且 checklist 全部通过后：

```bash
superspec archive shoppingCart
```

## 增强模式 vs 标准模式

| 方面 | 标准模式 | 增强模式 |
|------|----------|----------|
| 产物 | proposal + tasks | + spec（支持拆分子 spec ）+ design + checklist |
| 时间 | 短 | 长 |
| 适用 | 简单功能 | 复杂功能 |
| 评审 | 可选 | 推荐 |
| 验证 | 基本 | 完整 |

## 总结

增强模式适合：
- 复杂功能开发
- 需要团队评审
- 多个验收标准
- 高质量要求

通过 spec.md 和 checklist.md，确保功能的完整性和质量。

## 下一步

- [最佳实践](/zh/guides/best-practices) - 提高效率的技巧
- [配置详解](/zh/api/configuration) - 自定义配置
