import { defineConfig } from 'vitepress';

// 中文侧边栏
const zhSidebar = {
  '/zh/guides/': [
    {
      text: '入门指南',
      items: [
        { text: '快速开始', link: '/zh/guides/quickstart' },
        { text: '安装', link: '/zh/guides/installation' },
        { text: '工作流程', link: '/zh/guides/workflow' },
        { text: '上下文恢复流程', link: '/zh/guides/in-context-learning' },
        { text: '最佳实践', link: '/zh/guides/best-practices' }
      ]
    }
  ],
  '/zh/why/': [
    {
      text: '为什么选择 SuperSpec',
      items: [
        { text: '概述', link: '/zh/why/' },
        { text: '与其他工具对比', link: '/zh/why/comparison' },
        { text: '设计理念', link: '/zh/why/philosophy' }
      ]
    }
  ],
  '/zh/tutorials/': [
    {
      text: '教程',
      items: [
        { text: '概述', link: '/zh/tutorials/' },
        { text: '第一个 Spec', link: '/zh/tutorials/first-spec' },
        { text: '团队协作', link: '/zh/tutorials/team-workflow' },
        { text: '复杂功能开发', link: '/zh/tutorials/complex-feature' }
      ]
    }
  ],
  '/zh/concepts/': [
    {
      text: '核心概念',
      items: [
        { text: '规格驱动开发', link: '/zh/concepts/sdd' },
        { text: '首要原则', link: '/zh/concepts/first-principles' },
        { text: '工作模式', link: '/zh/concepts/modes' },
        { text: '产物系统', link: '/zh/concepts/artifacts' },
        { text: '策略选择', link: '/zh/concepts/strategy' }
      ]
    }
  ],
  '/zh/cli/': [
    {
      text: 'CLI 命令',
      items: [
        { text: '概览', link: '/zh/cli/' },
        { text: 'init', link: '/zh/cli/init' },
        { text: 'create', link: '/zh/cli/create' },
        { text: 'archive', link: '/zh/cli/archive' },
        { text: 'update', link: '/zh/cli/update' },
        { text: 'lint', link: '/zh/cli/lint' },
        { text: 'validate', link: '/zh/cli/validate' },
        { text: 'search', link: '/zh/cli/search' },
        { text: 'deps', link: '/zh/cli/deps' },
        { text: 'status', link: '/zh/cli/status' },
        { text: 'sync', link: '/zh/cli/sync' }
      ]
    }
  ],
  '/zh/slash-commands/': [
    {
      text: 'Slash 命令',
      items: [
        { text: '概览', link: '/zh/slash-commands/' },
        { text: '/ss-create', link: '/zh/slash-commands/ss-create' },
        { text: '/ss-tasks', link: '/zh/slash-commands/ss-tasks' },
        { text: '/ss-apply', link: '/zh/slash-commands/ss-apply' },
        { text: '/ss-resume', link: '/zh/slash-commands/ss-resume' },
        { text: '/ss-archive', link: '/zh/slash-commands/ss-archive' },
        { text: '/ss-clarify', link: '/zh/slash-commands/ss-clarify' },
        { text: '/ss-checklist', link: '/zh/slash-commands/ss-checklist' },
        { text: '/ss-lint', link: '/zh/slash-commands/ss-lint' },
        { text: '/ss-validate', link: '/zh/slash-commands/ss-validate' },
        { text: '/ss-search', link: '/zh/slash-commands/ss-search' },
        { text: '/ss-link', link: '/zh/slash-commands/ss-link' },
        { text: '/ss-deps', link: '/zh/slash-commands/ss-deps' },
        { text: '/ss-status', link: '/zh/slash-commands/ss-status' },
        { text: '/ss-specs', link: '/zh/slash-commands/ss-specs' }
      ]
    }
  ],
  '/zh/api/': [
    {
      text: 'API 参考',
      items: [
        { text: '配置', link: '/zh/api/configuration' },
        { text: '模板', link: '/zh/api/templates' },
        { text: '产物', link: '/zh/api/artifacts' }
      ]
    }
  ],
  '/zh/faq': [
    {
      text: '常见问题',
      items: [{ text: 'FAQ', link: '/zh/faq' }]
    }
  ],
  '/zh/contributing': [
    {
      text: '贡献',
      items: [{ text: '贡献指南', link: '/zh/contributing' }]
    }
  ]
};

