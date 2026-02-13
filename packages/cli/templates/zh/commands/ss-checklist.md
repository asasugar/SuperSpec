---
name: /ss-checklist
id: ss-checklist
category: SuperSpec
description: 质量门检查（Standard: proposal 后 / Boost: spec 后）
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Standard 和 Boost 模式均可使用
- `/ss-create` 流程中会自动调用；也可手动随时调用

**Steps**
1. 读取所有已有 artifacts（proposal.md, spec.md 等）
2. 读取 `{specDir}/templates/checklist.md` 作为**结构参考**
3. 判断模式：Standard → 使用 Standard 检查项（满分 10）；Boost → 使用 Boost 检查项（满分 25）
4. 如果 checklist.md 不存在 → **直接生成**（包含真实评估结果）
5. 如果 checklist.md 已存在 → 读取并更新评估结果
6. 验证每个检查项，标注通过/失败
7. 不通过 → 报告失败项，建议修复方向
8. 通过 → 提示可执行 /ss-tasks（或 /ss-apply）
<!-- SUPERSPEC:END -->
