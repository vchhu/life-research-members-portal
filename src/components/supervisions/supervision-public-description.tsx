import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { SupervisionPublicInfo } from "../../services/_types";
import { LanguageCtx } from "../../services/context/language-ctx";
import React from "react";

const { useBreakpoint } = Grid;

type Props = {
  supervision: SupervisionPublicInfo;
};

const PublicSupervisionDescription: FC<Props> = ({ supervision }) => {
  const screens = useBreakpoint();
  const { en } = useContext(LanguageCtx);

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: 0 }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item label={en ? "Last Name" : "Nom"}>{supervision.last_name}</Item>

      <Item label={en ? "First Name" : "Prénom"}>{supervision.first_name}</Item>

      <Item label={en ? "Start Date" : "Date de début"}>
        {supervision.start_date
          ? new Date(supervision.start_date).toISOString().split("T")[0]
          : ""}
      </Item>

      <Item label={en ? "End Date" : "Date de fin"}>
        {supervision.end_date
          ? new Date(supervision.end_date).toISOString().split("T")[0]
          : ""}
      </Item>

      <Item label={en ? "Faculty" : "Faculté"}>
        {supervision.faculty ? supervision.faculty.name_en : ""}
      </Item>

      <Item label={en ? "Level" : "Niveau"}>
        {supervision.level ? supervision.level.name_en : ""}
      </Item>

      <Item label={en ? "Note" : "Note"} style={{ whiteSpace: "break-spaces" }}>
        {supervision.note}
      </Item>
    </Descriptions>
  );
};

export default PublicSupervisionDescription;
