# SuperSpec

本项目使用 SuperSpec 进行规格驱动开发。

## 可用命令

| 命令 | 说明 |
|------|------|
| `/ss:new <name>` | 创建新变更 |
| `/ss:proposal` | 生成提案文档 |
| `/ss:spec` | 生成规格说明 |
| `/ss:tasks` | 生成任务清单 |
| `/ss:clarify` | 澄清和确认 |
| `/ss:apply` | 执行实现 |
| `/ss:ff` | 快速前进，一次性生成所有规划文档 |
| `/ss:archive` | 归档已完成变更 |
| `/ss:checklist` | 质量检查（增强模式） |
| `/ss:status` | 查看变更状态 |

## 增强模式

使用 `-b` 参数启用增强模式: `/ss:new <name> -b`

增强模式额外提供：
- 质量检查清单 (checklist)
- 交叉验证
- 更精细的任务拆分

## 工件结构

```
superspec/changes/<name>/
├── proposal.md    — 提案：为什么做、做什么
├── spec.md        — 规格：详细需求和验收标准
├── tasks.md       — 任务：实现步骤和检查点
├── clarify.md     — 澄清：问题记录和决策
└── checklist.md   — 检查清单（增强模式）
```

## 工作流

```
/ss:new → /ss:proposal → /ss:spec → /ss:tasks → /ss:apply → /ss:archive
                   ↕                      ↕
              /ss:clarify            /ss:checklist (boost)
```

## 配置

见 `superspec.config.json`。
