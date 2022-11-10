import type { AccountRes } from "../pages/api/account/[id]";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import Notification from "./notifications/notification";

export default async function updateAccountRemoveAdmin(id: number): Promise<AccountRes | null> {
  const notification = new Notification();
  try {
    notification.loading(
      en ? "Removing admin privileges..." : "Suppression des privilèges d'administrateur..."
    );
    const res = await fetch(ApiRoutes.updateAccountRemoveAdmin(id), {
      headers: await authHeader(),
      method: "PATCH",
    });
    if (!res.ok) throw await res.text();
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
