import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { GrantPublicInfo } from "./_types";

export default function usePublicGrantInfo(id: number) {
  const [grant, setGrant] = useState<GrantPublicInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchGrant(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.publicGrantInfo(id));
      if (!result.ok) return console.error(await result.text());
      setGrant(await result.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGrant(id);
  }, [id]);

  return { grant, loading };
}
