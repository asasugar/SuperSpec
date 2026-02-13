import { defineConfig } from 'vitepress'

// 中文侧边栏
const zhSidebar = {
  '/guides/': [
    {
      text: '入门指南',
      items: [
        { text: '快速开始', link: '/guides/quickstart' },
        { text: '安装', link: '/guides/installation' },
        { text: '工作流程', link: '/guides/workflow' },
        { text: 'Vibe Coding', link: '/guides/vibe-coding' },
        { text: '最佳实践', link: '/guides/best-practices' }
      ]
    }
  ],
  '/why/': [
    {
      text: '为什么选择 SuperSpec',
      items: [
        { text: '概述', link: '/why/' },
        { text: '与其他工具对比', link: '/why/comparison' },
        { text: '设计理念', link: '/why/philosophy' }
      ]
    }
  ],
  '/tutorials/': [
    {
      text: '教程',
      items: [
        { text: '概述', link: '/tutorials/' },
        { text: '第一个 Spec', link: '/tutorials/first-spec' },
        { text: '团队协作', link: '/tutorials/team-workflow' },
        { text: '复杂功能开发', link: '/tutorials/complex-feature' }
      ]
    }
  ],
  '/concepts/': [
    {
      text: '核心概念',
      items: [
        { text: '规格驱动开发', link: '/concepts/sdd' },
        { text: '首要原则', link: '/concepts/first-principles' },
        { text: '工作模式', link: '/concepts/modes' },
        { text: '产物系统', link: '/concepts/artifacts' },
        { text: '策略选择', link: '/concepts/strategy' }
      ]
    }
  ],
  '/cli/': [
    {
      text: 'CLI 命令',
      items: [
        { text: '概览', link: '/cli/' },
        { text: 'init', link: '/cli/init' },
        { text: 'create', link: '/cli/create' },
        { text: 'archive', link: '/cli/archive' },
        { text: 'update', link: '/cli/update' },
        { text: 'lint', link: '/cli/lint' },
        { text: 'validate', link: '/cli/validate' },
        { text: 'search', link: '/cli/search' },
        { text: 'deps', link: '/cli/deps' },
        { text: 'status', link: '/cli/status' },
        { text: 'sync', link: '/cli/sync' }
      ]
    }
  ],
  '/slash-commands/': [
    {
      text: 'Slash 命令',
      items: [
        { text: '概览', link: '/slash-commands/' },
        { text: '/ss-create', link: '/slash-commands/ss-create' },
        { text: '/ss-tasks', link: '/slash-commands/ss-tasks' },
        { text: '/ss-apply', link: '/slash-commands/ss-apply' },
        { text: '/ss-resume', link: '/slash-commands/ss-resume' },
        { text: '/ss-archive', link: '/slash-commands/ss-archive' },
        { text: '/ss-clarify', link: '/slash-commands/ss-clarify' },
        { text: '/ss-checklist', link: '/slash-commands/ss-checklist' },
        { text: '/ss-lint', link: '/slash-commands/ss-lint' },
        { text: '/ss-validate', link: '/slash-commands/ss-validate' },
        { text: '/ss-search', link: '/slash-commands/ss-search' },
        { text: '/ss-link', link: '/slash-commands/ss-link' },
        { text: '/ss-deps', link: '/slash-commands/ss-deps' },
        { text: '/ss-status', link: '/slash-commands/ss-status' },
        { text: '/ss-specs', link: '/slash-commands/ss-specs' }
      ]
    }
  ],
  '/api/': [
    {
      text: 'API 参考',
      items: [
        { text: '配置', link: '/api/configuration' },
        { text: '模板', link: '/api/templates' },
        { text: '产物', link: '/api/artifacts' }
      ]
    }
  ],
  '/faq': [
    {
      text: '常见问题',
      items: [
        { text: 'FAQ', link: '/faq' }
      ]
    }
  ],
  '/contributing': [
    {
      text: '贡献',
      items: [
        { text: '贡献指南', link: '/contributing' }
      ]
    }
  ]
}

