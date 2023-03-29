import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { EventPublicInfo } from "./_types";

export default function usePublicEventInfo(id: number) {
  const [event, setEvent] = useState<EventPublicInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchEvent(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.publicEventInfo(id));
      if (!result.ok) return console.error(await result.text());
      setEvent(await result.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  return { event, loading };
}
