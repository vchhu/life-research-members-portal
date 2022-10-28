import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { PublicMemberInfo } from "./_types";

let firstRender = true;
let cachedMembers: PublicMemberInfo[] = [];

export default function useAllMembers() {
  const [allMembers, setAllMembers] = useState<PublicMemberInfo[]>(cachedMembers);
  const [loading, setLoading] = useState(false);

  async function fetchAllMembers() {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.allMembers);
      if (!result.ok) return console.error(await result.text());
      const members: PublicMemberInfo[] = await result.json();
      members.sort((a, b) => a.account.first_name.localeCompare(b.account.first_name));
      setAllMembers(members);
      cachedMembers = members;
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (firstRender) {
      fetchAllMembers();
      firstRender = false;
    }
  }, []);

  return { allMembers, loading, refresh: fetchAllMembers };
}
