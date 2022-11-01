// See https://ant.design/components/form/#components-form-demo-customized-form-controls

import type { keyword } from "@prisma/client";
import AutoComplete from "antd/lib/auto-complete";
import Card from "antd/lib/card";
import { FC, useContext, useState } from "react";
import { KeywordsCtx } from "../../services/context/keywords-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import KeywordTag from "./keyword-tag";
import NewKeywordButton from "./new-keyword-button";

type Props = {
  id?: string;
  value?: Map<number, keyword>;
  onChange?: (value: Map<number, keyword>) => void;
  setError?: (e: string) => void;
  max?: number;
};

const KeywordSelector: FC<Props> = ({
  id = "",
  value = new Map<number, keyword>(),
  max = 10,
  onChange,
  setError,
}) => {
  const { keywords } = useContext(KeywordsCtx);
  const { en } = useContext(LanguageCtx);

  const [inputValue, setInputValue] = useState("");

  const options = keywords
    .map((k) => ({
      label: en ? k.name_en || k.name_fr || "" : k.name_fr || k.name_en || "",
      value: en ? k.name_en || k.name_fr || "" : k.name_fr || k.name_en || "",
      keyword: k,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  function onSelect(optionValue: string, option: typeof options[number]) {
    addToList(option.keyword);
  }

  function addToList(keyword: keyword) {
    setInputValue("");
    if (!value.has(keyword.id) && value.size >= max) return setError?.(`Maximum ${max}`);
    onChange?.(new Map(value).set(keyword.id, keyword));
  }

  function onDelete(id: number) {
    value.delete(id);
    onChange?.(new Map(value));
  }

  return (
    <div className="keyword-selector">
      <div className="header">
        <AutoComplete
          id={id}
          className="autocomplete"
          placeholder={en ? "Search Existing..." : "Rechercher existant..."}
          options={options}
          value={inputValue}
          onChange={setInputValue}
          filterOption
          notFoundContent={en ? "No Matches" : "Pas de Correspondance"}
          onSelect={onSelect}
        />
        <NewKeywordButton onSuccess={addToList}>
          {en ? "Create New" : "Créer un Nouveau"}
        </NewKeywordButton>
      </div>
      <Card className="tag-viewport" size="small">
        {Array.from(value.values()).map((k) => (
          <KeywordTag key={k.id} keyword={k} editable deletable onDelete={onDelete} />
        ))}
      </Card>
    </div>
  );
};

export default KeywordSelector;
