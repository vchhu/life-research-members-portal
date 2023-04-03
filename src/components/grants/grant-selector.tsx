import React, { FC, useContext, useEffect, useState } from "react";
import type { grant } from "@prisma/client";
import { GrantsCtx } from "../../services/context/grants-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import AutoComplete from "antd/lib/auto-complete";
import { GrantPublicInfo } from "../../services/_types";
import GrantTag from "./grant-tag";
import { Card } from "antd";

type Props = {
  id?: string;
  value?: Map<number, grant>;
  onChange?: (value: Map<number, grant>) => void;
  setErrors?: (e: string[] | undefined) => void;
  max?: number;
};

const GrantSelector: FC<Props> = ({
  id = "",
  value = new Map<number, grant>(),
  max = 10,
  onChange = () => {},
  setErrors = () => {},
}) => {
  const { grants, refresh: refreshGrants, set } = useContext(GrantsCtx);
  const { en } = useContext(LanguageCtx);

  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    refreshGrants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getOption(g: grant) {
    return { label: g.title, value: g.title, grant: g };
  }

  const options = grants
    .map((g) => getOption(g))
    .sort((a, b) => a.label.localeCompare(b.label));

  function clearState() {
    setSelectedValue("");
    setSearchValue("");
  }

  function onSelect(optionValue: string, option: typeof options[number]) {
    clearState();
    addToList(option.grant);
  }

  function addToList(grant: grant) {
    if (!value.has(grant.id) && value.size >= max)
      return setErrors?.([`Maximum ${max}`]);
    onChange?.(new Map(value).set(grant.id, grant));
  }

  function onDelete(id: number) {
    const next = new Map(value);
    next.delete(id);
    onChange(next);
    setErrors(undefined);
  }

  function onEdit(updatedGrant: grant) {
    set(updatedGrant);
    onChange(new Map(value).set(updatedGrant.id, updatedGrant));
  }

  return (
    <>
      <div className="grant-selector">
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
            onSearch={setSearchValue}
          />
        </div>
        <Card className="tag-viewport" size="small">
          {Array.from(value.values()).map((g) => (
            <GrantTag
              key={g.id}
              grant={g}
              editable
              deletable
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </Card>
      </div>
    </>
  );
};

export default GrantSelector;
