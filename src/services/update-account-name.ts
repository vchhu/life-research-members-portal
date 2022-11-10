import type { UpdateAccountNameParams } from "../pages/api/update-account/[id]/name";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { AccountInfo } from "./_types";

export default async function updateAccountName(
  id: number,
  params: UpdateAccountNameParams
): Promise<AccountInfo | null> {
  const notification = new Notification();
  try {
    notification.loading(en ? "Updating account name..." : "Mise à jour du nom du compte...");
    const res = await fetch(ApiRoutes.updateAccountName(id), {
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
      method: "PATCH",
      body: JSON.stringify(params),
    });
    if (!res.ok) throw await res.text();
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
