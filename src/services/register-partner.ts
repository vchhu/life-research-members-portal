import type { RegisterPartnerParams, RegisterPartnerRes } from "../pages/api/register-partner";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";

export default async function registerPartner(
    params: RegisterPartnerParams
): Promise<RegisterPartnerRes | null> {
    const authHeader = await getAuthHeader();
    if (!authHeader) return null;

    const notification = new Notification();
    try {
        notification.loading(en ? "Register a Partner..." : "Enregistrement d'un partenaire");
        const res = await fetch(ApiRoutes.registerPartner, {
            method: "PUT",
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