// 英文侧边栏
const enSidebar = {
  '/en/guides/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Quick Start', link: '/en/guides/quickstart' },
        { text: 'Installation', link: '/en/guides/installation' },
        { text: 'Workflow', link: '/en/guides/workflow' },
        { text: 'Vibe Coding', link: '/en/guides/vibe-coding' },
        { text: 'Best Practices', link: '/en/guides/best-practices' }
      ]
    }
  ],
  '/en/why/': [
    {
      text: 'Why SuperSpec',
      items: [
        { text: 'Overview', link: '/en/why/' },
        { text: 'Comparison', link: '/en/why/comparison' },
        { text: 'Philosophy', link: '/en/why/philosophy' }
      ]
    }
  ],
  '/en/tutorials/': [
    {
      text: 'Tutorials',
      items: [
        { text: 'Overview', link: '/en/tutorials/' },
        { text: 'Your First Spec', link: '/en/tutorials/first-spec' },
        { text: 'Team Workflow', link: '/en/tutorials/team-workflow' },
        { text: 'Complex Feature', link: '/en/tutorials/complex-feature' }
      ]
    }
  ],
  '/en/concepts/': [
    {
      text: 'Core Concepts',
      items: [
        { text: 'Spec-Driven Development', link: '/en/concepts/sdd' },
        { text: 'First Principles', link: '/en/concepts/first-principles' },
        { text: 'Work Modes', link: '/en/concepts/modes' },
        { text: 'Artifacts', link: '/en/concepts/artifacts' },
        { text: 'Strategy', link: '/en/concepts/strategy' }
      ]
    }
  ],
  '/en/cli/': [
    {
      text: 'CLI Commands',
      items: [
        { text: 'Overview', link: '/en/cli/' },
        { text: 'init', link: '/en/cli/init' },
        { text: 'create', link: '/en/cli/create' },
        { text: 'archive', link: '/en/cli/archive' },
        { text: 'update', link: '/en/cli/update' },
        { text: 'lint', link: '/en/cli/lint' },
        { text: 'validate', link: '/en/cli/validate' },
        { text: 'search', link: '/en/cli/search' },
        { text: 'deps', link: '/en/cli/deps' },
        { text: 'status', link: '/en/cli/status' },
        { text: 'sync', link: '/en/cli/sync' }
      ]
    }
  ],
  '/en/slash-commands/': [
    {
      text: 'Slash Commands',
      items: [
        { text: 'Overview', link: '/en/slash-commands/' },
        { text: '/ss-create', link: '/en/slash-commands/ss-create' },
        { text: '/ss-tasks', link: '/en/slash-commands/ss-tasks' },
        { text: '/ss-apply', link: '/en/slash-commands/ss-apply' },
        { text: '/ss-resume', link: '/en/slash-commands/ss-resume' },
        { text: '/ss-archive', link: '/en/slash-commands/ss-archive' },
        { text: '/ss-clarify', link: '/en/slash-commands/ss-clarify' },
        { text: '/ss-checklist', link: '/en/slash-commands/ss-checklist' },
        { text: '/ss-lint', link: '/en/slash-commands/ss-lint' },
        { text: '/ss-validate', link: '/en/slash-commands/ss-validate' },
        { text: '/ss-search', link: '/en/slash-commands/ss-search' },
        { text: '/ss-link', link: '/en/slash-commands/ss-link' },
        { text: '/ss-deps', link: '/en/slash-commands/ss-deps' },
        { text: '/ss-status', link: '/en/slash-commands/ss-status' },
        { text: '/ss-specs', link: '/en/slash-commands/ss-specs' }
      ]
    }
  ],
  '/en/api/': [
    {
      text: 'API Reference',
      items: [
        { text: 'Configuration', link: '/en/api/configuration' },
        { text: 'Templates', link: '/en/api/templates' },
        { text: 'Artifacts', link: '/en/api/artifacts' }
      ]
    }
  ],
  '/en/faq': [
    {
      text: 'FAQ',
      items: [
        { text: 'FAQ', link: '/en/faq' }
      ]
    }
  ],
  '/en/contributing': [
    {
      text: 'Contributing',
      items: [
        { text: 'Contributing Guide', link: '/en/contributing' }
      ]
    }
  ]
}

export default defineConfig({
  title: 'SuperSpec',
  description: 'Spec-Driven Development tool for AI coding assistants',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: 'AI 编码助手的规格驱动开发 (SDD) 工具',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guides/quickstart' },
          { text: '为什么选择', link: '/why/' },
          { text: '教程', link: '/tutorials/' },
          { text: 'CLI', link: '/cli/' },
          { text: 'Slash 命令', link: '/slash-commands/' },
          {
            text: '更多',
            items: [
              { text: 'API 参考', link: '/api/configuration' },
              { text: 'FAQ', link: '/faq' },
              { text: '贡献指南', link: '/contributing' }
            ]
          }
        ],
        sidebar: zhSidebar,
        outline: {
          label: '页面导航',
          level: [2, 3]
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        lastUpdated: {
          text: '最后更新于'
        },
        editLink: {
          pattern: 'https://github.com/asasugar/SuperSpec/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页面'
        },
        footer: {
          message: '基于 MIT 许可发布',
          copyright: 'Copyright © 2024-present SuperSpec'
        },
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Spec-Driven Development tool for AI coding assistants',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guides/quickstart' },
          { text: 'Why SuperSpec', link: '/en/why/' },
          { text: 'Tutorials', link: '/en/tutorials/' },
          { text: 'CLI', link: '/en/cli/' },
          { text: 'Slash Commands', link: '/en/slash-commands/' },
          {
            text: 'More',
            items: [
              { text: 'API Reference', link: '/en/api/configuration' },
              { text: 'FAQ', link: '/en/faq' },
              { text: 'Contributing', link: '/en/contributing' }
            ]
          }
        ],
        sidebar: enSidebar,
        outline: {
          label: 'On this page',
          level: [2, 3]
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },
        lastUpdated: {
          text: 'Last updated'
        },
        editLink: {
          pattern: 'https://github.com/asasugar/SuperSpec/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        footer: {
          message: 'Released under the MIT License',
          copyright: 'Copyright © 2024-present SuperSpec'
        }
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/asasugar/SuperSpec' }
    ],
    search: {
      provider: 'local'
    }
  }
})
