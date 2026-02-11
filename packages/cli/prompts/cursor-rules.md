---
description: SuperSpec - Spec-driven development slash commands
globs: ["**/*"]
alwaysApply: true
---

# SuperSpec Slash Commands

你是一个支持 SuperSpec 规格驱动开发的 AI 助手。以下是你可以使用的 slash commands。

所有 SuperSpec 工件存放在项目根目录的 `superspec/changes/<name>/` 下。

## 配置

读取项目根目录 `superspec.config.json` 获取配置。关键配置项：
- `lang`: 语言 `"zh"` 中文 / `"en"` 英文（影响所有工件和交互语言）
- `specDir`: 规格文件夹名称（默认 `superspec`）
- `boost`: 是否默认启用增强模式
- `artifacts`: 标准工件列表
- `boostArtifacts`: 增强模式工件列表

## /ss:new <name>

创建新的变更。执行 `superspec new <name>` CLI 命令。
如果用户附带 `-b` 参数，执行 `superspec new <name> -b`。

## /ss:proposal

为当前变更生成提案文档。

**流程：**
1. 确认当前工作的变更名称（从最近创建的 changes 子目录判断，或询问用户）
2. 读取 `superspec/changes/<name>/proposal.md` 模板
3. 与用户对话，收集以下信息：
   - 背景：为什么要做这个变更？
   - 目标：要达成什么？
   - 方案概述：高层级的方案是什么？
4. 填充模板，生成完整的 proposal.md
5. 将状态改为 🟢 就绪

## /ss:spec

为当前变更生成规格说明。

**流程：**
1. 读取当前变更的 `proposal.md`，以此为基础
2. 读取 `superspec/changes/<name>/spec.md` 模板
3. 基于 proposal 中的目标和方案，生成：
   - 用户故事（含验收标准）
   - 功能需求（含优先级和依赖）
   - 非功能需求
   - 数据模型（如适用）
   - API 设计（如适用）
   - 边界情况
4. 将状态改为 🟢 就绪

## /ss:tasks

为当前变更生成任务清单。

**流程：**
1. 读取当前变更的 `proposal.md` 和 `spec.md`
2. 读取 `superspec/changes/<name>/tasks.md` 模板
3. 将功能需求拆解为可执行的任务：
   - 按阶段组织（基础设施 → 核心实现 → 集成验证）
   - 标注依赖关系
   - 标注可并行执行的任务 `[P]`
   - 包含具体文件路径
   - 设置检查点
4. 每个任务粒度控制在 2 小时以内
5. 将状态改为 🟢 就绪

## /ss:clarify

启动澄清流程。

**流程：**
1. 读取当前变更的所有已有工件（proposal、spec、tasks）
2. 分析以下维度，逐个提出澄清问题：
   - 模糊或不明确的需求
   - 缺失的边界情况
   - 未定义的行为
   - 潜在的技术约束
   - 依赖和兼容性
3. 用户回答后，记录到 `clarify.md`
4. 将澄清结果同步更新到 proposal/spec/tasks 中
5. 标记已更新的文档

## /ss:apply

执行实现。

**流程：**
1. 读取 `tasks.md`，获取任务清单
2. 按阶段、按依赖顺序执行任务
3. 可并行的任务 `[P]` 尽量并行执行
4. 每完成一个任务，在 tasks.md 中标记为 ✅
5. 每个阶段完成后，执行检查点验证
6. 遇到问题时暂停并向用户报告

## /ss:ff

快速前进 — 一次性生成所有规划文档。

**流程：**
1. 向用户确认变更的目标和范围
2. 按顺序生成：proposal → spec → tasks
3. 如果是增强模式，额外生成 checklist
4. 输出生成结果摘要

## /ss:archive

归档当前变更。执行 `superspec archive <name>` CLI 命令。

## /ss:checklist

仅在增强模式下可用。

**流程：**
1. 读取当前变更的所有工件
2. 逐项检查 `checklist.md` 中的每一条
3. 对通过的项打 ✅，不通过的标注原因
4. 计算总分
5. 给出改进建议

## /ss:status

查看当前变更的状态。

**流程：**
1. 列出 `superspec/changes/` 下的所有变更
2. 对每个变更，读取各工件的状态标记
3. 输出状态摘要表格

## 增强模式 (Boost)

当配置 `boost: true` 或用户使用 `-b` 参数时，启用增强模式：

1. **额外生成 checklist.md** — 质量检查清单
2. **交叉验证** — 在每个工件生成后，自动检查与其他工件的一致性
3. **更详细的 spec** — 包含更多边界情况和非功能需求
4. **任务粒度更细** — 每个任务控制在 1 小时以内
5. **/ss:checklist** 命令可用

## 重要规则

1. 根据 `superspec.config.json` 中的 `lang` 决定工件和交互语言：`"zh"` 使用中文，`"en"` 使用英文
2. 生成前先读取已有内容，避免覆盖用户修改
3. 每个 slash command 执行完后报告结果
4. 始终尊重 `superspec.config.json` 中的配置
5. 工件之间保持引用一致性（如 US-1 在 spec 和 tasks 中一致）
