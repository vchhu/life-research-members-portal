import type { keyword } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import Notification from "./notifications/notification";
import { LanguageCtx } from "./context/language-ctx";

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

function enSorter(a: keyword, b: keyword): number {
  return (a.name_en || a.name_fr || "").localeCompare(b.name_en || b.name_fr || "");
}

function frSorter(a: keyword, b: keyword): number {
  return (a.name_fr || a.name_en || "").localeCompare(b.name_fr || b.name_en || "");
}

export default function useAllKeywords() {
  const [keywords, setKeywords] = useState<keyword[]>([]);
  const { en } = useContext(LanguageCtx);

  async function getKeywords() {
    setKeywords((await fetchAllKeywords()).sort(en ? enSorter : frSorter));
  }

  useEffect(() => {
    getKeywords();
    // Getting this warning because we check a state variable (en), but we do NOT want to refetch on change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setKeywords((prev) => prev.sort(en ? enSorter : frSorter));
  }, [en]);

  function refresh() {
    getKeywords();
  }

  function set(keyword: keyword) {
    setKeywords((prev) => {
      const curr = prev.filter((k) => k.id !== keyword.id);
      curr.push(keyword);
      return curr.sort(en ? enSorter : frSorter);
    });
  }
  return { keywords, refresh, set };
}
