import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { PublicMemberInfo } from "../../services/_types";
import GetLanguage from "../../utils/front-end/get-language";
import KeywordTag from "../keywords/keyword-tag";
import React from "react";
import { LanguageCtx } from "../../services/context/language-ctx";

const { useBreakpoint } = Grid;

type Props = {
  member: PublicMemberInfo;
};

const PublicMemberDescription: FC<Props> = ({ member }) => {
  const screens = useBreakpoint();
  const { en } = useContext(LanguageCtx);

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: "2rem" }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item label={en ? "About Me" : "À Propos de Moi"} style={{ whiteSpace: "break-spaces" }}>
        {en ? member.about_me_en : member.about_me_fr}
      </Item>
      <Item label={en ? "Faculty" : "Faculté"}>
        <GetLanguage obj={member.faculty} />
      </Item>
      <Item label={en ? "Member Type" : "Type de Membre"}>
        <GetLanguage obj={member.member_type} />
      </Item>
      <Item
        label={en ? "Problems I Work On" : "Problèmes sur Lesquels Je Travaille"}
        labelStyle={{ whiteSpace: "break-spaces" }}
      >
        {member.problem.map((p, i) => (
          <React.Fragment key={i}>
            {`${i + 1}. `}
            <GetLanguage obj={p} />
            <br />
          </React.Fragment>
        ))}
      </Item>
      <Item label={en ? "Keywords" : "Mots Clés"}>
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
      {/* <Item label={en ? "Links" : "Liens"}>{null}</Item> */}
    </Descriptions>
  );
};

export default PublicMemberDescription;
