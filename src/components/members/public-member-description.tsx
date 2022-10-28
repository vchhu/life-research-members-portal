import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import type { FC } from "react";
import type { PublicMemberInfo } from "../../api-facade/_types";
import type { keyword } from "@prisma/client";
import colorFromString from "../../utils/front-end/color-from-string";
import formatName from "../../utils/front-end/format-name";
import KeywordTag from "./keyword-tag";
import { blue } from "@ant-design/colors";

const { useBreakpoint } = Grid;

type Props = {
  member: PublicMemberInfo;
};

const PublicMemberDescription: FC<Props> = ({ member }) => {
  const screens = useBreakpoint();

  // let address = "";
  // if (member.address) address += member.address;
  // if (member.city) {
  //   if (address) address += ", ";
  //   address += member.city;
  // }
  // if (member.province) {
  //   if (address) address += ", ";
  //   address += member.province;
  // }
  // if (member.country) {
  //   if (address) address += ", ";
  //   address += member.country;
  // }
  // if (member.postal_code) {
  //   if (address) address += ", ";
  //   address += member.postal_code;
  // }

  function tagColor(k: keyword) {
    return colorFromString((k.name_en || "") + (k.name_fr + ""));
  }

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: "2rem" }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item label="About Me">{member.about_me}</Item>
      <Item label="Faculty">{formatName(member.faculty)}</Item>
      <Item label="Member Type">{formatName(member.member_type)}</Item>
      <Item label="Problems I Work On">
        {member.problem.map((p, i) => (
          <>
            {`${i + 1}. ` + formatName(p)}
            <br />
          </>
        ))}
      </Item>
      <Item label="Keywords">
        {member.has_keyword.map((entry, i) => (
          <KeywordTag key={i} keyword={entry.keyword} />
        ))}
      </Item>
      <Item label="Email">
        <a href={"mailto:" + member.work_email}>{member.work_email}</a>
      </Item>
      <Item label="Phone">
        <a href={"tel:" + member.work_phone}>{member.work_phone}</a>
      </Item>
      <Item label="Links">{null}</Item>
    </Descriptions>
  );
};

export default PublicMemberDescription;
