---
title: Complex Feature
description: Building complex features with Boost mode
---

# Complex Feature Development

This tutorial demonstrates building a complex feature using Boost mode.

## Scenario

We're building a **shopping cart** for an e-commerce platform:
- Add/remove items
- Modify quantities
- Apply coupons
- Check inventory
- Calculate prices

## Why Boost Mode?

| Scenario | Standard | Boost |
|----------|----------|-------|
| Simple feature | ✓ | - |
| Complex feature | - | ✓ |
| Needs review | - | ✓ |
| Team collaboration | - | ✓ |
| Many acceptance criteria | - | ✓ |

Shopping cart is complex with many acceptance criteria—perfect for Boost mode.

## Step 1: Create Change (Boost Mode)

```bash
superspec create shoppingCart -b
```

Output:
```
✓ Created change (boost mode): feature-20260213-shoppingCart-jay
  └── .superspec/changes/feature-20260213-shoppingCart-jay/
      ├── proposal.md
      ├── spec.md      # Boost mode artifact
      ├── tasks.md
      └── checklist.md # Boost mode artifact
```

## Step 2: Write Proposal

```markdown
# Proposal: shoppingCart

## Overview
Implement complete shopping cart with item management,
coupon application, and inventory validation.

## Background
Platform currently lacks cart functionality, users can
only buy single items, affecting conversion.

## Goals
1. Add items to cart
2. Modify quantities and remove items
3. Apply coupons
4. Real-time price calculation
5. Inventory validation before checkout
```

## Step 3: Write Spec (Boost Mode Core)

Use `/ss-clarify` to refine requirements:

```
/ss-clarify
```

AI asks clarifying questions, then fills spec.md:

```markdown
# Spec: shoppingCart

## User Stories

### US-1: Add to Cart
As a **buyer**,
I want to **add items to cart**,
So that **I can checkout later**.

**Acceptance Criteria:**
- [ ] AC-1.1: Click "Add to Cart" adds item
- [ ] AC-1.2: If item exists, increase quantity
- [ ] AC-1.3: Show success notification
- [ ] AC-1.4: Update cart badge count

### US-2: Modify Cart
As a **buyer**,
I want to **modify cart items**,
So that **I can adjust my purchase**.

**Acceptance Criteria:**
- [ ] AC-2.1: Can increase/decrease quantity
- [ ] AC-2.2: Minimum quantity is 1
- [ ] AC-2.3: Can remove items
- [ ] AC-2.4: Price updates in real-time

## Functional Requirements

### FR-1: Data Structure
```typescript
interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  couponCode?: string;
}

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}
```

### FR-2: API Design
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/cart | Get cart |
| POST | /api/cart/items | Add item |
| PUT | /api/cart/items/:id | Update quantity |
| DELETE | /api/cart/items/:id | Remove item |
| POST | /api/cart/coupon | Apply coupon |
```

## Step 4: Generate Checklist

```
/ss-checklist
```

Generates checklist.md:

```markdown
# Checklist: shoppingCart

## Code Quality
- [ ] All new files < 300 lines
- [ ] Test coverage > 80%
- [ ] No TypeScript errors
- [ ] No ESLint warnings

## Functional Validation
- [ ] All US-1 acceptance criteria pass
- [ ] All US-2 acceptance criteria pass

## Performance
- [ ] Page load < 1s
- [ ] API response < 200ms

## Security
- [ ] Endpoints require auth
- [ ] Input validated
- [ ] No SQL injection risk
```

## Step 5: Generate Tasks

```
/ss-tasks
```

AI generates detailed tasks from spec.md:

```markdown
# Tasks: shoppingCart

## Phase 1: Infrastructure
- [ ] 1.1 Database: Create carts table
- [ ] 1.2 Database: Create cart_items table
- [ ] 1.3 Backend: Cart entity and repository

## Phase 2: Core API
- [ ] 2.1 GET /api/cart implementation
- [ ] 2.2 POST /api/cart/items
- [ ] 2.3 PUT /api/cart/items/:id
- [ ] 2.4 DELETE /api/cart/items/:id

## Phase 3: Coupons
- [ ] 3.1 POST /api/cart/coupon
- [ ] 3.2 Coupon validation logic
- [ ] 3.3 Price calculation logic

## Phase 4: Frontend
- [ ] 4.1 CartPage component
- [ ] 4.2 CartItem component
- [ ] 4.3 CartSummary component
- [ ] 4.4 State management
- [ ] 4.5 API integration

## Phase 5: Testing
- [ ] 5.1 API unit tests
- [ ] 5.2 Component tests
- [ ] 5.3 E2E tests
```

## Step 6: Execute Tasks

Implement tasks:

```
/ss-apply 1.1
```

Validate checklist periodically:

```
/ss-validate
```

## Step 7: Archive

When complete and checklist passes:

```bash
superspec archive shoppingCart
```

## Summary

Boost mode is ideal for:
- Complex feature development
- Team review requirements
- Multiple acceptance criteria
- High quality requirements

Through spec.md and checklist.md, ensure completeness and quality.

## Next Steps

- [Best Practices](/en/guides/best-practices) - Efficiency tips
- [Configuration](/en/api/configuration) - Custom configuration
