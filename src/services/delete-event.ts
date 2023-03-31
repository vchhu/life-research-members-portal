import type { PrivateEventRes } from "../pages/api/event/[id]/private";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import Notification from "./notifications/notification";

export default async function deleteEvent(id: number): Promise<PrivateEventRes | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(en ? "Deleting Event..." : "Suppression de l'événement...");
    const res = await fetch(ApiRoutes.deleteEvent(id), {
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
