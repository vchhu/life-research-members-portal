import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import Notification from "./notifications/notification";
import type { AccountInfo } from "./_types";

export default async function updateAccountRegisterMember(id: number): Promise<AccountInfo | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(en ? "Registering Member..." : "Enregistrer Membre...");
    const res = await fetch(ApiRoutes.updateAccountRegisterMember(id), {
      headers: authHeader,
      method: "PUT",
    });
    if (!res.ok) throw await res.text();
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
