MASTER PROMPT — PETORA COMPLETE DOCUMENTATION & SPECIFICATION GENERATOR

1. ROLE AND OBJECTIVE

Act as a Senior System Analyst, Product Manager, Business Analyst, Software Architect, Database Architect, UI/UX Architect, Security Architect, QA Engineer, DevOps Engineer, and Technical Documentation Specialist.

Your task is to analyze the existing PETORA project and create a complete, professional, implementation-ready documentation package for the PETORA system.

PETORA is a comprehensive Petshop and Pet Care Management System designed for a single business organization with multiple branches.

The documentation must be detailed enough to serve as the primary reference for:

- Business stakeholders
- Product owners
- System analysts
- UI/UX designers
- Frontend developers
- Backend developers
- Database engineers
- QA engineers
- DevOps engineers
- System administrators
- Future maintenance teams

Do not immediately start writing files without inspecting the existing repository and documentation.

First understand the current project, existing documents, folder structure, application architecture, technologies, and business requirements.

---

2. SOURCE OF TRUTH AND PROJECT RULES

Use the following priority when resolving conflicting information:

1. Explicit PETORA requirements in this prompt.
2. Existing approved PETORA documentation in the repository.
3. Existing application implementation and database structure.
4. Reasonable industry-standard assumptions.

If conflicting requirements are discovered:

- Do not silently choose one.
- Record the conflict in a dedicated documentation file.
- Explain the impact.
- Propose a recommended resolution.
- Mark decisions that require stakeholder approval.

Do not invent confirmed business policies, pricing, tax rules, accounting methods, or operational procedures.

When information is not available, label it clearly as:

- ASSUMPTION
- PROPOSED
- TBD
- REQUIRES BUSINESS CONFIRMATION

Maintain consistency across every document.

---

3. PETORA BUSINESS CONTEXT

3.1 Product Identity

Product Name: PETORA

Product Type: Petshop, Pet Care, Veterinary, and Multi-Branch Business Management System.

Application Type:

- Responsive Web Application
- Accessible through desktop, laptop, tablet, and smartphone browsers
- Not a native Android application
- Not a native iOS application

Business Architecture:

- Single business organization
- Multiple operational branches
- Centralized database
- Centralized management
- Branch-level operational data
- Cross-branch reporting based on user permissions

PETORA is NOT a multi-tenant SaaS platform.

Do not introduce tenant_id, tenant isolation, or tenant-based subscription architecture unless explicitly required by a future approved decision.

3.2 Business Scope

PETORA must support the following business operations:

1. Petshop retail sales
2. Point of Sale (POS)
3. Product management
4. Inventory management
5. Warehouse management
6. Purchasing
7. Supplier management
8. Customer management
9. Pet management
10. Grooming services
11. Pet hotel / boarding
12. Daycare
13. Veterinary services
14. Medical records
15. Pharmacy and medicine management
16. Booking and appointment management
17. Home grooming
18. Pet transportation
19. Membership
20. Loyalty points
21. Promotions and discounts
22. Staff management
23. Attendance
24. Staff commissions
25. Finance
26. Accounting
27. Consignment management
28. Customer portal
29. Notifications
30. Reporting and analytics
31. Branch management
32. System configuration
33. Integration management
34. User and permission management
35. Audit logs

These modules must be analyzed individually and documented with their dependencies and relationships.

---

4. USER ROLES AND ACCESS CONTROL

PETORA has four protected system roles:

1. SUPER ADMIN
2. ADMIN
3. DOKTER
4. CUSTOMER

These four roles must always exist.

Their protected system identity must not be deleted or replaced by ordinary role management operations.

4.1 Dynamic RBAC

Super Admin must be able to:

- Create custom roles.
- Edit custom roles.
- Configure permissions.
- Assign users to roles.
- Configure module access.
- Configure action-level permissions.
- Configure branch access.
- Configure data visibility scope.
- Configure approval permissions.
- Configure export permissions.
- Configure sensitive data access.

The system must use dynamic Role-Based Access Control (RBAC).

Permissions must not be hardcoded individually into frontend pages.

4.2 Permission Structure

Analyze and document permissions using action-level granularity, including:

- view
- create
- edit
- delete
- approve
- reject
- cancel
- process
- export
- print
- manage
- configure

