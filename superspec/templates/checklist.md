---
name: {{name}}
status: draft
strategy: {{strategy}}
depends_on: []
---

# Quality Checklist: {{name}}

> Created: {{date}}

<!-- Use Standard checks (after proposal) or Boost checks (after spec). AI selects based on mode. -->

## Standard Mode Checks (after proposal, score / 10)

### Proposal Quality

- [ ] Background and motivation are clear
- [ ] Goals are measurable
- [ ] Non-goals are explicit
- [ ] Risks identified with mitigations
- [ ] Impact scope assessed

### Requirements & Technical Solution

- [ ] Requirements are specific and splittable into tasks
- [ ] Boundary conditions identified
- [ ] Technical solution is concrete (modules/files specified)
- [ ] Dependencies are clear
- [ ] No blocking open questions (or marked non-blocking)

---

## Boost Mode Checks (after spec, score / 25)

### Requirements Completeness

- [ ] All user stories have clear acceptance criteria
- [ ] Functional requirements cover all user stories
- [ ] Non-functional requirements defined (performance, security, compatibility)
- [ ] Edge cases identified and documented
- [ ] Data model changes described

### Proposal Quality

- [ ] Background and motivation are clear
- [ ] Goals are measurable
- [ ] Non-goals are explicit
- [ ] Risks identified with mitigations
- [ ] Impact scope assessed

### Spec Consistency

- [ ] Spec aligns with proposal goals
- [ ] User stories cover all proposal goals
- [ ] Acceptance criteria are testable
- [ ] No contradicting requirements
- [ ] Dependencies are clear

### Task Executability

- [ ] Task granularity is reasonable (each < 2h)
- [ ] Dependencies are correct
- [ ] Parallel tasks marked correctly
- [ ] File paths specified
- [ ] Checkpoints are reasonable

### Cross Validation

- [ ] proposal → spec: All goals have corresponding requirements
- [ ] spec → tasks: All requirements have corresponding tasks
- [ ] tasks → spec: No tasks beyond spec scope
- [ ] clarify → all: All clarifications reflected in documents

### Implementation Readiness

- [ ] Technical approach is feasible
- [ ] No blocking dependencies
- [ ] Open questions resolved (or marked non-blocking)
- [ ] Team consensus on approach

---

**Score**: _ / _
**Status**: 🟡 Pending Review
