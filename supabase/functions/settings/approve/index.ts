import { createPolicyNotApprovedResponse } from '../../_shared/http.ts'

export default function handler(_request: Request): Response {
  return createPolicyNotApprovedResponse()
}