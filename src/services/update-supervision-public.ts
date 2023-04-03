import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { SupervisionPrivateInfo } from "./_types";
import type { UpdateSupervisionPublicParams } from "../pages/api/update-supervision/[id]/public";

export default async function updateSupervisionPublic(
  id: number,
  params: UpdateSupervisionPublicParams
): Promise<SupervisionPrivateInfo | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(
      en ? "Updating Supervision Info..." : "Mise à jour des informations sur la supervision..."
    );
    const res = await fetch(ApiRoutes.updateSupervisionPublic(id), {
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
