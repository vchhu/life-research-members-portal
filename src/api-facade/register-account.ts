import type { RegisterAccountParams, RegisterAccountRes } from "../pages/api/register-account";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";

export default async function registerAccount(
  params: RegisterAccountParams
): Promise<RegisterAccountRes | null> {
  const notification = new Notification();
  try {
    notification.loading("Registering Account...");
    const res = await fetch(ApiRoutes.registerAccount, {
      method: "PUT",
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const e = await res.text();
      notification.error(e);
      return null;
    }
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