Permission scope must support:

- Global access
- All branches
- Assigned branches
- Own records
- Assigned records
- Customer-owned records

4.3 Security Requirements

All authorization must be validated on the backend.

Hiding a menu or button in the frontend is not sufficient security.

Customer users must only access their own:

- Profile
- Pets
- Bookings
- Orders
- Payments
- Medical records, subject to approved access policy
- Membership
- Loyalty points
- Notifications

Document all role-permission relationships and branch-level access rules.

---

5. SYSTEM MODULES TO DOCUMENT

Create complete functional documentation for every module below.

A. Core System

- Authentication
- User Management
- Role Management
- Permission Management
- Branch Management
- System Settings
- Integration Settings
- Audit Logs
- Notification Management

B. Customer and Pet

- Customer Management
- Pet Management
- Customer Portal
- Pet Medical History
- Membership
- Loyalty Points

C. Retail and Inventory

- Product Management
- Product Categories
- Product Variants
- Product Units
- Product Pricing
- POS
- Sales
- Returns
- Discounts
- Inventory
- Stock Adjustment
- Stock Transfer
- Warehouse
- Purchasing
- Purchase Orders
- Goods Receiving
- Supplier Management
- Consignment

D. Pet Care Services

- Grooming
- Home Grooming
- Pet Hotel
- Daycare
- Booking
- Appointment Scheduling
- Pet Transportation
- Service Packages

E. Veterinary

- Veterinary Management
- Doctor Schedule
- Consultation
- Diagnosis
- Treatment
- Prescription
- Medical Records
- Vaccination
- Pharmacy
- Medicine Inventory
- Medicine Expiration
- Medical History

F. Human Resources

- Employee Management
- Staff Roles
- Attendance
- Work Schedules
- Leave Management
- Commissions
- Payroll-related integration or configuration, if applicable

G. Finance and Reporting

- Cash Management
- Payment Management
- Expenses
- Income
- Accounts Payable
- Accounts Receivable
- Accounting
- Financial Reports
- Sales Reports
- Inventory Reports
- Service Reports
- Staff Performance Reports
- Branch Performance Reports
- Customer Reports

For each module, identify:

- Purpose
- Actors
- Permissions
- Main features
- Sub-features
- Input fields
- Validation rules
- Business rules
- Workflows
- Statuses
- Notifications
- Database entities
- API requirements
- Related modules
- Error scenarios
- Acceptance criteria

---

6. THIRD-PARTY INTEGRATION ARCHITECTURE

PETORA must support configurable third-party integrations.

Examples:

- Payment gateways
- Email services
- WhatsApp services
- SMS providers
- Shipping and delivery providers
- Accounting services
- External systems
- Other future integrations

Super Admin must be able to manage supported integrations from the frontend.

The architecture must use an integration connector / adapter pattern.

Document:

- Integration registry
- Provider configuration
- Credentials management
- API endpoint configuration
- Webhook configuration
- Connection testing
- Enable / disable integration
- Default provider selection
- Integration logs
- Retry handling
- Timeout handling
- Error handling
- Webhook signature verification
- Credential rotation
- Provider-specific configuration
- Integration versioning

IMPORTANT:
Never expose secret keys, API tokens, passwords, or credentials to the frontend.

Secrets must be stored securely on the backend using encrypted storage or a suitable secrets manager.

Clarify that configuring an already implemented connector can be done through the Super Admin interface, while supporting a completely new provider or protocol may require backend development.

---

7. REQUIRED DOCUMENTATION PACKAGE

Create the following complete documentation package.

DOCUMENT 01 — PRODUCT REQUIREMENTS DOCUMENT (PRD)

File:
"01-PRD.md"

Include:

- Product overview
- Vision and mission
- Business objectives
- Business problems
- Target users
- User personas
- Business value
- Product scope
- Out of scope
- Functional capabilities
- Non-functional expectations
- Success metrics
- Product constraints
- Assumptions
- Risks
- Product roadmap

DOCUMENT 02 — SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

File:
"02-SRS.md"

Include:

- System overview
- System context
- Functional requirements
- Non-functional requirements
- User requirements
- System interfaces
- Hardware and software assumptions
- Security requirements
- Performance requirements
- Availability requirements
- Compatibility requirements
- Data requirements
- Error handling
- Requirement traceability

