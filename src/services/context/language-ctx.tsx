import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";

const cacheKey = "preferred-language";

export const LanguageCtx = createContext<{
  en: boolean;
  toggleLanguage: () => void;
}>(null as any);

export const LanguageCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  // If english is false, french
  const [en, setEnglish] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(cacheKey) === "false") setEnglish(false);
  }, []);

  function toggleLanguage() {
    setEnglish((prev) => {
      localStorage.setItem(cacheKey, String(!prev));
      return !prev;
    });
  }

  return <LanguageCtx.Provider value={{ en, toggleLanguage }}>{children}</LanguageCtx.Provider>;
};
