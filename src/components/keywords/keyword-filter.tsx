// See https://ant.design/components/form/#components-form-demo-customized-form-controls

import type { keyword } from "@prisma/client";
import AutoComplete from "antd/lib/auto-complete";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { AllKeywordsCtx } from "../../services/context/all-keywords-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import KeywordTag from "./keyword-tag";

type Props = {
  value?: Map<number, keyword>;
  onChange?: (value: Map<number, keyword>) => void;
};

const KeywordFilter: FC<Props> = ({ value = new Map<number, keyword>(), onChange = () => {} }) => {
  const { keywords, refresh: refreshKeywords } = useContext(AllKeywordsCtx);
  const { en } = useContext(LanguageCtx);

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    refreshKeywords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getOption(k: keyword) {
    let labelAndValue = "";
    if (en) {
      if (k.name_en) labelAndValue += k.name_en;
      if (k.name_en && k.name_fr) labelAndValue += " / ";
      if (k.name_fr) labelAndValue += k.name_fr;
    }
    if (!en) {
      if (k.name_fr) labelAndValue += k.name_fr;
      if (k.name_fr && k.name_en) labelAndValue += " / ";
      if (k.name_en) labelAndValue += k.name_en;
    }
    return { label: labelAndValue, value: labelAndValue, keyword: k };
  }

  const options = keywords.map((k) => getOption(k)).sort((a, b) => a.label.localeCompare(b.label));

  function onSelect(optionValue: string, option: typeof options[number]) {
    setSelectedValue("");
    addToList(option.keyword);
  }

  function addToList(keyword: keyword) {
    onChange(new Map(value).set(keyword.id, keyword));
  }

  function onDelete(id: number) {
    const next = new Map(value);
    next.delete(id);
    onChange(next);
  }

  return (
    <>
      <div className="keyword-filter">
        <AutoComplete
          className="autocomplete"
          placeholder={en ? "Keywords..." : "Mots-clés..."}
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          filterOption
          notFoundContent={en ? "No Matches" : "Pas de Correspondance"}
          onSelect={onSelect}
        />
        {Array.from(value.values()).map((k) => (
          <KeywordTag
            key={k.id}
            keyword={k}
            deletable
            onDelete={onDelete}
            onClick={(k) => onDelete(k.id)}
          />
        ))}
      </div>
    </>
  );
};

export default KeywordFilter;
