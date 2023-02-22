// See https://ant.design/components/form/#components-form-demo-customized-form-controls

import Select, { SelectProps } from "antd/lib/select";
import { FC, useContext, useMemo } from "react";
import { AllProductsCtx } from "../../services/context/all-products-ctx";
import type { ProductPublicInfo } from "../../services/_types";
import fuzzyIncludes from "../../utils/front-end/fuzzy-includes";

function getMemberAuthor(product: ProductPublicInfo) {
  return product.product_member_author + " " + product.product_member_author;
}

function getallAuthor(product: ProductPublicInfo) {
  return product.all_author?.first_name + " " + product.all_author?.last_name;
}

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
  const { allProducts } = useContext(AllProductsCtx);

  const valueArray = useMemo(() => Array.from(value.values()), [value]);

  const options = useMemo(
    () => allProducts.map((m) => ({ label: getallAuthor(m), value: m.id })),
    [allProducts]
  );

  function onSelect(id: number) {
    value.add(id);
    onChange(value);
  }

  function onDelete(id: number) {
    value.delete(id);
    onChange(value);
  }

  function filterOption(
    input: string,
    option?: typeof options[number]
  ): boolean {
    if (!option) return false;
    return fuzzyIncludes(option.label, input);
  }

  return (
    <Select
      id={id}
      className="name-filter"
      value={valueArray}
      filterOption={filterOption}
      mode="multiple"
      options={options}
      allowClear
      onSelect={onSelect}
      onDeselect={onDelete}
      getPopupContainer={getPopupContainer}
    ></Select>
  );
};

export default ProductAuthorFilter;
