# PETORA - Integrated Petshop & Pet Care Management System

## Status
- **Documentation Status**: Draft baseline
- **Implementation Status**: Foundation scaffolded (not production-ready)
- **Last Updated**: 2026-11-06

## Overview
PETORA is an integrated management system for petshops, veterinary clinics, grooming services, pet hotels, and pet care operations.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + RLS + Edge Functions)
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS with custom theme

## Project Structure
```
src/
├── app/
│   ├── routes/           # Route definitions
│   └── providers/        # Context providers (Auth, Theme, Supabase)
├── features/             # Feature-based modules
│   ├── sales/            # POS and sales management
│   ├── inventory/        # Stock and warehouse management
│   ├── clinic/           # Veterinary and medical records
│   ├── finance/          # Finance and accounting
│   ├── reports/          # Reports and analytics
│   ├── settings/         # System settings
│   ├── customers/        # Customer and pet management
│   ├── products/         # Product catalog
│   ├── purchasing/       # Supplier and purchasing
│   ├── hr/               # HR, attendance, payroll
│   └── notifications/    # Notification templates
├── shared/
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts
│   └── utils/            # Utility functions
├── services/
│   ├── api/              # API client and hooks
│   └── queryKeys.ts      # Query key definitions
├── types/                # TypeScript type definitions
├── hooks/                # Custom hooks
├── lib/                  # Libraries and utilities
├── pages/                # Page components
├── routes/               # Route components
├── styles/               # Global styles
└── tests/                # Test files
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for backend)

### Installation
```bash
npm install
```

### Configuration
1. Copy `.env.example` to `.env`
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Run database migrations:
```bash
# Apply migrations to Supabase
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Testing
```bash
npm run test
```

## Database Migrations
Migrations are located in `supabase/migrations/`:
- `001_core_identity.sql` - Organizations, branches, users, roles, permissions
- `002_customers_products_inventory.sql` - Customers, pets, products, inventory, suppliers
- `003_sales_payments.sql` - Sales transactions, payments, refunds
- `004_bookings_clinical.sql` - Bookings, medical records, prescriptions, pharmacy
- `005_hr_finance.sql` - Staff, attendance, payroll, finance, accounting
- `006_settings_audit.sql` - System settings, audit logs, notifications
- `007_tenant_integrity.sql` - Composite foreign keys that prevent cross-organization references

## Key Features (P0 Priority)
1. **Authentication & Authorization** - Supabase Auth with role-based access control
2. **Customer & Pet Management** - Customer profiles, pet records, ownership history
3. **Product & Inventory** - Product catalog, stock management, batch tracking
4. **POS & Sales** - Transaction processing, payment handling, refunds
5. **Medical Records** - Clinical documentation, prescriptions, pharmacy
6. **System Settings** - Dynamic configuration with approval workflow

## Documentation
See `docs/` directory for detailed documentation:
- `README.md` - Product overview
- `docs/README.md` - Documentation index
- `docs/01-product/` - Product requirements
- `docs/02-business-analysis/` - Business rules and workflows
- `docs/03-architecture/` - Architecture decisions
- `docs/04-database/` - Database design
- `docs/05-backend/` - Backend specifications
- `docs/06-frontend/` - Frontend architecture
- `docs/08-security/` - Security architecture
- `docs/12-development-standards/` - Development standards
- `docs/13-traceability/` - Traceability matrix

## License
Internal use only