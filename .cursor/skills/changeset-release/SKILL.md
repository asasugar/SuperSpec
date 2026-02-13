---
name: changeset-release
description: "Manage npm package releases using @changesets/cli in a pnpm monorepo. Use when the user wants to: (1) create a changeset, (2) bump/update package versions, (3) build and publish to npm, (4) check pending changeset status, (5) perform a full release workflow, or mentions keywords like 发布, 版本, changeset, release, publish, bump version."
---

# Changeset Release

Manage the full release lifecycle for this pnpm monorepo using `@changesets/cli`.

## Project Context

- Monorepo root: project root with `pnpm-workspace.yaml`
- Package manager: **pnpm**
- Packages: `packages/cli` → `@superspec/cli`
- Changeset config: `.changeset/config.json` (access: public, baseBranch: master)
- NPM auth: user-level `~/.npmrc` with token

## Commands Reference

| Action | Command |
|---|---|
| Create changeset | `pnpm changeset` |
| Bump versions | `pnpm changeset:version` |
| Build + Publish | `pnpm release` |

## Workflows

### 1. Create Changeset

Create a `.changeset/*.md` file describing the change.

```bash
pnpm changeset
```

This is interactive. When automating, create the file directly:

```bash
# Generate a random changeset filename
CHANGESET_ID=$(node -e "console.log(Math.random().toString(36).slice(2,10))")

cat > .changeset/${CHANGESET_ID}.md << 'EOF'
---
"@superspec/cli": patch
---

<changeset summary here>
EOF
```

Bump type selection:
- **patch**: bug fixes, minor tweaks
- **minor**: new features, non-breaking changes
- **major**: breaking changes

### 2. Check Pending Changesets

List all pending changeset files (excluding config.json and README.md):

```bash
ls .changeset/*.md 2>/dev/null | grep -v README.md
```

If no files found → nothing pending, no version bump needed.

To view content:

```bash
for f in .changeset/*.md; do
  [[ "$(basename "$f")" == "README.md" ]] && continue
  echo "=== $f ==="
  cat "$f"
  echo
done
```

### 3. Version Bump

Consume pending changesets and update package versions + CHANGELOG:

```bash
pnpm changeset:version
```

This will:
- Read all pending `.changeset/*.md` files
- Update `package.json` version fields
- Update/create `CHANGELOG.md` in each affected package
- Delete consumed changeset files

After version bump, review changes:

```bash
git diff packages/*/package.json packages/*/CHANGELOG.md
```

### 4. Publish to npm

Build all packages and publish to npm registry:

```bash
pnpm release
```

This runs `pnpm build && changeset publish`.

Prerequisites:
- NPM token configured in `~/.npmrc`
- Versions already bumped (step 3)
- Clean working tree recommended

### 5. Git Tag & Push

After successful publish, tag and push:

```bash
git add .
git commit -m "release: v$(node -p "require('./packages/cli/package.json').version")"
git tag "v$(node -p "require('./packages/cli/package.json').version")"
git push && git push --tags
```

### 6. Full Release Flow (End-to-End)

Complete sequence for a release:

1. Ensure all changes are committed
2. Check pending changesets exist → if not, create one
3. `pnpm changeset:version` → bump versions
4. Review version changes
5. `pnpm release` → build + publish
6. Git commit + tag + push

## Troubleshooting

- **"No unpublished changesets"**: No `.changeset/*.md` files → create one first
- **"npm ERR! 403"**: Token expired or missing → check `~/.npmrc`
- **"npm ERR! 402"**: Package requires paid org → check package `access` in changeset config
- **Build fails before publish**: Fix build errors first, `pnpm release` runs build before publish
