import type { UpdateMemberParams, UpdateMemberRes } from "../pages/api/update-member/[id]";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";

/** Attempts to update a member, will throw an error if status code is not 200 */
export default async function updateMember(
  id: number,
  params: UpdateMemberParams
): Promise<UpdateMemberRes> {
  const result = await fetch(ApiRoutes.updateMember(id), {
    method: "PATCH",
    headers: { ...(await authHeader()), ...contentTypeJsonHeader },
    body: JSON.stringify(params),
  });
  if (!result.ok) throw await result.text();
  return await result.json();
}
