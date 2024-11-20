import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import Notification from "./notifications/notification";
import type { AccountInfo } from "./_types";

export default async function updateAccountGrantAdmin(
  id: number,
  urlIdentifier: string
): Promise<AccountInfo | null> {
  const authHeader = await getAuthHeader();
  const queryParam = `?instituteId=${urlIdentifier}`;
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(
      en
        ? "Granting admin privileges..."
        : "Attribution des privilèges d'administrateur..."
    );
    const res = await fetch(
      `${ApiRoutes.updateAccountGrantAdmin(id)}${queryParam}`,
      {
        headers: authHeader,
        method: "PATCH",
      }
    );
    if (!res.ok) throw await res.text();
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
