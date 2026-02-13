---
title: CLI 命令参考
description: SuperSpec 命令行工具完整参考
---

# CLI 命令参考

SuperSpec CLI 提供了一套完整的命令来管理规格驱动开发工作流。

## 命令概览

### 初始化与设置

| 命令 | 说明 |
|------|------|
| [`init`](/zh/cli/init) | 初始化 SuperSpec 到当前项目 |
| [`update`](/zh/cli/update) | 刷新 agent 指令和模板 |

### 核心工作流

| 命令 | 说明 |
|------|------|
| [`create`](/zh/cli/create) | 创建变更并生成 proposal |
| [`archive`](/zh/cli/archive) | 归档已完成的变更 |

### 质量与验证

| 命令 | 说明 |
|------|------|
| [`lint`](/zh/cli/lint) | 检查 artifact 行数是否超限 |
| [`validate`](/zh/cli/validate) | 交叉验证 artifact 一致性 |

### 搜索与发现

| 命令 | 说明 |
|------|------|
| [`search`](/zh/cli/search) | 全文搜索变更内容 |
| [`status`](/zh/cli/status) | 查看所有变更状态 |

### 依赖管理

| 命令 | 说明 |
|------|------|
| [`deps list`](/zh/cli/deps) | 查看依赖关系 |
| [`deps add`](/zh/cli/deps) | 添加 spec 依赖 |
| [`deps remove`](/zh/cli/deps) | 移除 spec 依赖 |

### Vibe Coding

| 命令 | 说明 |
|------|------|
| [`sync`](/zh/cli/sync) | 同步 git 变更到 context.md |

## 全局选项

所有命令都支持以下全局选项：

```bash
superspec --version    # 显示版本号
superspec --help       # 显示帮助信息
superspec <command> --help    # 显示特定命令的帮助
```

## 命令分类

### 按使用频率

**日常使用：**
- `create` - 开始新变更
- `status` - 查看状态
- `sync` - 同步上下文
- `archive` - 归档变更

**定期使用：**
- `lint` - 检查大小限制
- `validate` - 验证一致性
- `search` - 搜索内容

**偶尔使用：**
- `init` - 项目初始化
- `update` - 更新模板
- `deps` - 依赖管理

### 按工作流阶段

**开始阶段：**
1. `init` - 初始化项目
2. `create` - 创建变更

**开发阶段：**
3. `lint` - 检查限制
4. `validate` - 验证一致性
5. `sync` - 同步上下文
6. `deps` - 管理依赖

**完成阶段：**
7. `archive` - 归档变更

## 退出码

| 退出码 | 含义 |
|--------|------|
| 0 | 成功 |
| 1 | 一般错误 |

## 配置文件

CLI 命令会读取 `superspec.config.json` 配置文件。详见[配置详解](/zh/api/configuration)。
