import type { keyword } from "@prisma/client";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { KeywordInfo } from "./_types";

export default async function updateKeyword(
  id: number,
  params: KeywordInfo
): Promise<keyword | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(en ? "Updating keyword..." : "Mise à jour du mot-clé...");
    const res = await fetch(ApiRoutes.updateKeyword(id), {
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