Assign unique requirement IDs.

Example:

- SYS-FR-001
- SYS-NFR-001
- SEC-001
- INT-001

DOCUMENT 03 — FUNCTIONAL REQUIREMENTS DOCUMENT (FRD)

File:
"03-FRD.md"

Create detailed functional specifications for every PETORA module.

Each feature must include:

1. Feature ID
2. Feature name
3. Purpose
4. Description
5. Actors
6. Required permissions
7. Preconditions
8. Main workflow
9. Alternative workflow
10. Input fields
11. Field types
12. Required / optional status
13. Validation rules
14. Business rules
15. Status transitions
16. Database relationships
17. API operations
18. Notifications
19. Error messages
20. Exception scenarios
21. Audit requirements
22. Acceptance criteria

Do not use generic descriptions such as "manage data".

Specify exactly what users can do and how the system behaves.

DOCUMENT 04 — BUSINESS PROCESS DOCUMENT

File:
"04-BUSINESS-PROCESS.md"

Include:

- Business process overview
- Operational procedures
- Customer journey
- Pet registration process
- POS process
- Purchasing process
- Stock receiving process
- Stock transfer process
- Grooming process
- Hotel check-in / check-out
- Daycare process
- Veterinary consultation
- Prescription process
- Payment process
- Refund process
- Booking process
- Multi-branch operations
- Approval processes

Provide Mermaid flowcharts and sequence diagrams where useful.

DOCUMENT 05 — SYSTEM BLUEPRINT

File:
"05-SYSTEM-BLUEPRINT.md"

Include:

- Complete system overview
- Module architecture
- Module dependencies
- System boundaries
- Application layers
- Business domains
- Centralized data architecture
- Multi-branch architecture
- Integration architecture
- Data ownership
- System interaction diagrams

DOCUMENT 06 — DATABASE DESIGN DOCUMENT

File:
"06-DATABASE-DESIGN.md"

Include:

- Database architecture
- Naming conventions
- Table definitions
- Column definitions
- Data types
- Primary keys
- Foreign keys
- Unique constraints
- Indexes
- Check constraints
- Soft delete strategy
- Audit columns
- Branch data strategy
- Transaction strategy
- Data retention
- Data migration strategy

Create detailed schemas for all required entities.

Do not create tenant_id.

Identify which transactional tables require branch_id and justify exceptions.

DOCUMENT 07 — ENTITY RELATIONSHIP DIAGRAM

File:
"07-ERD.md"

Create Mermaid ER diagrams.

Include:

- Core entities
- User and RBAC entities
- Branch entities
- Customer and pet entities
- Product and inventory entities
- Sales entities
- Purchasing entities
- Service entities
- Veterinary entities
- Finance entities
- Staff entities
- Integration entities
- Audit entities

Make sure all foreign key relationships are consistent with Document 06.

For very large diagrams, divide them into logical domain diagrams.

DOCUMENT 08 — API SPECIFICATION

File:
"08-API-SPECIFICATION.md"

Include:

- API conventions
- REST principles
- Endpoint naming
- Authentication
- Authorization
- Request formats
- Response formats
- Pagination
- Filtering
- Sorting
- Validation
- Error codes
- Rate limiting
- Idempotency
- File uploads
- Webhooks
- Versioning

Create endpoint specifications for every module.

Use realistic request and response JSON examples.

DOCUMENT 09 — TECHNICAL ARCHITECTURE

File:
"09-TECHNICAL-ARCHITECTURE.md"

Include:

- Architecture style
- Frontend architecture
- Backend architecture
- Database architecture
- API architecture
- Authentication architecture
- Authorization architecture
- Integration architecture
- Caching strategy
- File storage
- Background jobs
- Logging
- Monitoring
- Scalability
- Reliability
- Security boundaries

Do not assume a technology stack that has not been selected.

If the repository already uses a technology stack, document the actual stack and distinguish existing implementation from recommendations.

DOCUMENT 10 — RBAC AND PERMISSION MATRIX

File:
"10-RBAC-PERMISSION-MATRIX.md"

Include:

- Protected system roles
- Custom roles
- Permission catalog
- Module permissions
- Action permissions
- Branch scope
- Data scope
- Approval permissions
- Sensitive data permissions
- Role assignment rules
- Permission inheritance, if applicable
- Authorization examples

