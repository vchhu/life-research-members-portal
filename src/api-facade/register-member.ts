import { all_member_info } from "../../prisma/types";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";

/** Registers a member to the given account, will throw an error if status code is not 200 */
export default async function registerMember(account_id: number): Promise<all_member_info> {
  const result = await fetch(ApiRoutes.registerMember, {
    headers: { ...(await authHeader()), ...contentTypeJsonHeader },
    body: JSON.stringify({ account_id }),
    method: "PUT",
  });
  if (!result.ok) throw await result.text();
  return await result.json();
}
