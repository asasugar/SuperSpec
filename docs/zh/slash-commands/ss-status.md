---
title: /ss-status
description: 查看所有变更状态
---

# /ss-status

查看所有活跃变更及其状态。

## 语法

```
/ss-status
```

## AI 行为

AI 会运行 `superspec status` 显示所有变更的状态。

## 输出示例

```
◆ 活跃变更

add-user-auth (增强模式)
  proposal.md   ✓ Ready
  spec.md       ✓ Ready
  tasks.md      ◐ In Progress

fix-login-bug (标准模式)
  proposal.md   ✓ Ready
  tasks.md      ○ Draft

3 个活跃变更
```
