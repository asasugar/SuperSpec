---
title: FAQ
description: Frequently Asked Questions about SuperSpec
---

# FAQ

## Installation & Configuration

### Q: What Node.js versions does SuperSpec support?

**A:** SuperSpec requires Node.js 18.0.0 or higher. LTS versions are recommended.

```bash
# Check Node.js version
node --version
```

### Q: How do I use SuperSpec in an existing project?

**A:** Simply run the init command in your project root:

```bash
cd your-project
superspec init
```

SuperSpec creates a `superspec/` directory without affecting existing code.

### Q: Which AI coding assistants are supported?

**A:** SuperSpec works with any AI assistant that can read `AGENTS.md`:
- Cursor
- Claude Code
- Qwen
- Qoder
- OpenCode
- CodeBuddy
- Codex

### Q: How do I switch between languages?

**A:** Specify language at initialization:

```bash
# Chinese templates
superspec init --lang zh

# English templates (default)
superspec init --lang en
```

---

## Workflow

### Q: What's the difference between Standard and Boost modes?

**A:**

| Mode | Artifacts | Use Case |
|------|-----------|----------|
| Standard | proposal.md + tasks.md | Simple features, bug fixes |
| Boost | + spec.md + design.md + checklist.md | Complex features, reviews |

```bash
# Standard mode
superspec create myFeature

# Boost mode
superspec create myFeature -b
```

### Q: Why the 300-line file limit?

**A:** Based on AI context window best practices:

- Typical AI context: 8K-128K tokens
- 300 lines ≈ 1.5K tokens
- Leaves room for chat history and code generation

This ensures AI can fully read and understand each file.

### Q: Can I work on multiple changes simultaneously?

**A:** Yes. SuperSpec supports concurrent changes:

```bash
# View all active changes
superspec status

# Changes can have dependencies
superspec deps add featureB featureA
```

---

## Commands

### Q: What's the difference between `/ss-create` and `superspec create`?

**A:** Same functionality, different context:

- `superspec create` - Use in terminal
- `/ss-create` - Use in AI chat (Slash command)

### Q: How do I search historical changes?

**A:** Use the search command:

```bash
# Search changes containing keyword
superspec search "user auth"

# In AI chat
/ss-search user auth
```

### Q: How do I validate spec consistency?

**A:** Use the validate command:

```bash
superspec validate

# Or in AI chat
/ss-validate
```

This checks consistency between proposal, spec, and tasks.

---

## Team Collaboration

### Q: How do I use SuperSpec in a team?

**A:**

1. Version control `superspec/` directory
2. Use consistent naming conventions
3. Review specs via PR
4. Integrate into CI/CD pipeline

See [Team Workflow](/tutorials/team-workflow) for details.

### Q: What if multiple people modify the same change?

**A:** Use Git for conflict resolution:

1. Pull latest: `git pull`
2. Resolve conflicts (usually task status in tasks.md)
3. Keep the latest task status

### Q: How do I use SuperSpec in CI?

**A:** Add lint and validate checks:

```yaml
# .github/workflows/superspec.yml
- run: npm install -g @superspec/cli
- run: superspec lint
- run: superspec validate
```

---

## Troubleshooting

### Q: "command not found" error

**A:** SuperSpec CLI not properly installed:

```bash
# Global install
npm install -g @superspec/cli

# Verify installation
superspec --version
```

### Q: AI doesn't respond to Slash commands

**A:** Ensure:

1. AI assistant supports reading `AGENTS.md` and `<.AINAME>/commands/`
2. Project initialized: `superspec init`
3. `<.AINAME>/commands/` exists with correct content

### Q: lint check fails

**A:** lint checks file line counts. If it fails:

1. See which files exceed limit: `superspec lint`
2. Split large files
3. Remove redundant content

### Q: context.md is too large

**A:** If context.md grows too large:

1. Archive completed changes
2. Clean up unnecessary git changes
3. Re-run `superspec sync`

---

## Other

### Q: Is SuperSpec open source?

**A:** Yes, SuperSpec is MIT licensed and free to use.

### Q: How do I report issues or suggestions?

**A:**

1. GitHub Issues: [Submit issue](https://github.com/asasugar/SuperSpec/issues)
2. Discussions: [GitHub Discussions](https://github.com/asasugar/SuperSpec/discussions)
3. Contribute: See [Contributing Guide](/contributing)

### Q: Does SuperSpec collect user data?

**A:** No. SuperSpec is completely local:

- All data stored in project directory
- No network connection required
- No telemetry data sent

### Q: How do I update SuperSpec?

**A:**

```bash
# npm
npm update -g @superspec/cli

# pnpm
pnpm update -g @superspec/cli

# Update project templates
superspec update
```

---

More questions? Ask on [GitHub Discussions](https://github.com/asasugar/SuperSpec/discussions)!
