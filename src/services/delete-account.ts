import type { AccountRes } from "../pages/api/account/[id]";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import Notification from "./notifications/notification";

export default async function deleteAccount(id: number): Promise<AccountRes | null> {
  const notification = new Notification();
  try {
    notification.loading(en ? "Deleting Account..." : "Suppression du compte...");
    const res = await fetch(ApiRoutes.deleteAccount(id), {
      headers: await authHeader(),
      method: "DELETE",
    });
    if (!res.ok) throw await res.text();
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
