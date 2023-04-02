import type { UpdateGrantPublicParams } from "../pages/api/update-grant/[id]/public";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { GrantPrivateInfo } from "./_types";

export default async function updateGrantPublic(
  id: number,
  params: UpdateGrantPublicParams
): Promise<GrantPrivateInfo | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(
      en ? "Updating Grant Info..." : "Mise à jour des informations sur la subvention..."
    );
    const res = await fetch(ApiRoutes.updateGrantPublic(id), {
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
