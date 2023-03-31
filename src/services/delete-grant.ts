import type { PrivateGrantRes } from "../pages/api/grant/[id]/private";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import Notification from "./notifications/notification";

export default async function deleteGrant(id: number): Promise<PrivateGrantRes | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(en ? "Deleting Grant..." : "Suppression de la subvention...");
    const res = await fetch(ApiRoutes.deleteGrant(id), {
      headers: authHeader,
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
