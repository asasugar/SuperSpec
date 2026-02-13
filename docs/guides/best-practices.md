---
title: 最佳实践
description: 高效使用 SuperSpec 的技巧和建议
---

# 最佳实践

本文档总结了高效使用 SuperSpec 的最佳实践和技巧。

## 第一性原则

SuperSpec 基于以下第一性原则设计，理解这些原则有助于更好地使用工具：

| # | 原则 | 规则 |
|---|------|------|
| I | 上下文经济 | 每个 artifact < 300 行，硬限 400 行 |
| II | 信噪比 | 每个句子必须提供决策信息 |
| III | 意图优于实现 | 关注为什么和什么，不关注怎么做 |
| IV | 渐进式披露 | 从最小开始，仅在需要时扩展 |
| V | 必备内容 | 元数据、问题、方案、成功标准、权衡 |

## 选择正确的模式

### 使用标准模式

适合以下场景：
- Bug 修复
- 简单功能添加
- 配置更改
- 小型重构
- 快速原型

```bash
superspec create fix-bug
superspec create add-button
superspec create update-config
```

### 使用增强模式

适合以下场景：
- 复杂功能开发
- 需要设计评审的变更
- 跨团队协作
- 需要完整文档的项目
- 重要的架构变更

```bash
superspec create add-user-auth -b
superspec create redesign-dashboard -b
superspec create implement-caching -b
```

### 使用创造模式

适合以下场景：
- 探索新架构
- 尝试新技术栈
- 重大重构
- 创新功能设计

```bash
superspec create new-architecture -c
superspec create explore-graphql -b -c
```

## Artifact 编写技巧

### proposal.md

**好的做法：**
- 简明扼要描述问题
- 清晰定义成功标准
- 列出关键权衡

**避免：**
- 过多实现细节
- 冗长的背景介绍
- 模糊的成功标准

### spec.md（增强模式）

**好的做法：**
- 用户故事使用 "作为...我想要...以便..." 格式
- 功能需求具体可测试
- 验收标准可量化

**避免：**
- 重复 proposal 内容
- 过于技术化的描述
- 缺乏验收标准

### tasks.md

**好的做法：**
- 每个任务 < 1 小时工作量
- 使用 `[P]` 标记可并行任务
- 按依赖关系排序

**避免：**
- 任务太大（应该拆分）
- 任务太小（合并类似任务）
- 缺乏明确的完成条件

## 依赖管理

### 建立依赖关系

当一个变更依赖另一个时，使用依赖管理：

```bash
# 添加依赖
superspec deps add add-user-auth --on setup-database

# 查看依赖
superspec deps list add-user-auth

# 移除依赖
superspec deps remove add-user-auth --on setup-database
```

### 依赖最佳实践

1. **最小化依赖**: 只添加真正必要的依赖
2. **避免循环依赖**: A → B → A 会导致问题
3. **及时更新**: 完成依赖项后更新依赖状态

## 团队协作

### 命名约定

使用一致的变更命名：

```bash
# 功能
superspec create add-dark-mode --intent-type feature

# 修复
superspec create fix-login-crash --intent-type bugfix

# 重构
superspec create refactor-auth-module --intent-type refactor
```

### 分支模板

配置团队统一的分支模板：

```json
{
  "branchPrefix": "", // 默认为''
  "branchTemplate": "{prefix}{intentType}-{date}-{feature}-{user}"
}
```

### 代码评审

在评审时检查：
1. proposal 是否清晰
2. tasks 是否合理拆分
3. 实现是否符合 spec

## 搜索和发现

### 高效搜索

```bash
# 搜索活跃变更
superspec search "authentication"

# 包含归档
superspec search "login" --archived

# 按 artifact 类型过滤
superspec search "JWT" --artifact spec

# 使用正则表达式
superspec search "user\d+" -E
```

### 状态监控

```bash
# 查看所有变更状态
superspec status

# 列出变更名称（用于脚本）
superspec list
superspec list --archived
```

## 质量控制

### 定期检查

```bash
# 检查 artifact 大小
superspec lint

# 验证一致性
superspec validate

# 增强模式：检查依赖
superspec validate --check-deps
```

### CI/CD 集成

在 CI 流程中添加检查：

```yaml
# .github/workflows/spec-check.yml
- name: Lint specs
  run: superspec lint

- name: Validate specs
  run: superspec validate --check-deps
```

## 常见问题

### Q: artifact 超过行数限制怎么办？

1. 拆分成多个变更
2. 精简内容，移除非必要信息
3. 使用 `/ss-specs` 命令自动拆分

### Q: 如何处理需求变更？

1. 使用 `/ss-clarify` 记录澄清
2. 更新 proposal/spec
3. 重新生成 tasks

### Q: 多人协作时如何避免冲突？

1. 每人负责不同的变更
2. 使用依赖管理明确顺序
3. 频繁同步和沟通
