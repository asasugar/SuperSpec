---
title: Spec-Driven Development (SDD)
description: Understanding the core philosophy of Spec-Driven Development
---

# Spec-Driven Development (SDD)

Spec-Driven Development (SDD) is the core philosophy behind SuperSpec, transforming how we collaborate with AI coding assistants.

## What is SDD?

SDD is a development methodology that emphasizes defining specifications before writing code. Unlike the traditional "code first, document later" approach, SDD requires:

1. **Define specs first**: Before writing any code, clearly define what to do, why to do it, and what success looks like
2. **Specs drive implementation**: Let specification documents guide code implementation
3. **Implementation validates specs**: After completion, verify that the implementation matches the specification

## Why Does the AI Era Need SDD?

AI coding assistants (like Cursor, Claude Code) can generate code quickly, but also bring new challenges:

### Problem 1: Context Loss

AI context windows are limited; in long conversations, previous discussions are easily "forgotten."

**SDD Solution**: Record key information in specification documents, recoverable at any time.

### Problem 2: Requirement Drift

Without clear specs, AI may implement based on its own interpretation, deviating from original requirements.

**SDD Solution**: proposal and spec provide a clear requirement baseline.

### Problem 3: Inconsistent Code

Multiple conversations may produce code with inconsistent styles.

**SDD Solution**: Unified artifacts and workflows ensure consistency.

### Problem 4: Difficult Reuse

Valuable decisions and discussions are scattered across chat history, making reuse difficult.

**SDD Solution**: clarify.md records decisions for future reference.

## SDD Workflow

```
Requirements → Proposal → Spec → Tasks → Implementation → Validation → Archive
                ↓          ↓       ↓         ↓                ↓
              proposal    spec   tasks      code           validate
```

Each stage has a corresponding artifact, forming a complete documentation chain.

## SDD and Agile Development

SDD is not a return to the waterfall model—it adds necessary structure within an agile framework:

| Agile Principle | SDD Implementation |
|-----------------|-------------------|
| Respond to change | `/ss-clarify` records changes |
| Working software | Phased tasks, frequent delivery |
| Customer collaboration | proposal gets confirmation |
| Simplicity | First principles, minimal documentation |

## Practicing SDD with SuperSpec

SuperSpec provides a complete SDD toolchain:

1. **proposal.md**: Records change proposals
2. **spec.md**: Defines detailed specifications (Boost mode)
3. **tasks.md**: Breaks down into executable tasks
4. **clarify.md**: Records clarifications and decisions
5. **context.md**: Supports context restoration

With these tools, you can have structured, traceable collaboration with AI assistants.
