import router from "next/router";
import type { RegisterSupervisionParams, RegisterSupervisionRes } from "../pages/api/register-supervision-member";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";

export default async function registerSupervision(
  params: RegisterSupervisionParams
): Promise<RegisterSupervisionRes | null> {
  const authHeader = await getAuthHeader();
  if (!authHeader) return null;

  const notification = new Notification();
  try {
    notification.loading(en ? "Registering a supervision..." : "Enregistrement d'une supervision...");
    const res = await fetch(ApiRoutes.registerSupervisionMember, {
      method: "PUT",
      headers: { ...authHeader, ...contentTypeJsonHeader },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw await res.text();
    const result = await res.json();
    notification.success();
    router.push(`/my-profile`);
    return result;
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
