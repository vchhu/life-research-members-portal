import type { keyword } from "@prisma/client";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { KeywordInfo } from "./_types";

export default async function updateKeyword(
  id: number,
  params: KeywordInfo
): Promise<keyword | null> {
  const notification = new Notification();
  try {
    notification.loading(en ? "Updating keyword..." : "Mise à jour du mot clé...");
    const res = await fetch(ApiRoutes.updateKeyword(id), {
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
