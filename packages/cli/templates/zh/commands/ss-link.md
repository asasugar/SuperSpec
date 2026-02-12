---
name: /ss-link
id: ss-link
category: SuperSpec
description: 添加 spec 依赖
---
<!-- SUPERSPEC:START -->
**Steps**
1. 运行 `superspec deps add <name> --on <other>`
2. 这会更新 frontmatter: `depends_on: [other]`
3. 验证: `superspec deps list <name>`
<!-- SUPERSPEC:END -->
