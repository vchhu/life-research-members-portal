import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { MemberRes } from "../pages/api/member/[id]";

export default function useMember(id: number) {
  const [member, setMember] = useState<MemberRes | null>();
  const [loading, setLoading] = useState(true);

  async function fetchMember(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.member(id));
      if (!result.ok) return console.error(await result.text());
      const member = await result.json();
      setMember(member);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMember(id);
  }, [id]);

  function refresh() {
    fetchMember(id);
  }

  return { member, loading, refresh };
}
