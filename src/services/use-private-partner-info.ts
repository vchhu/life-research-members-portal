import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import getAuthHeader from "./headers/auth-header";
import type { PartnerPrivateInfo } from "./_types";

export default function usePrivatePartnerInfo(id: number) {
  const [org, setOrg] = useState<PartnerPrivateInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchPartner(id: number) {
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) return;
      setLoading(true);
      const result = await fetch(ApiRoutes.privatePartnerInfo(id), { headers: authHeader });
      if (!result.ok) return console.error(await result.text());
      setOrg(await result.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPartner(id);
  }, [id]);

  function refresh() {
    fetchPartner(id);
  }

  return { org, setOrg, loading, refresh };
}
