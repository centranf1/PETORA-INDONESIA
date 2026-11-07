import { AuthorizationError, resolveReadAuthorization } from '../_shared/authorization.ts'
import {
  createErrorResponse,
  createSuccessResponse,
  generateTraceId,
} from '../../../src/lib/validators/errors.ts'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, x-client-info, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
}
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const SALE_STATUSES = ['pending', 'completed', 'failed', 'cancelled', 'refunded', 'partially_refunded']
const SALE_FIELDS = 'id,organization_id,branch_id,transaction_number,cashier_user_id,currency,subtotal,discount_amount,tax_amount,total_amount,status,created_at,updated_at'

function jsonResponse(payload: unknown, status: number) {
  return new Response(JSON.stringify(payload), { status, headers: CORS_HEADERS })
}

function decodeCursor(cursor: string | null) {
  if (!cursor) return null

  try {
    const value = JSON.parse(atob(cursor.replace(/-/g, '+').replace(/_/g, '/'))) as {
      created_at?: unknown
      id?: unknown
    }
    const createdAt = typeof value.created_at === 'string' ? new Date(value.created_at) : null
    if (!createdAt || Number.isNaN(createdAt.getTime()) || typeof value.id !== 'string' || !UUID_PATTERN.test(value.id)) {
      return undefined
    }
    return { created_at: createdAt.toISOString(), id: value.id }
  } catch {
    return undefined
  }
}

function encodeCursor(sale: { created_at: string; id: string }) {
  return btoa(JSON.stringify({ created_at: sale.created_at, id: sale.id }))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

export default async function handler(request: Request): Promise<Response> {
  const traceId = generateTraceId()
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS })
  if (request.method !== 'GET') {
    return jsonResponse(createErrorResponse('METHOD_NOT_ALLOWED', 'Method tidak diizinkan', false, traceId), 405)
  }

  const url = new URL(request.url)
  const limitValue = url.searchParams.get('limit') ?? '50'
  if (!/^\d+$/.test(limitValue) || Number(limitValue) < 1 || Number(limitValue) > 100) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Limit harus antara 1 dan 100', false, traceId), 400)
  }

  const branchId = url.searchParams.get('branch_id')
  if (branchId && !UUID_PATTERN.test(branchId)) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Branch ID tidak valid', false, traceId), 400)
  }

  const status = url.searchParams.get('status')
  if (status && !SALE_STATUSES.includes(status)) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Status transaksi tidak valid', false, traceId), 400)
  }

  const search = url.searchParams.get('search')?.trim()
  if (search && (search.length > 100 || /[%_,()]/.test(search))) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Pencarian transaksi tidak valid', false, traceId), 400)
  }

  const cursor = decodeCursor(url.searchParams.get('cursor'))
  if (cursor === undefined) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Cursor tidak valid', false, traceId), 400)
  }

  try {
    const scope = await resolveReadAuthorization(request, 'sales', 'transactions')
    if (branchId && !scope.organizationWide && !scope.branchIds.has(branchId)) {
      return jsonResponse(createErrorResponse('FORBIDDEN', 'Akses cabang tidak diizinkan', false, traceId), 403)
    }

    let query = scope.client
      .from('sales_transactions')
      .select(SALE_FIELDS)
      .eq('organization_id', scope.organizationId)

    if (branchId) query = query.eq('branch_id', branchId)
    else if (!scope.organizationWide) query = query.in('branch_id', [...scope.branchIds])
    if (status) query = query.eq('status', status)
    if (search) query = query.ilike('transaction_number', `%${search}%`)
    if (cursor) {
      query = query.or(`created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.lt.${cursor.id})`)
    }

    const { data: sales, error } = await query
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .limit(Number(limitValue) + 1)

    if (error) throw error

    const hasMore = (sales?.length ?? 0) > Number(limitValue)
    const page = hasMore ? sales.slice(0, Number(limitValue)) : sales ?? []
    const nextCursor = hasMore ? encodeCursor(page[page.length - 1]) : null

    return jsonResponse(createSuccessResponse(page, traceId, { next_cursor: nextCursor }), 200)
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return jsonResponse(createErrorResponse(error.code, error.message, false, traceId), error.status)
    }
    return jsonResponse(createErrorResponse('INTERNAL_ERROR', 'Daftar transaksi gagal diproses', true, traceId), 500)
  }
}