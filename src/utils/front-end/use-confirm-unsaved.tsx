import { useContext, useEffect, useState } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";

export default function useConfirmUnsaved() {
  const { en } = useContext(LanguageCtx);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (dirty) window.onbeforeunload = () => true;
    if (!dirty) window.onbeforeunload = null;
    return () => {
      window.onbeforeunload = null;
    };
  }, [dirty]);

  function confirmUnsaved() {
    return (
      !dirty ||
      confirm(
        en
          ? "Are you sure? All unsaved changes will be lost."
          : "Êtes-vous sûr ? Toutes les modifications non enregistrées seront perdues."
      )
    );
  }
  return { confirmUnsaved, setDirty };
}
