import type { RegisterMemberParams, RegisterMemberRes } from "../pages/api/register-member";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";

export default async function registerMember(
  params: RegisterMemberParams
): Promise<RegisterMemberRes | null> {
  const notification = new Notification();
  try {
    notification.loading("Registering Member...");
    const res = await fetch(ApiRoutes.registerMember, {
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
      body: JSON.stringify(params),
      method: "PUT",
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
