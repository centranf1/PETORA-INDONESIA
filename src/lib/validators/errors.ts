export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public retryable: boolean = false,
    public details?: any
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFLICT: 'CONFLICT',
  IDEMPOTENCY_CONFLICT: 'IDEMPOTENCY_CONFLICT',
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  INVALID_STATE: 'INVALID_STATE',
  APPROVAL_REQUIRED: 'APPROVAL_REQUIRED',
  SYSTEM_LOCKED: 'SYSTEM_LOCKED',
  EXTERNAL_PROVIDER_ERROR: 'EXTERNAL_PROVIDER_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  TIMEOUT: 'TIMEOUT',
} as const

export function createErrorResponse(
  code: string,
  message: string,
  retryable: boolean = false,
  traceId?: string,
  details?: any
) {
  return {
    error: {
      code,
      message,
      retryable,
      trace_id: traceId,
      details,
    },
  }
}

export function createSuccessResponse<T>(data: T, traceId?: string, meta?: any) {
  return {
    data,
    meta: {
      trace_id: traceId,
      ...meta,
    },
  }
}

export function generateTraceId(): string {
  return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

export function generateIdempotencyKey(): string {
  return `idem_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, '')
}

export function validateBranchScope(userBranchId: string | null | undefined, requestedBranchId: string): boolean {
  if (!userBranchId) return false
  return userBranchId === requestedBranchId
}

export function isSuperAdmin(roleCodes: string[]): boolean {
  return roleCodes.includes('super_admin') || roleCodes.includes('owner')
}

export function canAccessOrgLevel(roleCodes: string[]): boolean {
  return isSuperAdmin(roleCodes)
}

export function canAccessAllBranches(roleCodes: string[]): boolean {
  return isSuperAdmin(roleCodes)
}

export function canApprove(roleCodes: string[]): boolean {
  return roleCodes.includes('super_admin') || roleCodes.includes('owner')
}