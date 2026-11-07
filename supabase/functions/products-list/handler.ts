import { resolveReadAuthorization, AuthorizationError } from '../_shared/authorization.ts'
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
const PRODUCT_FIELDS = 'id,organization_id,sku,name,item_type,base_unit,category,brand,description,status,created_at,updated_at'

function jsonResponse(payload: unknown, status: number) {
  return new Response(JSON.stringify(payload), { status, headers: CORS_HEADERS })
}

function decodeCursor(cursor: string | null) {
  if (!cursor) return null

  try {
    const value = JSON.parse(atob(cursor.replace(/-/g, '+').replace(/_/g, '/'))) as {
      sku?: unknown
      id?: unknown
    }
    if (typeof value.sku !== 'string' || typeof value.id !== 'string') return undefined
    return value as { sku: string; id: string }
  } catch {
    return undefined
  }
}

function encodeCursor(product: { sku: string; id: string }) {
  return btoa(JSON.stringify({ sku: product.sku, id: product.id }))
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

  const cursor = decodeCursor(url.searchParams.get('cursor'))
  if (cursor === undefined) {
    return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Cursor tidak valid', false, traceId), 400)
  }

  try {
    const scope = await resolveReadAuthorization(request, 'products', 'catalog')
    let query = scope.client
      .from('products')
      .select(PRODUCT_FIELDS)
      .eq('organization_id', scope.organizationId)

    if (!scope.organizationWide) {
      query = query.eq('status', 'active')
    }

    const search = url.searchParams.get('search')?.trim()
    if (search) {
      if (search.length > 100) {
        return jsonResponse(createErrorResponse('VALIDATION_ERROR', 'Pencarian maksimal 100 karakter', false, traceId), 400)
      }
      const escapedSearch = search.replace(/[,%()]/g, ' ')
      query = query.or(`sku.ilike.%${escapedSearch}%,name.ilike.%${escapedSearch}%`)
    }

    if (cursor) {
      query = query.or(`sku.gt.${cursor.sku},and(sku.eq.${cursor.sku},id.gt.${cursor.id})`)
    }

    const { data: products, error } = await query
      .order('sku', { ascending: true })
      .order('id', { ascending: true })
      .limit(Number(limitValue) + 1)

    if (error) throw error

    const hasMore = (products?.length ?? 0) > Number(limitValue)
    const page = hasMore ? products.slice(0, Number(limitValue)) : products ?? []
    const nextCursor = hasMore ? encodeCursor(page[page.length - 1]) : null

    return jsonResponse(createSuccessResponse(page, traceId, { next_cursor: nextCursor }), 200)
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return jsonResponse(createErrorResponse(error.code, error.message, false, traceId), error.status)
    }

    return jsonResponse(createErrorResponse('INTERNAL_ERROR', 'Permintaan katalog produk gagal diproses', true, traceId), 500)
  }
}