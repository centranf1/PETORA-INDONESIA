---
title: Navigation Structure
document_id: PET-DOC-0704
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['information-architecture.md']
---

# Navigation Structure

Navigation follows the role's daily tasks and current scope. Menu visibility is a usability affordance only; APIs and RLS still authorize each action.

## Sidebar

Group core items by domain: Dashboard; Organization & Access; Customers & Pets; Catalog & Sales; Inventory & Purchasing; Booking & Services; Clinical & Pharmacy; Workforce; Finance & Accounting; Reports & Communication; Settings & Integrations. The actual feature list and routes are role-filtered using effective permissions. Do not remove direct URL/API checks when hiding menu items.

## Topbar

Show current organization and branch context, scoped search, notifications/task inbox, user/session actions, and a branch selector only for users with multiple permitted branches. Context changes require clear confirmation if an unsaved operation exists and clear/refetch protected cache. Do not show unavailable branch names through the selector.

## Responsive

On small viewport, use labeled drawer navigation and retain page title/scope/action. Avoid icon-only controls without accessible labels/tooltips. Keep POS, clinic queue, and booking calendar actions usable with touch/keyboard; no content may be obscured by sticky top/bottom bars.

## Navigation States

Include active route, pending task badge when backed by authorized query, loading shell, no-permission state, no-branch assignment/setup state, and session-expired state. Notification badge count is not a substitute for an accessible task list.

