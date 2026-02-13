---
title: Contributing
description: How to contribute to SuperSpec
---

# Contributing Guide

Thank you for your interest in SuperSpec! We welcome all contributions.

## Ways to Contribute

### 1. Report Issues

If you find a bug or have a feature suggestion:

1. Search [existing Issues](https://github.com/asasugar/SuperSpec/issues) first
2. Create new Issue using appropriate template
3. Provide as much detail as possible

**Bug reports should include:**
- SuperSpec version
- Node.js version
- Operating system
- Steps to reproduce
- Expected vs actual behavior

### 2. Join Discussions

- [GitHub Discussions](https://github.com/asasugar/SuperSpec/discussions)
- Help answer other users' questions

### 3. Improve Documentation

Documentation contributions are valuable:

- Fix errors and typos
- Improve code examples
- Add more use cases
- Translate documentation

### 4. Submit Code

Fix bugs or add new features.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Clone Repository

```bash
git clone https://github.com/asasugar/SuperSpec.git
cd SuperSpec
```

### Install Dependencies

```bash
pnpm install
```

### Build Project

```bash
pnpm build
```

### Run Tests

```bash
pnpm test
```

### Local Link

```bash
# In packages/cli directory
cd packages/cli
pnpm link --global

# Verify
superspec --version
```

## Project Structure

```
SuperSpec/
├── packages/
│   └── cli/              # Main CLI package
│       ├── src/
│       │   ├── commands/ # Command implementations
│       │   ├── utils/    # Utility functions
│       │   └── index.ts  # Entry point
│       └── templates/    # Template files
│           ├── en/       # English templates
│           └── zh/       # Chinese templates
├── docs/                 # Documentation site
└── examples/             # Example projects
```

## Contribution Process

### 1. Fork Repository

Click Fork button on GitHub.

### 2. Create Branch

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/my-fix
```

**Branch naming:**
- `feature/xxx` - New features
- `fix/xxx` - Bug fixes
- `docs/xxx` - Documentation
- `refactor/xxx` - Refactoring

### 3. Develop

Make your changes, ensuring:

- Follow code style
- Add necessary tests
- Update relevant docs

### 4. Commit

```bash
git add .
git commit -m "feat: add new feature"
```

**Commit message format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Refactoring
- `test` - Testing
- `chore` - Build/tools

### 5. Push

```bash
git push origin feature/my-feature
```

### 6. Create Pull Request

1. Go to your fork
2. Click "New Pull Request"
3. Select target branch (usually `main`)
4. Fill in PR description

**PR description should include:**
- Change description
- Related Issue
- Testing method
- Screenshots (if UI changes)

## Code Style

### TypeScript

- Use ESLint configuration
- Use Prettier for formatting
- Strict TypeScript types

```bash
# Check code style
pnpm lint

# Auto-fix
pnpm lint:fix
```

### Naming Conventions

- Files: kebab-case (`my-command.ts`)
- Classes: PascalCase (`MyCommand`)
- Functions/variables: camelCase (`myFunction`)
- Constants: UPPER_SNAKE_CASE (`MAX_LINE_COUNT`)

## Testing

### Run Tests

```bash
# Run all tests
pnpm test

# Run specific tests
pnpm test -- --grep "create command"

# Coverage report
pnpm test:coverage
```

### Write Tests

- New features need corresponding tests
- Bug fixes need regression tests
- Test files: `*.test.ts`

## Code of Conduct

Please read our [Code of Conduct](https://github.com/asasugar/SuperSpec/blob/main/CODE_OF_CONDUCT.md).

Core principles:
- Respect others
- Constructive communication
- Embrace diversity

## Getting Help

- Development questions: [GitHub Discussions](https://github.com/asasugar/SuperSpec/discussions)
- Bug reports: [GitHub Issues](https://github.com/asasugar/SuperSpec/issues)

Thank you for contributing!
