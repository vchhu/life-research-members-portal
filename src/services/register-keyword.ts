import type { RegisterKeywordParams, RegisterKeywordRes } from "../pages/api/register-keyword";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";

export default async function registerKeyword(
  params: RegisterKeywordParams
): Promise<RegisterKeywordRes | null> {
  const notification = new Notification();
  try {
    notification.loading(en ? "Creating Keyword..." : "Création d'un mot-clé...");
    const res = await fetch(ApiRoutes.registerKeyword, {
      method: "PUT",
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
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
