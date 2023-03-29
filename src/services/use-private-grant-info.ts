import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import getAuthHeader from "./headers/auth-header";
import type { GrantPrivateInfo } from "./_types";

export default function usePrivateGrantInfo(id: number) {
  const [grant, setGrant] = useState<GrantPrivateInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchGrant(id: number) {
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) return;
      setLoading(true);
      const res = await fetch(ApiRoutes.privateGrantInfo(id), { headers: authHeader });
      if (!res.ok) return console.error(await res.text());
      setGrant(await res.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGrant(id);
  }, [id]);

  function refresh() {
    fetchGrant(id);
  }

  return { grant, setGrant, loading, refresh };
}
