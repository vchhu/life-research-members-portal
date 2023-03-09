import React, { FC, useContext, useMemo } from "react";
import Select, { SelectProps } from "antd/lib/select";
import { AllAuthorsCtx } from "../../services/context/all-authors-ctx";
import fuzzyIncludes from "../../utils/front-end/fuzzy-includes";

type Props = {
  id?: string;
  value?: Set<number>;
  onChange?: (value: Set<number>) => void;
  getPopupContainer?: SelectProps["getPopupContainer"];
};

const ProductAllAuthorFilter: FC<Props> = ({
  id,
  value = new Set<number>(),
  onChange = () => {},
  getPopupContainer,
}) => {
  const { productAllAuthors } = useContext(AllAuthorsCtx);

  const valueArray = useMemo(() => Array.from(value.values()), [value]);

  const options = useMemo(
    () => productAllAuthors.map((m) => ({ label: m.all_author, value: m.id })),
    [productAllAuthors]
  );

  function onSelect(id: number) {
    value.add(id);
    onChange(value);
  }

  function onDelete(id: number) {
    value.delete(id);
    onChange(value);
  }

  return (
    <Select
      id={id}
      className="name-filter"
      mode="multiple"
      options={options}
      value={valueArray}
      onSelect={onSelect}
      onDeselect={onDelete}
      getPopupContainer={getPopupContainer}
      allowClear
    />
  );
};

export default ProductAllAuthorFilter;
