---
title: 贡献指南
description: 了解如何为 SuperSpec 项目做贡献
---

# 贡献指南

感谢你对 SuperSpec 的关注！我们欢迎各种形式的贡献。

## 贡献方式

### 1. 报告问题

如果你发现了 Bug 或有功能建议：

1. 先搜索 [现有 Issues](https://github.com/asasugar/SuperSpec/issues)，避免重复
2. 创建新 Issue，使用合适的模板
3. 提供尽可能详细的信息

**Bug 报告应包含：**
- SuperSpec 版本
- Node.js 版本
- 操作系统
- 复现步骤
- 期望行为 vs 实际行为

### 2. 参与讨论

- [GitHub Discussions](https://github.com/asasugar/SuperSpec/discussions) - 提问和讨论
- 帮助回答其他用户的问题

### 3. 改进文档

文档贡献非常有价值：

- 修正错误和拼写
- 改进示例代码
- 添加更多用例说明
- 翻译文档

### 4. 提交代码

修复 Bug 或添加新功能。

## 开发环境设置

### 前置条件

- Node.js 18+
- pnpm 8+
- Git

### 克隆仓库

```bash
git clone https://github.com/asasugar/SuperSpec.git
cd SuperSpec
```

### 安装依赖

```bash
pnpm install
```

### 构建项目

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

### 本地链接

```bash
# 在 packages/cli 目录
cd packages/cli
pnpm link --global

# 验证
superspec --version
```

## 项目结构

```
SuperSpec/
├── packages/
│   └── cli/              # CLI 工具主包
│       ├── src/
│       │   ├── commands/ # 命令实现
│       │   ├── utils/    # 工具函数
│       │   └── index.ts  # 入口
│       └── templates/    # 模板文件
│           ├── en/       # 英文模板
│           └── zh/       # 中文模板
├── docs/                 # 文档站点
└── examples/             # 示例项目
```

## 贡献流程

### 1. Fork 仓库

点击 GitHub 上的 Fork 按钮。

### 2. 创建分支

```bash
git checkout -b feature/my-feature
# 或
git checkout -b fix/my-fix
```

**分支命名规范：**
- `feature/xxx` - 新功能
- `fix/xxx` - Bug 修复
- `docs/xxx` - 文档更新
- `refactor/xxx` - 重构

### 3. 开发

进行你的修改，确保：

- 遵循代码风格
- 添加必要的测试
- 更新相关文档

### 4. 提交

```bash
git add .
git commit -m "feat: add new feature"
```

**提交消息规范：**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型 (type):**
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档
- `style` - 格式调整
- `refactor` - 重构
- `test` - 测试
- `chore` - 构建/工具

**示例：**
```
feat(cli): add sync command

Add the sync command to save git changes to context.md
for Vibe Coding support.

Closes #123
```

### 5. 推送

```bash
git push origin feature/my-feature
```

### 6. 创建 Pull Request

1. 前往你的 Fork 仓库
2. 点击 "New Pull Request"
3. 选择目标分支（通常是 `main`）
4. 填写 PR 描述

**PR 描述应包含：**
- 变更说明
- 关联的 Issue
- 测试方法
- 截图（如有 UI 变更）

## 代码风格

### TypeScript

- 使用 ESLint 配置
- 使用 Prettier 格式化
- 严格的 TypeScript 类型

```bash
# 检查代码风格
pnpm lint

# 自动修复
pnpm lint:fix
```

### 命名规范

- 文件名：kebab-case（`my-command.ts`）
- 类名：PascalCase（`MyCommand`）
- 函数/变量：camelCase（`myFunction`）
- 常量：UPPER_SNAKE_CASE（`MAX_LINE_COUNT`）

### 注释

- 公共 API 必须有 JSDoc
- 复杂逻辑添加行内注释
- 使用英文注释

```typescript
/**
 * Creates a new change with the specified name.
 * @param name - The name of the change
 * @param options - Creation options
 * @returns The created change object
 */
export function createChange(name: string, options: CreateOptions): Change {
  // Validate name format
  if (!isValidName(name)) {
    throw new Error('Invalid change name');
  }
  // ...
}
```

## 测试

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定测试
pnpm test -- --grep "create command"

# 覆盖率报告
pnpm test:coverage
```

### 编写测试

- 每个新功能需要对应的测试
- Bug 修复需要添加回归测试
- 测试文件命名：`*.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { createChange } from '../src/commands/create';

describe('create command', () => {
  it('should create a change with valid name', () => {
    const result = createChange('myFeature', {});
    expect(result.name).toBe('myFeature');
  });
});
```

## 发布流程

维护者负责发布。使用 Changesets 管理版本：

```bash
# 添加 changeset
pnpm changeset

# 版本更新
pnpm changeset version

# 发布
pnpm changeset publish
```

## 行为准则

请阅读我们的 [行为准则](https://github.com/asasugar/SuperSpec/blob/main/CODE_OF_CONDUCT.md)，我们期望所有贡献者遵守。

核心原则：
- 尊重他人
- 建设性沟通
- 包容多样性

## 获得帮助

- 开发问题：[GitHub Discussions](https://github.com/asasugar/SuperSpec/discussions)
- Bug 报告：[GitHub Issues](https://github.com/asasugar/SuperSpec/issues)

感谢你的贡献！
