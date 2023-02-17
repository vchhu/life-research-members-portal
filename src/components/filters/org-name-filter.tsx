// See https://ant.design/components/form/#components-form-demo-customized-form-controls

import Select, { SelectProps } from "antd/lib/select";
import { FC, useContext, useMemo } from "react";
import { AllPartnersCtx } from "../../services/context/all-partners-ctx";
import type { PartnerPublicInfo } from "../../services/_types";
import fuzzyIncludes from "../../utils/front-end/fuzzy-includes";

function getName(organization: PartnerPublicInfo) {
  return organization.name_en;
}

type Props = {
  id?: string;
  value?: Set<number>;
  onChange?: (value: Set<number>) => void;
  getPopupContainer?: SelectProps["getPopupContainer"];
};

const OrgNameFilter: FC<Props> = ({
  id,
  value = new Set<number>(),
  onChange = () => {},
  getPopupContainer,
}) => {
  const { allPartners } = useContext(AllPartnersCtx);

  const valueArray = useMemo(() => Array.from(value.values()), [value]);

  const options = useMemo(
    () => allPartners.map((m) => ({ label: getName(m), value: m.id })),
    [allPartners]
  );

  function onSelect(id: number) {
    value.add(id);
    onChange(value);
  }

  function onDelete(id: number) {
    value.delete(id);
    onChange(value);
  }

  /* function filterOption(input: string, option?: typeof options[number]): boolean {
    if (!option) return false;
    return fuzzyIncludes(option.label, input);
  }
 */
  return (
    <Select
      id={id}
      className="name-filter"
      value={valueArray}
      //filterOption={filterOption}
      mode="multiple"
      options={options}
      allowClear
      onSelect={onSelect}
      onDeselect={onDelete}
      getPopupContainer={getPopupContainer}
    ></Select>
  );
};

export default OrgNameFilter;
