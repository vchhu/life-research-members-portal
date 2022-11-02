import type { RegisterAccountParams, RegisterAccountRes } from "../pages/api/register-account";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";

export default async function registerAccount(
  params: RegisterAccountParams
): Promise<RegisterAccountRes | null> {
  const notification = new Notification();
  try {
    notification.loading(en ? "Registering Account..." : "Compte d'enregistrement");
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