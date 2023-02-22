import Select, { SelectProps } from "antd/lib/select";
import { FC, useContext, useMemo } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import { ProductTitlesCtx } from "../../services/context/products-title-ctx";
import GetLanguage from "../../utils/front-end/get-product-language";

type Props = {
  id?: string;
  value?: Set<number>;
  onChange?: (value: Set<number>) => void;
  getPopupContainer?: SelectProps["getPopupContainer"];
};

const ProductTitleFilter: FC<Props> = ({
  id,
  value = new Set<number>(),
  onChange = () => {},
  getPopupContainer,
}) => {
  const { productTitles } = useContext(ProductTitlesCtx);
  const { en } = useContext(LanguageCtx);

  const valueArray = useMemo(() => Array.from(value.values()), [value]);

  const options = useMemo(
    () => [
      { label: en ? "Empty" : "Vide", value: 0 },
      ...productTitles.map((title) => ({
        label: <GetLanguage obj={title} />,
        value: title.id,
      })),
    ],
    [en, productTitles]
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
      className="product-title-filter"
      value={valueArray}
      mode="multiple"
      options={options}
      allowClear
      showSearch={false}
      showArrow
      onSelect={onSelect}
      onDeselect={onDelete}
      getPopupContainer={getPopupContainer}
    ></Select>
  );
};

export default ProductTitleFilter;
