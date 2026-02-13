---
layout: home

hero:
  name: SuperSpec
  text: 规格驱动开发工具
  tagline: 为 AI 编码助手设计的 SDD 工具，帮助开发者产出一致、有文档的代码
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guides/quickstart
    - theme: alt
      text: GitHub
      link: https://github.com/asasugar/SuperSpec

features:
  - icon: 📦
    title: 上下文经济
    details: 每个 artifact 控制在 300 行以内，最大化 AI 上下文窗口利用率
  - icon: 🔄
    title: 双模式工作流
    details: 标准模式快速迭代，增强模式完整规格，灵活适应不同场景
  - icon: 🎯
    title: 上下文恢复支持
    details: sync + resume 无缝恢复上下文，跨会话保持工作状态
  - icon: 🤖
    title: 多 AI 支持
    details: 支持 Cursor、Claude Code、Qwen、Qoder 等主流 AI 编码助手
---

## 快速安装

```bash
# npm
npm install -g @superspec/cli

# pnpm
pnpm add -g @superspec/cli

# yarn
yarn global add @superspec/cli
```

::: tip 环境要求
需要 Node.js >= 18.0.0
:::

## 初始化项目

```bash
cd your-project

superspec init                  # 默认（英文模板）
superspec init --lang zh        # 中文模板
superspec init --ai claude      # 指定 AI 助手类型
```

## 核心流程

```
标准模式:  create (proposal → checklist ✓) → tasks → apply → [vibe: sync → resume] → archive
增强模式:  create -b (proposal → spec → [auto: split? design?] → checklist ✓) → tasks → apply → [vibe: sync → resume] → archive
```

**标准模式** — proposal + checklist + tasks。Proposal 为需求+技术方案，checklist 在 proposal 后 /10。

**增强模式** — proposal（需求背景）+ spec（US/FR/AC）+ 可选 design + checklist /25。适合大功能、需要设计评审。

## 下一步

- [快速开始指南](/zh/guides/quickstart) - 详细的入门教程
- [CLI 命令参考](/zh/cli/) - 所有 CLI 命令详解
- [Slash 命令](/zh/slash-commands/) - AI Agent 命令参考
- [配置详解](/zh/api/configuration) - 配置文件说明
