import type { UpdateMemberParams } from "../pages/api/update-member/[id]";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { PrivateMemberInfo } from "./_types";

/** Attempts to update a member, will throw an error if status code is not 200 */
export default async function updateMember(
  id: number,
  params: UpdateMemberParams
): Promise<PrivateMemberInfo | null> {
  const notification = new Notification();
  try {
    notification.loading("Updating Member Info...");
    const res = await fetch(ApiRoutes.updateMember(id), {
      method: "PATCH",
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      notification.error(await res.text());
      return null;
    }
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
