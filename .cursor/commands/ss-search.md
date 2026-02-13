---
name: /ss-search
id: ss-search
category: SuperSpec
description: Full-text search across changes
---
<!-- SUPERSPEC:START -->
**Input Parsing Rules**

From user input, extract: **search query**, **optional flags**.

| Extract | Rule | Example |
|---------|------|---------|
| Search query | Remaining text after removing flags | `/ss-search user auth` → query=`user auth` |
| Include archived | `--archived`/`archived`/`include archived`/`all` → add `--archived` | `/ss-search auth --archived`; `/ss-search auth archived` |
| Filter type | `--artifact <type>`/`type:<type>` → add `--artifact <type>`; type: `proposal`/`spec`/`tasks`/`clarify`/`checklist` | `/ss-search auth --artifact spec`; `/ss-search auth type:proposal` |

**Steps**
1. Parse user input → extract search query and flags
2. Run `superspec search "<query>" [--archived] [--artifact <type>]`
<!-- SUPERSPEC:END -->
