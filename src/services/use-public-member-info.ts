import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { PublicMemberInfo } from "./_types";

export default function usePublicMemberInfo(id: number) {
  const [member, setMember] = useState<PublicMemberInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchMember(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.publicMemberInfo(id));
      if (!result.ok) return console.error(await result.text());
      setMember(await result.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMember(id);
  }, [id]);

  return { member, loading };
}
