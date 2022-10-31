// See https://ant.design/components/form/#components-form-demo-customized-form-controls

import type { keyword } from "@prisma/client";
import AutoComplete from "antd/lib/auto-complete";
import { FC, useContext, useState } from "react";
import { KeywordsCtx } from "../../services/context/keywords-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import KeywordTag from "./keyword-tag";

type Props = {
  value?: Map<number, keyword>;
  onChange?: (value: Map<number, keyword>) => void;
  setError?: (e: string) => void;
  max?: number;
};

const KeywordListInput: FC<Props> = ({
  value = new Map<number, keyword>(),
  onChange = () => {},
  setError = () => {},
  max = 10,
}) => {
  const { keywords } = useContext(KeywordsCtx);
  const { en } = useContext(LanguageCtx);

  const [search, setSearch] = useState<string>("");

  const options = keywords
    .map((k) => ({
      label: en ? k.name_en || k.name_fr || "" : k.name_fr || k.name_en || "",
      value: en ? k.name_en || k.name_fr || "" : k.name_fr || k.name_en || "",
      keyword: k,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  function onSelect(optionValue: string, option: typeof options[number]) {
    setSearch("");
    if (!value.has(option.keyword.id) && value.size >= max) return setError(`Maximum ${max}`);
    onChange(new Map(value).set(option.keyword.id, option.keyword));
  }

  function onDelete(id: number) {
    value.delete(id);
    onChange(new Map(value));
  }

  return (
    <div>
      <AutoComplete
        options={options}
        value={search}
        onChange={setSearch}
        filterOption
        notFoundContent={en ? "No Matches" : "Pas de Correspondance"}
        onSelect={onSelect}
      />
      {Array.from(value.values()).map((k) => (
        <KeywordTag key={k.id} keyword={k} editable deletable onDelete={onDelete} />
      ))}
    </div>
  );
};

export default KeywordListInput;
