---
title: /ss-search
description: Full-text search change content
---

# /ss-search

Full-text search across all change content.

## Syntax

```
/ss-search <query>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<query>` | Search keyword |

## Options

| Option | Description |
|--------|-------------|
| `--archived` | Include archives |
| `--artifact <type>` | Filter by type |
| `--limit <n>` | Limit results |
| `-E, --regex` | Use regex |

## Examples

```
/ss-search authentication
/ss-search "JWT token" --artifact spec
/ss-search "user\d+" -E
```
