import { z } from 'zod'

export const errorSchema = z.object({
  code: z.string(),
  message: z.string(),
  retryable: z.boolean(),
  trace_id: z.string().optional(),
  details: z.any().optional(),
})

export type ErrorContract = z.infer<typeof errorSchema>

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z.object({
      trace_id: z.string(),
      next_cursor: z.string().nullish(),
      total: z.number().optional(),
    }),
  })

export const listResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      trace_id: z.string(),
      next_cursor: z.string().nullish(),
      total: z.number().optional(),
    }),
  })

export const settingProposalSchema = z.object({
  setting_group: z.string().min(1, 'Setting group wajib diisi'),
  key: z.string().min(1, 'Key wajib diisi'),
  value: z.any(),
  value_type: z.enum(['string', 'number', 'boolean', 'object', 'enum']),
  reason: z.string().min(5, 'Alasan minimal 5 karakter'),
  expected_version_no: z.number().int().positive().optional(),
  branch_id: z.string().uuid().optional(),
})

export type SettingProposal = z.infer<typeof settingProposalSchema>

export const saleCreateSchema = z.object({
  branch_id: z.string().uuid('Branch ID tidak valid'),
  customer_id: z.string().uuid().optional(),
  items: z.array(z.object({
    product_id: z.string().uuid().optional(),
    description: z.string().min(1),
    quantity: z.number().positive('Qty harus positif'),
    unit: z.string().min(1),
    unit_price: z.number().min(0),
    discount_amount: z.number().min(0).default(0),
    tax_amount: z.number().min(0).default(0),
  })).min(1, 'Minimal 1 item'),
  payment_method: z.enum(['cash', 'transfer', 'card', 'ewallet', 'credit']),
  payment_amount: z.number().min(0),
  currency: z.string().default('IDR'),
  idempotency_key: z.string().min(1, 'Idempotency key wajib'),
})

export type SaleCreate = z.infer<typeof saleCreateSchema>

export const refundRequestSchema = z.object({
  sales_transaction_id: z.string().uuid(),
  amount: z.number().positive('Amount harus positif'),
  reason: z.string().min(5, 'Alasan minimal 5 karakter'),
  idempotency_key: z.string().min(1, 'Idempotency key wajib'),
})

export type RefundRequest = z.infer<typeof refundRequestSchema>

export const stockAdjustmentSchema = z.object({
  location_id: z.string().uuid(),
  product_id: z.string().uuid(),
  batch_id: z.string().uuid().optional(),
  quantity_delta: z.number().nonzero('Quantity delta tidak boleh nol'),
  unit: z.string().min(1),
  movement_type: z.enum(['in', 'out', 'transfer', 'adjustment', 'damaged', 'expired', 'return']),
  source_type: z.string().min(1),
  source_id: z.string().uuid().optional(),
  reason: z.string().min(5, 'Alasan minimal 5 karakter'),
  idempotency_key: z.string().min(1, 'Idempotency key wajib'),
})

export type StockAdjustment = z.infer<typeof stockAdjustmentSchema>

export const bookingCreateSchema = z.object({
  branch_id: z.string().uuid(),
  customer_id: z.string().uuid(),
  pet_id: z.string().uuid(),
  service_type: z.string().min(1),
  scheduled_at: z.string().datetime(),
  ends_at: z.string().datetime().optional(),
  assigned_user_id: z.string().uuid().optional(),
  notes: z.string().optional(),
})

export type BookingCreate = z.infer<typeof bookingCreateSchema>

export const medicalRecordSchema = z.object({
  branch_id: z.string().uuid(),
  pet_id: z.string().uuid(),
  visit_id: z.string().uuid().optional(),
  author_user_id: z.string().uuid(),
  chief_complaint: z.string().optional(),
  physical_examination: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment_plan: z.string().optional(),
  summary: z.string().optional(),
})

export type MedicalRecord = z.infer<typeof medicalRecordSchema>

export const prescriptionSchema = z.object({
  branch_id: z.string().uuid(),
  medical_record_id: z.string().uuid(),
  doctor_user_id: z.string().uuid(),
  instructions: z.string().optional(),
})

export type Prescription = z.infer<typeof prescriptionSchema>