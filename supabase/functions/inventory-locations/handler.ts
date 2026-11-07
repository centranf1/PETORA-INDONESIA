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
const LOCATION_FIELDS = 'id,organization_id,branch_id,code,name,location_type,status,created_at'

function jsonResponse(payload: unknown, status: number) {
  return new Response(JSON.stringify(payload), { status, headers: CORS_HEADERS })
}

function decodeCursor(cursor: string | null) {
  if (!cursor) return null

  try {
    const value = JSON.parse(atob(cursor.replace(/-/g, '+').replace(/_/g, '/'))) as {
      code?: unknown
      id?: unknown
    }
    if (typeof value.code !== 'string' || typeof value.id !== 'string' || !UUID_PATTERN.test(value.id)) return undefined
    return { code: value.code, id: value.id }
  } catch {
    return undefined
  }
}

function encodeCursor(location: { code: string; id: string }) {
  return btoa(JSON.stringify({ code: location.code, id: location.id }))
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
  const limitValue = url.searchParams.get('limit') ?? '100'
  if (!/^\d+$/.test(limitValue) || Number(limitValue) < 1 || Number(limitValue) > 100) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Limit harus antara 1 dan 100', false, traceId), 400)
  }

  const branchId = url.searchParams.get('branch_id')
  if (branchId && !UUID_PATTERN.test(branchId)) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Branch ID tidak valid', false, traceId), 400)
  }

  const cursor = decodeCursor(url.searchParams.get('cursor'))
  if (cursor === undefined) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Cursor tidak valid', false, traceId), 400)
  }

  try {
    const scope = await resolveReadAuthorization(request, 'inventory', 'locations')
    if (branchId && !scope.organizationWide && !scope.branchIds.has(branchId)) {
      return jsonResponse(createErrorResponse('FORBIDDEN', 'Akses cabang tidak diizinkan', false, traceId), 403)
    }

    let query = scope.client
      .from('inventory_locations')
      .select(LOCATION_FIELDS)
      .eq('organization_id', scope.organizationId)

    if (branchId) query = query.eq('branch_id', branchId)
    else if (!scope.organizationWide) query = query.in('branch_id', [...scope.branchIds])

    if (cursor) {
      query = query.or(`code.gt.${cursor.code},and(code.eq.${cursor.code},id.gt.${cursor.id})`)
    }

    const { data: locations, error } = await query
      .order('code', { ascending: true })
      .order('id', { ascending: true })
      .limit(Number(limitValue) + 1)

    if (error) throw error

    const hasMore = (locations?.length ?? 0) > Number(limitValue)
    const page = hasMore ? locations.slice(0, Number(limitValue)) : locations ?? []
    const nextCursor = hasMore ? encodeCursor(page[page.length - 1]) : null

    return jsonResponse(createSuccessResponse(page, traceId, { next_cursor: nextCursor }), 200)
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return jsonResponse(createErrorResponse(error.code, error.message, false, traceId), error.status)
    }
    return jsonResponse(createErrorResponse('INTERNAL_ERROR', 'Daftar lokasi inventori gagal diproses', true, traceId), 500)
  }
}