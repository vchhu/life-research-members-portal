import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { PartnerPublicInfo } from "./_types";

export default function usePublicPartnerInfo(id: number) {
  const [org, setOrg] = useState<PartnerPublicInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchPartner(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.publicPartnerInfo(id));
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

  return { org, loading };
}
