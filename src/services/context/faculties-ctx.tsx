import type { faculty } from "@prisma/client";
import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";
import ApiRoutes from "../../routing/api-routes";
import Notification from "../notifications/notification";

export const FacultiesCtx = createContext<{
  faculties: faculty[];
  refresh: () => void;
}>(null as any);

async function fetchAllFaculties(): Promise<faculty[]> {
  try {
    const res = await fetch(ApiRoutes.allFaculties);
    if (!res.ok) throw await res.text();
    return await res.json();
  } catch (e: any) {
    new Notification().error(e);
    return [];
  }
}

export const FacultiesCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [faculties, setFaculties] = useState<faculty[]>([]);

  async function getFaculties() {
    setFaculties(await fetchAllFaculties());
  }

  useEffect(() => {
    getFaculties();
  }, []);

  function refresh() {
    getFaculties();
  }

  return <FacultiesCtx.Provider value={{ faculties, refresh }}>{children}</FacultiesCtx.Provider>;
};
