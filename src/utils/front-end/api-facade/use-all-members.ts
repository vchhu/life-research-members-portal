import { main_members } from "@prisma/client";
import { useEffect, useState } from "react";
import ApiRoutes from "./api-routes";
import authHeader from "./auth-header";

let firstRender = true;
let cachedMembers: main_members[] = [];

export default function useAllMembers() {
  const [allMembers, setAllMembers] = useState<main_members[]>(cachedMembers);
  const [loading, setLoading] = useState(false);

  async function fetchAllMembers() {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.allMembers, { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      const members = await result.json();
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

  return { allMembers, loading, fetchAllMembers };
}
