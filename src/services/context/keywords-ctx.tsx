import type { keyword } from "@prisma/client";
import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";
import ApiRoutes from "../../routing/api-routes";
import Notification from "../notifications/notification";

export const KeywordsCtx = createContext<{
  keywords: keyword[];
  refresh: () => void;
}>(null as any);

async function fetchAllKeywords(): Promise<keyword[]> {
  try {
    const res = await fetch(ApiRoutes.allKeywords);
    if (!res.ok) {
      new Notification().error(await res.text());
      return [];
    }
    return await res.json();
  } catch (e: any) {
    new Notification().error(e);
    return [];
  }
}

export const KeywordsCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [keywords, setKeywords] = useState<keyword[]>([]);

  async function getKeywords() {
    setKeywords(await fetchAllKeywords());
  }

  useEffect(() => {
    getKeywords();
  }, []);

  function refresh() {
    getKeywords();
  }

  return <KeywordsCtx.Provider value={{ keywords, refresh }}>{children}</KeywordsCtx.Provider>;
};
