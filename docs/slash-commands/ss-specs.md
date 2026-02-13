---
title: /ss-specs
description: 自动拆分大 spec
---

# /ss-specs

当 spec 过大时，自动拆分为多个较小的 spec。

## 语法

```
/ss-specs
```

## AI 行为

执行此命令后，AI 会：

1. 检查当前 spec 大小
2. 识别可拆分的边界
3. 建议拆分方案
4. 创建多个子变更

## 使用场景

- spec.md 超过 400 行
- 功能范围过大
- 需要分阶段交付

## 示例

```
你: /ss-specs

AI: spec.md 当前 450 行，建议拆分为：
    1. add-user-auth-core (200 行)
       - 基本认证逻辑
    2. add-user-auth-oauth (150 行)
       - OAuth 集成
    3. add-user-auth-2fa (100 行)
       - 双因素认证

    是否确认拆分？
```

## 拆分原则

- 每个子 spec < 300 行
- 保持功能内聚
- 明确依赖关系
- 可独立交付
