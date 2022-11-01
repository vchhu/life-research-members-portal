// See https://ant.design/components/form/#components-form-demo-customized-form-controls

import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import type { keyword } from "@prisma/client";
import AutoComplete from "antd/lib/auto-complete";
import Button from "antd/lib/button/button";
import Card from "antd/lib/card";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { KeywordsCtx } from "../../services/context/keywords-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import type { KeywordInfo } from "../../services/_types";
import KeywordTag from "./keyword-tag";
import NewKeywordModal from "./new-keyword-modal";

type Props = {
  id?: string;
  value?: Map<number, keyword>;
  onChange?: (value: Map<number, keyword>) => void;
  setErrors?: (e: string[] | undefined) => void;
  max?: number;
};

const KeywordSelector: FC<Props> = ({
  id = "",
  value = new Map<number, keyword>(),
  max = 10,
  onChange,
  setErrors,
}) => {
  const { keywords } = useContext(KeywordsCtx);
  const { en } = useContext(LanguageCtx);

  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialValue, setModalInitialValue] = useState<KeywordInfo>();

  useEffect(() => {
    setModalInitialValue(
      en ? { name_en: searchValue, name_fr: "" } : { name_en: "", name_fr: searchValue }
    );
  }, [searchValue, en]);

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

  function onClickCreate() {
    if (value.size >= max) return setErrors?.([`Maximum ${max}`]);
    setModalOpen(true);
  }

  function onCreate(keyword: keyword) {
    setModalOpen(false);
    addToList(keyword);
  }

  function addToList(keyword: keyword) {
    setSelectedValue("");
    if (!value.has(keyword.id) && value.size >= max) return setErrors?.([`Maximum ${max}`]);
    onChange?.(new Map(value).set(keyword.id, keyword));
  }

  function onDelete(id: number) {
    value.delete(id);
    onChange?.(new Map(value));
    setErrors?.(undefined);
  }

  function onEdit(updatedKeyword: keyword) {
    onChange?.(new Map(value).set(updatedKeyword.id, updatedKeyword));
  }

  return (
    <>
      <div className="keyword-selector">
        <div className="header">
          <AutoComplete
            id={id}
            className="autocomplete"
            placeholder={en ? "Search Existing..." : "Rechercher existant..."}
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            filterOption
            notFoundContent={en ? "No Matches" : "Pas de Correspondance"}
            onSelect={onSelect}
            onSearch={(v) => setSearchValue(v)}
          />
          <Button
            className="create-new-button"
            type="primary"
            icon={<PlusOutlined />}
            onClick={onClickCreate}
          >
            {en ? "Create New" : "Créer un Nouveau"}
          </Button>
        </div>
        <Card className="tag-viewport" size="small">
          {Array.from(value.values()).map((k) => (
            <KeywordTag
              key={k.id}
              keyword={k}
              editable
              deletable
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </Card>
      </div>

      <NewKeywordModal
        open={modalOpen}
        onSuccess={onCreate}
        onCancel={() => setModalOpen(false)}
        initialValue={modalInitialValue}
      />
    </>
  );
};

export default KeywordSelector;
