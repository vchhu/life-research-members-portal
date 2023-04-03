import type { UpdateEventPublicParams } from "../pages/api/update-event/[id]/public";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { EventPrivateInfo } from "./_types";

export default async function updateEventPublic(
  id: number,
  params: UpdateEventPublicParams
): Promise<EventPrivateInfo | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(
      en ? "Updating Event Info..." : "Mise à jour des informations sur l'événement..."
    );
    const res = await fetch(ApiRoutes.updateEventPublic(id), {
      method: "PATCH",
      headers: { ...authHeader, ...contentTypeJsonHeader },
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
