---
name: deploy-gh-pages
description: "Deploy static documentation (VitePress/VuePress/etc.) to GitHub Pages. Use when the user wants to: (1) deploy docs to GitHub Pages, (2) set up GitHub Actions for automatic doc deployment, (3) publish a static site to gh-pages branch, or mentions keywords like 部署文档, deploy docs, GitHub Pages, gh-pages, 发布文档."
---

# Deploy to GitHub Pages

Two deployment strategies available, choose based on user's needs.

## Strategy 1: GitHub Actions (recommended)

Automatic deployment on push to master. Uses GitHub's native Pages deployment.

1. Copy `assets/deploy-docs.yml` to `.github/workflows/deploy-docs.yml`
2. Adjust the workflow if needed:
   - `paths` filter: match the docs directory
   - `working-directory`: match the docs build directory
   - `path` in upload step: match the build output directory
   - `branches`: match the trigger branch
3. Ensure GitHub repo Settings → Pages → Source is set to "GitHub Actions"

### VitePress base path

If the repo name is NOT `<username>.github.io`, add `base` to VitePress config:

```ts
export default defineConfig({
  base: '/<repo-name>/'
})
```

## Strategy 2: Manual deploy script

Push build output directly to gh-pages branch.

1. Run `scripts/deploy.sh [docs-dir] [branch] [remote]`
   - `docs-dir`: docs directory path (default: `docs`)
   - `branch`: target branch (default: `gh-pages`)
   - `remote`: git remote (default: `origin`)
2. Set GitHub repo Settings → Pages → Source to "Deploy from a branch" → select `gh-pages`

## Troubleshooting

- **404 after deploy**: Check `base` config matches repo name
- **Build fails**: Ensure `pnpm install` runs in docs directory first
- **Permission denied**: Ensure GitHub Actions has write permissions (Settings → Actions → General → Workflow permissions)
