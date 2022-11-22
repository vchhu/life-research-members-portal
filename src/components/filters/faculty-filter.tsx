// See https://ant.design/components/form/#components-form-demo-customized-form-controls

import Select, { SelectProps } from "antd/lib/select";
import { FC, useContext, useMemo } from "react";
import { FacultiesCtx } from "../../services/context/faculties-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import GetLanguage from "../../utils/front-end/get-language";

type Props = {
  id?: string;
  value?: Set<number>;
  onChange?: (value: Set<number>) => void;
  getPopupContainer?: SelectProps["getPopupContainer"];
};

const FacultyFilter: FC<Props> = ({
  id,
  value = new Set<number>(),
  onChange = () => {},
  getPopupContainer,
}) => {
  const { faculties } = useContext(FacultiesCtx);
  const { en } = useContext(LanguageCtx);

  const valueArray = useMemo(() => Array.from(value.values()), [value]);

  const options = useMemo(
    () => [
      { label: en ? "Empty" : "Vide", value: 0 },
      ...faculties.map((t) => ({ label: <GetLanguage obj={t} />, value: t.id })),
    ],
    [en, faculties]
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
      className="faculty-filter"
      mode="multiple"
      value={valueArray}
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

export default FacultyFilter;
