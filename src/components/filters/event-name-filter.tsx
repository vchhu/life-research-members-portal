import Select, { SelectProps } from "antd/lib/select";
import { FC, useContext, useMemo } from "react";
import { AllEventsCtx } from "../../services/context/all-events-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import type { EventPublicInfo } from "../../services/_types";
import fuzzyIncludes from "../../utils/front-end/fuzzy-includes";

function getName(event: EventPublicInfo, en: boolean) {
  return en ? event.name_en : event.name_fr;
}

type Props = {
  id?: string;
  value?: Set<number>;
  onChange?: (value: Set<number>) => void;
  getPopupContainer?: SelectProps["getPopupContainer"];
};

const EventNameFilter: FC<Props> = ({
  id,
  value = new Set<number>(),
  onChange = () => {},
  getPopupContainer,
}) => {
  const { allEvents } = useContext(AllEventsCtx);
  const { en } = useContext(LanguageCtx);

  const valueArray = useMemo(() => Array.from(value.values()), [value]);

  const options = useMemo(
    () => allEvents.map((m) => ({ label: getName(m, en), value: m.id })),
    [allEvents, en]
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

export default EventNameFilter;
