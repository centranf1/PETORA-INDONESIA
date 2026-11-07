import { createErrorResponse, generateTraceId } from '../../../src/lib/validators/errors.ts'

export function createPolicyNotApprovedResponse() {
  const traceId = generateTraceId()

  return new Response(
    JSON.stringify(createErrorResponse(
      'POLICY_NOT_APPROVED',
      'Operasi backend ini dinonaktifkan sampai policy dan transaksi atomik disetujui.',
      false,
      traceId,
    )),
    { status: 503, headers: { 'Content-Type': 'application/json' } },
  )
}