Provide detailed permission matrix tables.

DOCUMENT 11 — SITEMAP AND NAVIGATION

File:
"11-SITEMAP-NAVIGATION.md"

Include:

- Public pages
- Authentication pages
- Super Admin navigation
- Admin navigation
- Doctor navigation
- Customer portal navigation
- Responsive navigation
- Sidebar structure
- Header structure
- Breadcrumb rules
- Menu visibility rules

DOCUMENT 12 — UI/UX DESIGN SPECIFICATION

File:
"12-UI-UX-SPECIFICATION.md"

Include:

- UX principles
- Design direction
- Responsive breakpoints
- Desktop layout
- Tablet layout
- Mobile layout
- Navigation behavior
- Dashboard layout
- Data table behavior
- Form behavior
- Modal and drawer behavior
- Empty states
- Loading states
- Error states
- Accessibility
- Interaction guidelines

Do not design separate native mobile applications.

DOCUMENT 13 — USER FLOW AND USE CASE

File:
"13-USER-FLOW-USE-CASE.md"

Include:

- Actor definitions
- Use case diagrams
- Use case descriptions
- Main user journeys
- Alternative flows
- Exception flows
- Role-specific workflows

DOCUMENT 14 — DESIGN SYSTEM

File:
"14-DESIGN-SYSTEM.md"

Include:

- Color tokens
- Typography
- Spacing
- Grid system
- Border radius
- Shadows
- Iconography
- Buttons
- Inputs
- Selects
- Tables
- Cards
- Dialogs
- Navigation components
- Status indicators
- Form patterns
- Responsive rules
- Accessibility standards

Avoid inventing a final brand identity if it has not been approved. Mark proposed tokens clearly.

DOCUMENT 15 — DEVELOPMENT ROADMAP

File:
"15-DEVELOPMENT-ROADMAP.md"

Include:

- Development phases
- Module dependencies
- Prioritization
- Milestones
- Deliverables
- Technical dependencies
- Risk management
- Definition of Done
- Release strategy

DOCUMENT 16 — TEST PLAN AND TEST CASE

File:
"16-TEST-PLAN-TEST-CASE.md"

Include:

- Testing strategy
- Unit testing
- Integration testing
- API testing
- UI testing
- End-to-end testing
- Security testing
- Performance testing
- Responsive testing
- User acceptance testing
- Regression testing

Create detailed test cases with:

- Test ID
- Preconditions
- Test steps
- Test data
- Expected results
- Actual results placeholder
- Pass / Fail status

DOCUMENT 17 — SECURITY SPECIFICATION

File:
"17-SECURITY-SPECIFICATION.md"

Include:

- Authentication
- Authorization
- RBAC
- Session management
- Password security
- Data encryption
- Secret management
- Input validation
- SQL injection prevention
- XSS prevention
- CSRF protection where applicable
- Rate limiting
- Audit trails
- Privacy
- Customer data protection
- Medical record protection
- File upload security
- Webhook security
- Backup security
- Incident response

DOCUMENT 18 — DEPLOYMENT AND DEVOPS GUIDE

File:
"18-DEPLOYMENT-DEVOPS.md"

Include:

- Development environment
- Staging environment
- Production environment
- Environment variables
- Secrets
- Database deployment
- Migration strategy
- Build process
- CI/CD
- Domain and SSL
- Monitoring
- Logging
- Rollback
- Release management
- Deployment checklist

DOCUMENT 19 — USER MANUAL AND SOP

File:
"19-USER-MANUAL-SOP.md"

Create separate instructions for:

- Super Admin
- Admin
- Doctor
- Customer

Include step-by-step operational instructions for all major modules.

DOCUMENT 20 — MAINTENANCE, BACKUP AND RECOVERY SOP

File:
"20-MAINTENANCE-BACKUP-RECOVERY.md"

Include:

- Routine maintenance
- Database backup
- File backup
- Backup retention
- Restore procedures
- Disaster recovery
- Recovery Point Objective (RPO)
- Recovery Time Objective (RTO)
- Monitoring
- Incident handling
- Data integrity checks
- Maintenance checklist

---

8. ADDITIONAL DOCUMENTATION

Also create:

DOCUMENT 21 — REQUIREMENT TRACEABILITY MATRIX