// 英文侧边栏
const enSidebar = {
  '/guides/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Quick Start', link: '/guides/quickstart' },
        { text: 'Installation', link: '/guides/installation' },
        { text: 'Workflow', link: '/guides/workflow' },
        { text: 'In-Context Learning', link: '/guides/in-context-learning' },
        { text: 'Best Practices', link: '/guides/best-practices' }
      ]
    }
  ],
  '/why/': [
    {
      text: 'Why SuperSpec',
      items: [
        { text: 'Overview', link: '/why/' },
        { text: 'Comparison', link: '/why/comparison' },
        { text: 'Philosophy', link: '/why/philosophy' }
      ]
    }
  ],
  '/tutorials/': [
    {
      text: 'Tutorials',
      items: [
        { text: 'Overview', link: '/tutorials/' },
        { text: 'Your First Spec', link: '/tutorials/first-spec' },
        { text: 'Team Workflow', link: '/tutorials/team-workflow' },
        { text: 'Complex Feature', link: '/tutorials/complex-feature' }
      ]
    }
  ],
  '/concepts/': [
    {
      text: 'Core Concepts',
      items: [
        { text: 'Spec-Driven Development', link: '/concepts/sdd' },
        { text: 'First Principles', link: '/concepts/first-principles' },
        { text: 'Work Modes', link: '/concepts/modes' },
        { text: 'Artifacts', link: '/concepts/artifacts' },
        { text: 'Strategy', link: '/concepts/strategy' }
      ]
    }
  ],
  '/cli/': [
    {
      text: 'CLI Commands',
      items: [
        { text: 'Overview', link: '/cli/' },
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
      text: 'Slash Commands',
      items: [
        { text: 'Overview', link: '/slash-commands/' },
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
      text: 'API Reference',
      items: [
        { text: 'Configuration', link: '/api/configuration' },
        { text: 'Templates', link: '/api/templates' },
        { text: 'Artifacts', link: '/api/artifacts' }
      ]
    }
  ],
  '/faq': [
    {
      text: 'FAQ',
      items: [{ text: 'FAQ', link: '/faq' }]
    }
  ],
  '/contributing': [
    {
      text: 'Contributing',
      items: [{ text: 'Contributing Guide', link: '/contributing' }]
    }
  ]
};

export default defineConfig({
  title: 'SuperSpec',
  description: 'Spec-Driven Development tool for AI coding assistants',

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: 'Spec-Driven Development tool for AI coding assistants',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guides/quickstart' },
          { text: 'Why SuperSpec', link: '/why/' },
          { text: 'Tutorials', link: '/tutorials/' },
          { text: 'CLI', link: '/cli/' },
          { text: 'Slash Commands', link: '/slash-commands/' },
          {
            text: 'More',
            items: [
              { text: 'API Reference', link: '/api/configuration' },
              { text: 'FAQ', link: '/faq' },
              { text: 'Contributing', link: '/contributing' }
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
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh',
      description: 'AI 编码助手的规格驱动开发 (SDD) 工具',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guides/quickstart' },
          { text: '为什么选择', link: '/zh/why/' },
          { text: '教程', link: '/zh/tutorials/' },
          { text: 'CLI', link: '/zh/cli/' },
          { text: 'Slash 命令', link: '/zh/slash-commands/' },
          {
            text: '更多',
            items: [
              { text: 'API 参考', link: '/zh/api/configuration' },
              { text: 'FAQ', link: '/zh/faq' },
              { text: '贡献指南', link: '/zh/contributing' }
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
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/asasugar/SuperSpec' }],
    search: {
      provider: 'local'
    }
  }
});
