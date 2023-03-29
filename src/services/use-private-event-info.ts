import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import getAuthHeader from "./headers/auth-header";
import type { EventPrivateInfo } from "./_types";

export default function usePrivateEventInfo(id: number) {
  const [event, setEvent] = useState<EventPrivateInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchEvent(id: number) {
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) return;
      setLoading(true);
      const res = await fetch(ApiRoutes.privateEventInfo(id), { headers: authHeader });
      if (!res.ok) return console.error(await res.text());
      setEvent(await res.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  function refresh() {
    fetchEvent(id);
  }

  return { event, setEvent, loading, refresh };
}
