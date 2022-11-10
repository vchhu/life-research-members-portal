import type { AccountRes } from "../pages/api/account/[id]";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import Notification from "./notifications/notification";

export default async function updateAccountDeleteMember(id: number): Promise<AccountRes | null> {
  const notification = new Notification();
  try {
    notification.loading(
      en ? "Deleting Member Info..." : "Suppression des informations sur le membre..."
    );
    const res = await fetch(ApiRoutes.updateAccountDeleteMember(id), {
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
