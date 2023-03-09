import type { RegisterProductParams, RegisterProductRes } from "../pages/api/register-product";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import getAuthHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";

export default async function registerProduct(
    params: RegisterProductParams
): Promise<RegisterProductRes | null> {
    const authHeader = await getAuthHeader();
    if (!authHeader) return null;

    const notification = new Notification();
    try {
        notification.loading(en ? "Registering a product..." : "Enregistrement d'un produit...");
        const res = await fetch(ApiRoutes.registerProduct, {
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
