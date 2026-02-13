---
title: Installation
description: Complete guide to installing SuperSpec
---

# Installation

This guide covers all installation methods for SuperSpec.

## Requirements

- **Node.js**: 18.0.0 or higher
- **Package Manager**: npm, pnpm, or yarn
- **Operating System**: macOS, Linux, or Windows

## Installing the CLI

### Using npm

```bash
npm install -g @superspec/cli
```

### Using pnpm (Recommended)

```bash
pnpm add -g @superspec/cli
```

### Using yarn

```bash
yarn global add @superspec/cli
```

## Verifying Installation

```bash
superspec --version
```

Expected output:
```
@superspec/cli/x.x.x
```

## Initializing a Project

Navigate to your project directory:

```bash
cd your-project
superspec init
```

### Options

```bash
# English templates (default)
superspec init

# Chinese templates
superspec init --lang zh

# Specify AI assistant
superspec init --ai cursor
superspec init --ai claude
```

## Project Structure

After initialization:

```
your-project/
├── .superspec/
│   ├── AGENTS.md           # AI assistant instructions
│   ├── superspec.config.json   # Configuration
│   ├── changes/            # Active changes
│   └── archive/            # Archived changes
├── src/                    # Your source code
└── ...
```

## Updating SuperSpec

```bash
# npm
npm update -g @superspec/cli

# pnpm
pnpm update -g @superspec/cli

# yarn
yarn global upgrade @superspec/cli
```

### Updating Project Templates

```bash
superspec update
```

This refreshes `AGENTS.md` and templates without affecting your changes.

## Troubleshooting

### Command Not Found

If `superspec` command is not found:

1. Verify Node.js is installed:
   ```bash
   node --version
   ```

2. Check global package installation path:
   ```bash
   npm config get prefix
   ```

3. Ensure the path is in your `PATH` environment variable.

### Permission Errors

On macOS/Linux, you might need sudo:

```bash
sudo npm install -g @superspec/cli
```

Or better, configure npm to use a user directory:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Proxy Issues

If behind a corporate proxy:

```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

## Next Steps

- [Quick Start](/en/guides/quickstart) - Get started in 5 minutes
- [Workflow Guide](/en/guides/workflow) - Understand the development workflow
