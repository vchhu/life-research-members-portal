import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import getAuthHeader from "./headers/auth-header";
import type { SupervisionPrivateInfo } from "./_types";

export default function usePrivateSupervisionInfo(id: number) {
  const [supervision, setSupervision] = useState<SupervisionPrivateInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchSupervision(id: number) {
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) return;
      setLoading(true);
      const res = await fetch(ApiRoutes.privateSupervisionInfo(id), { headers: authHeader });
      if (!res.ok) return console.error(await res.text());
      setSupervision(await res.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSupervision(id);
  }, [id]);

  function refresh() {
    fetchSupervision(id);
  }

  return { supervision, setSupervision, loading, refresh };
}
