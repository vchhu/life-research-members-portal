// See https://ant.design/components/form/#components-form-demo-customized-form-controls
import type { all_author } from "@prisma/client";
import Select, { SelectProps } from "antd/lib/select";
import { LanguageCtx } from "../../services/context/language-ctx";
import AllAuthorTag from "../products/allAuthor-tag";

import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AllAuthorsCtx } from "../../services/context/all-authors-ctx";
import fuzzyIncludes from "../../utils/front-end/fuzzy-includes";

/* function getMemberAuthor(product: ProductPublicInfo) {
  return product.product_member_author + " " + product.product_member_author;
} */

type Props = {
  id?: string;
  value?: Set<number>;
  onChange?: (value: Set<number>) => void;
  getPopupContainer?: SelectProps["getPopupContainer"];
};

const ProductAuthorFilter: FC<Props> = ({
  id,
  value = new Set<number>(),
  onChange = () => {},
  getPopupContainer,
}) => {
  const { allAuthors, allAuthorMap } = useContext(AllAuthorsCtx);
  const { en } = useContext(LanguageCtx);

  const valueArray = useMemo(() => Array.from(value.values()), [value]);

  const getAllAuthor = useCallback(
    (k: all_author) => {
      let labelAndValue = "";
      if (en) {
        if (k.first_name) labelAndValue += k.first_name;
        if (k.first_name && k.last_name) labelAndValue += "  ";
        if (k.last_name) labelAndValue += k.last_name;
      }
      if (!en) {
        if (k.first_name) labelAndValue += k.first_name;
        if (k.first_name && k.last_name) labelAndValue += "  ";
        if (k.last_name) labelAndValue += k.last_name;
      }
      return { label: labelAndValue, value: k.id };
    },
    [en]
  );

  const options = useMemo(
    () =>
      allAuthors
        .map((k) => getAllAuthor(k))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [getAllAuthor, allAuthors]
  );

  /* const options = useMemo(
    () => allAuthors.map((m) => ({ label: getAllAuthor(m), value: m.id })),
    [getAllAuthor, allAuthors]
  );
 */
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

  function filterOption(
    input: string,
    option?: typeof options[number]
  ): boolean {
    if (!option) return false;
    return fuzzyIncludes(option.label, input);
  }

  function tagRender(
    props: Parameters<NonNullable<SelectProps["tagRender"]>>[0]
  ) {
    const allAuthors = allAuthorMap.get(props.value);
    if (!allAuthors) return <></>;
    return (
      <AllAuthorTag all_author={allAuthors} deletable onDelete={onDelete} />
    );
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
      filterOption={filterOption}
      allowClear
      onClear={onClear}
      tagRender={tagRender}
    ></Select>
  );
};

export default ProductAuthorFilter;
