import { z } from 'zod'
import { AppError, ErrorCodes } from './errors'

export function validateRequest<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const messages = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new AppError(ErrorCodes.VALIDATION_ERROR, messages, false, result.error.issues)
  }
  return result.data
}

export function requireAuth(user: any) {
  if (!user) {
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'Autentikasi diperlukan', false)
  }
  return user
}

export function requirePermission(
  user: any,
  permissions: any[],
  module: string,
  resource: string,
  action: string
) {
  if (!user) {
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'Autentikasi diperlukan', false)
  }
  
  const hasPermission = permissions.some(p => 
    p.module === module && p.resource === resource && p.action === action
  )
  
  if (!hasPermission) {
    throw new AppError(ErrorCodes.FORBIDDEN, 'Anda tidak memiliki izin', false)
  }
}

export function requireBranchScope(
  userBranchId: string | null | undefined,
  requestedBranchId: string,
  canAccessAll: boolean = false
) {
  if (canAccessAll) return
  if (!userBranchId || userBranchId !== requestedBranchId) {
    throw new AppError(ErrorCodes.FORBIDDEN, 'Akses cabang tidak diizinkan', false)
  }
}

export function requireOrgScope(
  userOrgId: string | null | undefined,
  requestedOrgId: string
) {
  if (!userOrgId || userOrgId !== requestedOrgId) {
    throw new AppError(ErrorCodes.FORBIDDEN, 'Akses organisasi tidak diizinkan', false)
  }
}

export function checkIdempotency(
  existing: any,
  requestHash: string,
  idempotencyKey: string
) {
  if (existing) {
    if (existing.request_hash !== requestHash) {
      throw new AppError(
        ErrorCodes.IDEMPOTENCY_CONFLICT,
        `Idempotency key ${idempotencyKey} sudah digunakan dengan payload berbeda`,
        false
      )
    }
    return existing
  }
  return null
}

export function checkStockAvailability(
  available: number,
  requested: number,
  allowNegative: boolean = false
) {
  if (!allowNegative && available < requested) {
    throw new AppError(
      ErrorCodes.INSUFFICIENT_STOCK,
      `Stok tidak cukup. Tersedia: ${available}, Diminta: ${requested}`,
      false
    )
  }
}

export function requireApproval(requiresApproval: boolean, approved: boolean) {
  if (requiresApproval && !approved) {
    throw new AppError(
      ErrorCodes.APPROVAL_REQUIRED,
      'Persetujuan diperlukan sebelum perubahan dapat diterapkan',
      false
    )
  }
}

export function requireSystemLock(isLocked: boolean, canBypass: boolean = false) {
  if (isLocked && !canBypass) {
    throw new AppError(
      ErrorCodes.SYSTEM_LOCKED,
      'Setting ini terkunci dan hanya bisa diubah oleh Super Admin',
      false
    )
  }
}

export function validateStateTransition(
  currentState: string,
  allowedTransitions: string[],
  newState: string
) {
  if (!allowedTransitions.includes(newState)) {
    throw new AppError(
      ErrorCodes.INVALID_STATE,
      `Transisi state dari ${currentState} ke ${newState} tidak diizinkan`,
      false
    )
  }
}

export function checkOptimisticLock(currentVersion: number, expectedVersion: number) {
  if (currentVersion !== expectedVersion) {
    throw new AppError(
      ErrorCodes.CONFLICT,
      `Version conflict: expected ${expectedVersion}, got ${currentVersion}. Data telah berubah.`,
      false
    )
  }
}