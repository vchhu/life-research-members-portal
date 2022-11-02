import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { MemberPrivateInfo } from "../../services/_types";
import React from "react";
import { LanguageCtx } from "../../services/context/language-ctx";

const { useBreakpoint } = Grid;

type Props = {
  member: MemberPrivateInfo;
};

const PrivateMemberDescription: FC<Props> = ({ member }) => {
  const screens = useBreakpoint();
  const { en } = useContext(LanguageCtx);

  let address = "";
  if (member.address) address += member.address;
  if (member.city) {
    if (address) address += ", ";
    address += member.city;
  }
  if (member.province) {
    if (address) address += ", ";
    address += member.province;
  }
  if (member.country) {
    if (address) address += ", ";
    address += member.country;
  }
  if (member.postal_code) {
    if (address) address += ", ";
    address += member.postal_code;
  }

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: "2rem" }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item label={en ? "Address" : "Adresse"} style={{ whiteSpace: "break-spaces" }}>
        {address}
      </Item>
      <Item label={en ? "Mobile Phone" : "Téléphone mobile"}>{member.mobile_phone}</Item>
      <Item label={en ? "Date Joined" : "Date d'inscription"}>
        {member.date_joined?.split("T")[0]}
      </Item>
      <Item label={en ? "Active" : "Active"}>
        {member.is_active
          ? en
            ? "Yes"
            : "Oui"
          : (en ? "No, Last Active: " : "Non, Dernier Actif: ") + member.last_active?.split("T")[0]}
      </Item>
    </Descriptions>
  );
};

export default PrivateMemberDescription;
