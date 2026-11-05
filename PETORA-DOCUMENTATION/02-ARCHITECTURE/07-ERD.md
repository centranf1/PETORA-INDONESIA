# 07 — Entity Relationship Diagram

Diagram ini merepresentasikan model konseptual yang dirinci pada [Database Design](./06-DATABASE-DESIGN.md). Semua nama adalah proposal; bukan hasil inspeksi database implementasi.

## 1. Organization, access, customer dan pet

```mermaid
erDiagram
  BRANCHES ||--o{ WAREHOUSES : owns
  BRANCHES ||--o{ USER_BRANCH_ACCESS : grants
  USERS ||--o{ USER_BRANCH_ACCESS : receives
  USERS ||--o{ USER_ROLES : assigned
  ROLES ||--o{ USER_ROLES : has
  ROLES ||--o{ ROLE_PERMISSIONS : grants
  PERMISSIONS ||--o{ ROLE_PERMISSIONS : describes
  CUSTOMERS ||--o| USERS : portal_account
  CUSTOMERS ||--o{ CUSTOMER_ADDRESSES : has
  CUSTOMERS ||--o{ PET_OWNERS : owns
  PETS ||--o{ PET_OWNERS : shared_with
  PETS ||--o{ MEDICAL_VISITS : receives
  BRANCHES ||--o{ MEDICAL_VISITS : hosts
  USERS ||--o{ MEDICAL_VISITS : authors
  USERS {
    uuid id PK
    string email
    string status
  }
  ROLES {
    uuid id PK
    string code UK
    boolean is_protected
  }
  PERMISSIONS {
    uuid id PK
    string code UK
    string action
  }
  BRANCHES {
    uuid id PK
    string code UK
    string status
  }
  CUSTOMERS {
    uuid id PK
    string customer_no UK
    string name
  }
  PETS {
    uuid id PK
    string pet_no UK
    string name
    string species
  }
```

## 2. Product, stock, sales dan purchasing

```mermaid
erDiagram
  PRODUCT_CATEGORIES ||--o{ PRODUCTS : categorizes
  PRODUCTS ||--o{ PRODUCT_VARIANTS : has
  PRODUCT_VARIANTS ||--o{ PRODUCT_PRICES : priced_as
  BRANCHES o|--o{ PRODUCT_PRICES : overrides
  BRANCHES ||--o{ WAREHOUSES : has
  WAREHOUSES ||--o{ STOCK_MOVEMENTS : records
  PRODUCT_VARIANTS ||--o{ STOCK_MOVEMENTS : moves
  STOCK_BATCHES o|--o{ STOCK_MOVEMENTS : tracks
  BRANCHES ||--o{ ORDERS : receives
  ORDERS ||--|{ ORDER_ITEMS : contains
  ORDERS ||--o{ PAYMENT_ALLOCATIONS : settled_by
  PAYMENTS ||--o{ PAYMENT_ALLOCATIONS : allocates
  BRANCHES ||--o{ PURCHASE_ORDERS : orders
  SUPPLIERS ||--o{ PURCHASE_ORDERS : supplies
  PURCHASE_ORDERS ||--o{ GOODS_RECEIPTS : received_by
  GOODS_RECEIPTS ||--|{ GOODS_RECEIPT_ITEMS : contains
  GOODS_RECEIPT_ITEMS ||--o{ STOCK_MOVEMENTS : posts
  STOCK_TRANSFERS ||--|{ STOCK_TRANSFER_ITEMS : contains
  PRODUCT_VARIANTS {
    uuid id PK
    uuid product_id FK
    string sku UK
  }
  ORDERS {
    uuid id PK
    uuid branch_id FK
    string order_no UK
    decimal grand_total
  }
  PAYMENTS {
    uuid id PK
    uuid branch_id FK
    decimal amount
    string status
  }
  STOCK_MOVEMENTS {
    uuid id PK
    uuid branch_id FK
    decimal qty_delta
    string source_type
  }
```

## 3. Booking, layanan dan klinik

```mermaid
erDiagram
  CUSTOMERS ||--o{ BOOKINGS : requests
  PETS ||--o{ BOOKINGS : scheduled_for
  BRANCHES ||--o{ BOOKINGS : hosts
  BOOKINGS ||--o| GROOMING_SESSIONS : fulfills
  EMPLOYEES ||--o{ GROOMING_SESSIONS : performs
  BOOKINGS ||--o| HOTEL_STAYS : fulfills
  HOTEL_ROOMS ||--o{ HOTEL_STAYS : assigned
  HOTEL_STAYS ||--o{ CARE_LOGS : records
  BOOKINGS ||--o| TRANSPORT_TRIPS : fulfills
  EMPLOYEES ||--o{ TRANSPORT_TRIPS : drives
  PETS ||--o{ VETERINARY_APPOINTMENTS : scheduled
  BRANCHES ||--o{ VETERINARY_APPOINTMENTS : hosts
  VETERINARY_APPOINTMENTS o|--o| MEDICAL_VISITS : results_in
  MEDICAL_VISITS ||--o{ PRESCRIPTIONS : issues
  PRESCRIPTIONS ||--|{ PRESCRIPTION_ITEMS : contains
  PRESCRIPTION_ITEMS ||--o{ MEDICINE_DISPENSINGS : dispensed_as
  STOCK_BATCHES ||--o{ MEDICINE_DISPENSINGS : from_batch
  BOOKINGS {
    uuid id PK
    uuid branch_id FK
    uuid customer_id FK
    uuid pet_id FK
    datetime starts_at
    string status
  }
  MEDICAL_VISITS {
    uuid id PK
    uuid branch_id FK
    uuid pet_id FK
    uuid doctor_user_id FK
    datetime signed_at
  }
```

## 4. Finance, audit dan integrations

```mermaid
erDiagram
  BRANCHES ||--o{ EXPENSES : incurs
  BRANCHES ||--o{ JOURNAL_ENTRIES : posts
  ACCOUNTING_PERIODS ||--o{ JOURNAL_ENTRIES : contains
  JOURNAL_ENTRIES ||--|{ JOURNAL_ENTRY_LINES : balances
  CHART_OF_ACCOUNTS ||--o{ JOURNAL_ENTRY_LINES : classifies
  USERS o|--o{ AUDIT_LOGS : acts
  BRANCHES o|--o{ AUDIT_LOGS : scopes
  INTEGRATION_PROVIDERS ||--o{ INTEGRATION_CONFIGURATIONS : configures
  INTEGRATION_PROVIDERS ||--o{ INTEGRATION_LOGS : records
  BRANCHES o|--o{ INTEGRATION_CONFIGURATIONS : overrides
  USERS {
    uuid id PK
    string status
  }
  JOURNAL_ENTRIES {
    uuid id PK
    uuid branch_id FK
    string status
    string source_type
  }
  AUDIT_LOGS {
    uuid id PK
    uuid actor_user_id FK
    string resource_type
    string action
  }
  INTEGRATION_CONFIGURATIONS {
    uuid id PK
    uuid provider_id FK
    uuid branch_id FK
    boolean enabled
  }
```

## 5. Catatan konsistensi

- Semua relation multi-cabang mengarah ke `branches`; transfer memiliki origin/destination branch, bukan FK cabang tunggal.
- Pet ownership adalah many-to-many melalui `pet_owners`; consent adalah bagian penting dari policy, dapat diekstrak ke tabel consent/event saat desain rinci.
- Diagram tidak menampilkan seluruh kolom maupun junction; silakan gunakan desain database untuk referensi detail.
- ERD final harus divalidasi dengan migration, constraint, dan definisi branch scope sebelum implementasi.
