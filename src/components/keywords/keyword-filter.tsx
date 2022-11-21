// See https://ant.design/components/form/#components-form-demo-customized-form-controls

import type { keyword } from "@prisma/client";
import Select, { SelectProps } from "antd/lib/select";
import { FC, useContext, useEffect, useState } from "react";
import { AllKeywordsCtx } from "../../services/context/all-keywords-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import blurActiveElement from "../../utils/front-end/blur-active-element";
import removeDiacritics from "../../utils/front-end/remove-diacritics";
import KeywordTag from "./keyword-tag";

type Props = {
  value?: Set<number>;
  onChange?: (value: Set<number>) => void;
  getPopupContainer?: SelectProps["getPopupContainer"];
};

const KeywordFilter: FC<Props> = ({
  value = new Set<number>(),
  onChange = () => {},
  getPopupContainer,
}) => {
  const { keywords, keywordMap, refresh: refreshKeywords } = useContext(AllKeywordsCtx);
  const { en } = useContext(LanguageCtx);
  const [open, setOpen] = useState(false);

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
    return { label: labelAndValue, value: k.id };
  }

  const options = keywords.map((k) => getOption(k)).sort((a, b) => a.label.localeCompare(b.label));

  function onSelect(id: number) {
    value.add(id);
    onChange(value);
  }

  function onDelete(id: number) {
    value.delete(id);
    onChange(value);
  }

  function onClear() {
    onChange(new Set());
  }

  function filterOption(input: string, option?: typeof options[number]): boolean {
    if (!option) return false;
    return removeDiacritics(option.label).includes(input);
  }

  return (
    <Select
      className="keyword-filter"
      mode="multiple"
      open={open}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onInputKeyDown={(e) => {
        if (e.key === "Escape") blurActiveElement();
      }}
      options={options}
      value={Array.from(value.values())}
      onSelect={onSelect}
      onDeselect={onDelete}
      getPopupContainer={getPopupContainer}
      filterOption={filterOption}
      allowClear
      onClear={onClear}
      tagRender={({ value }) => (
        <KeywordTag
          keyword={keywordMap.get(value)!}
          deletable
          onDelete={onDelete}
          onClick={(k, e) => {
            e.stopPropagation(); // stop the dropdown from opening / closing on delete
            onDelete(k.id);
          }}
        />
      )}
    ></Select>
  );
};

export default KeywordFilter;
