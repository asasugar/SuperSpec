---
title: /ss-resume
description: 恢复 spec 上下文
---

# /ss-resume

恢复之前的 spec 上下文，用于 Vibe Coding。

## 语法

```
/ss-resume
```

## 参数

此命令没有参数。

## AI 行为

执行此命令后，AI 会：

1. 运行 `superspec sync` 更新 context.md
2. 读取 context.md
3. 读取相关 artifacts（proposal, spec, tasks 等）
4. 理解当前进度和状态
5. 从中断处继续工作

## 使用场景

### 新对话继续

```
# 第一个对话
/ss-apply
AI: 完成任务 1, 2, 3...
# 对话结束

# 新对话
/ss-resume
AI: 恢复上下文，继续任务 4, 5...
```

### 长时间中断后

```
# 早上
/ss-apply
AI: 完成部分任务...
# 去开会

# 下午
/ss-resume
AI: 继续未完成的任务...
```

### 跨设备

```
# 设备 A
/ss-apply
git commit && git push

# 设备 B
git pull
/ss-resume
```

## 恢复的内容

AI 会恢复以下上下文：

- 变更概述和目标
- 当前完成的任务
- 未完成的任务
- 代码更改（git diff）
- 相关决策和澄清

## 注意事项

- 确保代码已提交或保存
- 如果有冲突，先解决冲突再 resume
- context.md 会自动更新