"21-REQUIREMENT-TRACEABILITY-MATRIX.md"

Connect:

- Business requirements
- PRD requirements
- SRS requirements
- FRD features
- Database entities
- API endpoints
- UI pages
- Test cases

Every requirement must be traceable.

DOCUMENT 22 — GLOSSARY AND DATA DICTIONARY

"22-GLOSSARY-DATA-DICTIONARY.md"

Include:

- Business terminology
- Technical terminology
- Field definitions
- Status definitions
- Enumerations
- Units
- Currency conventions
- Date and time conventions

DOCUMENT 23 — DECISION LOG AND ASSUMPTIONS

"23-DECISION-LOG-ASSUMPTIONS.md"

Record:

- Confirmed decisions
- Proposed decisions
- Assumptions
- Open questions
- Conflicts
- Risks
- Stakeholder approvals

DOCUMENT 24 — CHANGE MANAGEMENT

"24-CHANGE-MANAGEMENT.md"

Include:

- Requirement change process
- Impact analysis
- Version history
- Approval workflow
- Documentation update rules
- Backward compatibility

---

9. DOCUMENTATION DIRECTORY STRUCTURE

Create or adapt the following structure:

PETORA-DOCUMENTATION/
│
├── README.md
├── 00-DOCUMENT-CONTROL/
│   ├── DOCUMENT-INDEX.md
│   ├── DOCUMENT-VERSION-HISTORY.md
│   ├── 23-DECISION-LOG-ASSUMPTIONS.md
│   └── 24-CHANGE-MANAGEMENT.md
│
├── 01-REQUIREMENTS/
│   ├── 01-PRD.md
│   ├── 02-SRS.md
│   ├── 03-FRD.md
│   ├── 04-BUSINESS-PROCESS.md
│   ├── 21-REQUIREMENT-TRACEABILITY-MATRIX.md
│   └── 22-GLOSSARY-DATA-DICTIONARY.md
│
├── 02-ARCHITECTURE/
│   ├── 05-SYSTEM-BLUEPRINT.md
│   ├── 06-DATABASE-DESIGN.md
│   ├── 07-ERD.md
│   ├── 08-API-SPECIFICATION.md
│   ├── 09-TECHNICAL-ARCHITECTURE.md
│   ├── 10-RBAC-PERMISSION-MATRIX.md
│   └── 17-SECURITY-SPECIFICATION.md
│
├── 03-UI-UX/
│   ├── 11-SITEMAP-NAVIGATION.md
│   ├── 12-UI-UX-SPECIFICATION.md
│   ├── 13-USER-FLOW-USE-CASE.md
│   └── 14-DESIGN-SYSTEM.md
│
├── 04-DEVELOPMENT/
│   ├── 15-DEVELOPMENT-ROADMAP.md
│   └── 18-DEPLOYMENT-DEVOPS.md
│
├── 05-QA/
│   └── 16-TEST-PLAN-TEST-CASE.md
│
└── 06-PRODUCTION/
├── 19-USER-MANUAL-SOP.md
└── 20-MAINTENANCE-BACKUP-RECOVERY.md

You may create additional subfolders if needed.

---

10. DOCUMENTATION QUALITY STANDARDS

Every document must:

1. Use professional Bahasa Indonesia.
2. Retain standard English technical terminology where appropriate.
3. Use consistent terminology throughout.
4. Use clear headings and numbering.
5. Include tables where useful.
6. Include Mermaid diagrams where appropriate.
7. Include practical examples.
8. Include realistic data examples.
9. Include unique IDs for requirements, features, APIs, entities, and tests.
10. Cross-reference related documents.
11. Avoid vague statements.
12. Avoid contradictory business rules.
13. Distinguish confirmed facts from proposals.
14. Be understandable without reading the source code.
15. Be detailed enough for implementation.

Do not create documents merely filled with headings and generic explanations.

A document is not complete until its sections contain meaningful, specific PETORA requirements.

---

11. CROSS-DOCUMENT CONSISTENCY

Maintain a shared source of truth.

Examples:

- Every FRD feature must reference its requirement ID.
- Every database table must have a documented purpose.
- Every API endpoint must reference its corresponding feature.
- Every UI page must reference its module and permission requirements.
- Every permission must reference a valid role or configurable role rule.
- Every test case must reference a requirement or feature.
- Every branch-scoped transaction must follow the documented branch architecture.
- Every integration must follow the documented connector architecture.

