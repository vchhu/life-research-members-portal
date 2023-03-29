import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { SupervisionPublicInfo } from "./_types";

export default function usePublicSupervisionInfo(id: number) {
  const [supervision, setSupervision] = useState<SupervisionPublicInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchSupervision(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.publicSupervisionInfo(id));
      if (!result.ok) return console.error(await result.text());
      setSupervision(await result.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSupervision(id);
  }, [id]);
  return { supervision, loading };
}
