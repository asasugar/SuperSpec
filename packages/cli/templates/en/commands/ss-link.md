---
name: /ss-link
id: ss-link
category: SuperSpec
description: Add spec dependency
---
<!-- SUPERSPEC:START -->
**Steps**
1. Run `superspec deps add <name> --on <other>`
2. This updates the frontmatter: `depends_on: [other]`
3. Verify: `superspec deps list <name>`
<!-- SUPERSPEC:END -->
