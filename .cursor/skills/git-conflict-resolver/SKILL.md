---
name: git-conflict-resolver
description: 交互式Git分支合并冲突解决工具集。当用户遇到Git合并冲突、rebase冲突、需要批量处理冲突文件、或需要冲突解决策略建议时使用。核心特性：每次修改前都会征询开发者同意并显示变更预览，确保开发者完全了解每次更改。支持检测冲突文件、分析冲突类型、提供解决建议、以及交互式解决冲突。
---

# Git冲突解决器

自动检测、分析和解决Git分支合并冲突的工具集。

## 快速命令

| 场景 | 命令 |
|------|------|
| 检测冲突 | `python scripts/detect_conflicts.py` |
| 分析冲突 | `python scripts/analyze_conflict.py <file>` |
| 交互式解决 | `python scripts/resolve_conflict_interactive.py <file> <ours\|theirs\|merge>` |
| 批量解决 | `python scripts/batch_resolve_interactive.py` |
| 撤销解决 | `git checkout --conflict=merge <file>` |

## 工作流程

解决Git冲突的标准流程：

1. **检测冲突** - 识别所有冲突文件
2. **分析冲突** - 分析冲突类型和影响范围
3. **选择策略** - 根据冲突类型选择解决策略
4. **确认修改** - **每次修改前都会征询开发者同意，显示变更预览**
5. **解决冲突** - 执行解决操作
6. **验证结果** - 确认冲突已解决

**重要**: 所有冲突解决操作都是交互式的，每次修改前都会：
- 显示变更预览（diff）
- 征询开发者同意
- 只有确认后才应用更改

## 检测冲突

使用 `scripts/detect_conflicts.py` 检测当前仓库中的所有冲突：

```bash
python scripts/detect_conflicts.py
```

脚本会输出：
- 冲突文件列表
- 每个文件的冲突数量
- 冲突区域位置
- 文件统计信息

## 分析冲突

使用 `scripts/analyze_conflict.py` 分析单个冲突文件的详细信息：

```bash
python scripts/analyze_conflict.py <file_path>
```

分析包括：
- 冲突类型识别
- 解决策略建议
- Git提交历史
- 冲突上下文

## 解决策略

根据冲突情况选择策略：

### 交互式解决（推荐）

使用 `scripts/resolve_conflict_interactive.py` 进行交互式解决，每次修改前都会：
- 显示变更预览（diff）
- 征询开发者同意
- 只有确认后才应用更改

```bash
python scripts/resolve_conflict_interactive.py <file> <strategy>
```

策略选项：
- `ours` - 保留当前分支的更改
- `theirs` - 保留目标分支的更改
- `merge` - 智能合并双方更改

### 批量交互式解决

使用 `scripts/batch_resolve_interactive.py` 批量处理多个冲突文件：

```bash
python scripts/batch_resolve_interactive.py
```

脚本会：
1. 检测所有冲突文件
2. 逐个显示冲突详情和建议策略
3. 让开发者选择解决策略
4. 显示变更预览并征询同意
5. 只有确认后才应用更改

### 非交互式解决（不推荐）

使用 `scripts/resolve_conflict.py` 直接解决（不推荐，不会征询同意）：

```bash
python scripts/resolve_conflict.py <file> <strategy>
```

### Manual (手动解决)
复杂的业务逻辑冲突需要手动审查和合并。

1. 打开冲突文件
2. 审查两边的代码
3. 手动合并或重写
4. 删除冲突标记
5. 使用 `git add <file>` 标记为已解决

## 批量处理

对于多个冲突文件，使用交互式批量处理脚本：

```bash
python scripts/batch_resolve_interactive.py
```

流程：
1. 自动检测所有冲突文件
2. 逐个显示冲突详情和建议策略
3. **每次修改前显示变更预览并征询同意**
4. 只有确认后才应用更改
5. 逐个验证处理结果

**重要**: 批量处理也是交互式的，每个文件都会单独确认。

## 常见场景

### 场景1: 合并功能分支到主分支
1. 检测冲突: `python scripts/detect_conflicts.py`
2. 分析主要冲突文件
3. 通常保留功能分支的更改（ours策略）
4. 复杂冲突手动处理

### 场景2: 从主分支更新功能分支
1. 检测冲突
2. 分析冲突文件
3. 通常保留主分支的更改（theirs策略）
4. 合并功能特定的更改

### 场景3: 多个冲突文件
1. 检测所有冲突
2. 按文件类型分组（代码、配置、测试等）
3. 批量处理相同类型的冲突
4. 逐个验证

## 参考文档

- **最佳实践**: 参见 `references/best-practices.md` 了解冲突解决的最佳实践和常见问题
- **冲突模式**: 参见 `references/conflict-patterns.md` 了解常见冲突模式的识别和处理方法

## 交互式确认机制

**核心原则**: 每次修改都需要开发者确认

所有解决脚本都实现了交互式确认：
- ✅ 显示变更预览（diff格式）
- ✅ 征询开发者同意
- ✅ 只有确认后才应用更改
- ✅ 可以随时取消操作

这确保了：
- 开发者完全了解每次更改
- 避免意外修改
- 提高代码质量和安全性

## 注意事项

1. **交互式确认**: 所有修改都会征询同意，请仔细审查变更预览
2. 解决冲突前先备份重要文件
3. 仔细审查每个冲突，不要盲目接受所有更改
4. 解决冲突后运行测试确保功能正常
5. 保持代码质量和风格一致性
6. 在提交信息中说明冲突解决策略