Do not create different names for the same entity across documents.

Use stable IDs and consistent naming conventions.

---

12. EXECUTION WORKFLOW

Work in the following phases.

PHASE 1 — REPOSITORY AUDIT

Before writing documents:

1. Inspect the repository structure.
2. Inspect all existing documentation.
3. Inspect README files.
4. Inspect existing source code if available.
5. Identify the technology stack.
6. Identify the current database structure.
7. Identify existing modules.
8. Identify missing specifications.
9. Identify conflicting requirements.
10. Create an audit report.

Save the report as:

"PETORA-DOCUMENTATION/REPOSITORY-AUDIT.md"

Do not overwrite existing approved documentation without preserving its content and recording changes.

PHASE 2 — DOCUMENTATION FOUNDATION

Create:

- README.md
- DOCUMENT-INDEX.md
- DOCUMENT-VERSION-HISTORY.md
- Decision Log
- Glossary
- Documentation conventions

Establish consistent terminology, IDs, and references.

PHASE 3 — REQUIREMENTS DOCUMENTATION

Create:

- PRD
- SRS
- FRD
- Business Process
- Requirement Traceability Matrix

Complete requirements for every module.

PHASE 4 — SYSTEM AND TECHNICAL DOCUMENTATION

Create:

- System Blueprint
- Database Design
- ERD
- API Specification
- Technical Architecture
- RBAC Matrix
- Security Specification

Validate relationships and cross-references.

PHASE 5 — UI/UX DOCUMENTATION

Create:

- Sitemap
- UI/UX Specification
- User Flow
- Design System

PHASE 6 — DEVELOPMENT AND QUALITY

Create:

- Development Roadmap
- Test Plan
- Deployment Guide

PHASE 7 — PRODUCTION DOCUMENTATION

Create:

- User Manual
- SOP
- Maintenance Guide
- Backup and Recovery Guide

PHASE 8 — FINAL VALIDATION

Validate:

- All 24 documents exist.
- All required sections are present.
- All modules are covered.
- All four protected roles are documented.
- Custom RBAC is documented.
- Single-business multi-branch architecture is consistent.
- No unintended multi-tenant architecture exists.
- Responsive web requirements are documented.
- Integration configuration follows secure connector architecture.
- Database relationships are consistent.
- API endpoints match FRD features.
- UI pages match permissions.
- Test cases map to requirements.
- Mermaid diagrams are valid.
- Cross-references are correct.
- No contradictory definitions exist.

Create:

"PETORA-DOCUMENTATION/DOCUMENTATION-VALIDATION-REPORT.md"

Include:

- Completed documents
- Incomplete sections
- Missing information
- Conflicts
- Assumptions
- Required stakeholder decisions
- Validation results

---

13. IMPORTANT EXECUTION RULES

- Do not generate the entire documentation package in one enormous response.
- Write directly into repository files.
- Work incrementally in manageable phases.
- Save progress after each phase.
- Never delete existing project files.
- Never modify application source code during this documentation task unless explicitly required.
- Do not install dependencies.
- Do not execute database migrations.
- Do not change production configuration.
- Do not expose secrets.
- Do not fabricate integrations or implemented features.
- Do not claim a feature exists merely because it is documented.
- Clearly distinguish planned architecture from existing implementation.
- If output limits are reached, continue from the last completed file.
- Maintain a checklist of completed and pending documents.

If a required decision is missing, document it as TBD and continue with the remaining work whenever possible.

Do not stop after creating the folder structure or README. Complete the actual documentation content.

---

14. FINAL DELIVERABLE

At the end, provide a concise report containing:

1. Repository audit summary
2. Documentation files created
3. Documentation files updated
4. Modules covered
5. Architecture decisions documented
6. Assumptions and unresolved questions
7. Validation results
8. Recommended next development phase

The final documentation package must become the official PETORA project reference for future analysis, UI/UX design, development, testing, deployment, and maintenance.

START NOW WITH PHASE 1 — REPOSITORY AUDIT.

Inspect the repository first, then proceed phase by phase. Do not skip the audit and do not stop after producing an outline.
