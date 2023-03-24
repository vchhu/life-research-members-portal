import type { UpdatePartnerPublicParams } from "../pages/api/update-partner/[id]/public";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { PartnerPrivateInfo } from "./_types";

export default async function updatePartnerPublic(
  id: number,
  params: UpdatePartnerPublicParams
): Promise<PartnerPrivateInfo | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(
      en ? "Updating Partner Info..." : "Mise à jour des informations sur les partenaires..."
    );
    const res = await fetch(ApiRoutes.updatePartnerPublic(id), {
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
