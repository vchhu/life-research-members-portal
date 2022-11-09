import type { member_type } from "@prisma/client";
import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";
import ApiRoutes from "../../routing/api-routes";
import Notification from "../notifications/notification";

export const MemberTypesCtx = createContext<{
  memberTypes: member_type[];
  refresh: () => void;
}>(null as any);

async function fetchAllMemberTypes(): Promise<member_type[]> {
  try {
    const res = await fetch(ApiRoutes.allMemberTypes);
    if (!res.ok) throw await res.text();
    return await res.json();
  } catch (e: any) {
    new Notification().error(e);
    return [];
  }
}

export const MemberTypesCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [memberTypes, setMemberTypes] = useState<member_type[]>([]);

  async function getMemberTypes() {
    setMemberTypes(await fetchAllMemberTypes());
  }

  useEffect(() => {
    getMemberTypes();
  }, []);

  function refresh() {
    getMemberTypes();
  }

  return (
    <MemberTypesCtx.Provider value={{ memberTypes, refresh }}>{children}</MemberTypesCtx.Provider>
  );
};
