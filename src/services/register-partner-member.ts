import type { RegisterPartnerParams, RegisterPartnerRes } from "../pages/api/register-partner-member";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import router, { useRouter } from "next/router";


export default async function registerPartner(
    params: RegisterPartnerParams,
): Promise<RegisterPartnerRes | null> {
    const authHeader = await getAuthHeader();
    if (!authHeader) return null;

    const notification = new Notification();
    try {
        notification.loading(en ? "Register a Partner..." : "Enregistrement d'un partenaire");
        const res = await fetch(ApiRoutes.registerPartnerMember, {
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
