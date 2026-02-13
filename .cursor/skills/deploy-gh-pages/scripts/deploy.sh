#!/usr/bin/env bash
set -euo pipefail

DOCS_DIR="${1:-docs}"
BRANCH="${2:-gh-pages}"
REMOTE="${3:-origin}"

if [ ! -d "$DOCS_DIR" ]; then
  echo "❌ docs 目录不存在: $DOCS_DIR"
  exit 1
fi

echo "📦 构建 VitePress 文档..."
cd "$DOCS_DIR"

if [ -f "package.json" ]; then
  if command -v pnpm &>/dev/null; then
    pnpm install --frozen-lockfile 2>/dev/null || pnpm install
    pnpm build
  elif command -v npm &>/dev/null; then
    npm ci 2>/dev/null || npm install
    npx vitepress build
  fi
else
  npx vitepress build
fi

DIST_DIR=".vitepress/dist"
if [ ! -d "$DIST_DIR" ]; then
  echo "❌ 构建产物不存在: $DIST_DIR"
  exit 1
fi

cd "$DIST_DIR"

echo "🚀 部署到 $REMOTE/$BRANCH..."
git init
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

REMOTE_URL=$(cd "$OLDPWD/.." && git remote get-url "$REMOTE")
git push -f "$REMOTE_URL" "HEAD:$BRANCH"

echo "✅ 部署完成！"
echo "   分支: $BRANCH"
echo "   请在 GitHub 仓库 Settings → Pages 中选择 $BRANCH 分支作为 Source"
