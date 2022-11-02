import type { UpdateMemberInsightParams } from "../pages/api/update-member/[id]/insight";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { MemberPrivateInfo } from "./_types";

export default async function updateMemberInsight(
  id: number,
  params: UpdateMemberInsightParams
): Promise<MemberPrivateInfo | null> {
  const notification = new Notification();
  try {
    notification.loading(
      en ? "Updating Member Info..." : "Mise à jour des informations sur les membres..."
    );
    const res = await fetch(ApiRoutes.updateMemberInsight(id), {
      method: "PATCH",
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      notification.error(await res.text());
      return null;
    }
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
