import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { MemberPublicInfo } from "../../services/_types";
import GetLanguage from "../../utils/front-end/get-language";
import KeywordTag from "../keywords/keyword-tag";
import React from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import Tag from "antd/lib/tag";
import SafeLink from "../link/safe-link";
import TikTokIcon from "../icons/tiktok-icon";
import CvIcon from "../icons/cv-icon";
import WebsiteIcon from "../icons/website-icon";
import MemberTypeLink from "../link/member-type-link";
import FacultyLink from "../link/faculty-link";

const { useBreakpoint } = Grid;

type Props = {
  member: MemberPublicInfo;
};

const PublicMemberDescription: FC<Props> = ({ member }) => {
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
      <Item label={en ? "About Me" : "À Propos de Moi"} style={{ whiteSpace: "break-spaces" }}>
        {en ? member.about_me_en : member.about_me_fr}
      </Item>
      <Item label={en ? "Faculty" : "Faculté"}>
        <FacultyLink faculty={member.faculty} />
      </Item>
      <Item label={en ? "Member Type" : "Type de Membre"}>
        <MemberTypeLink member_type={member.member_type} />
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
          <KeywordTag key={i} keyword={entry.keyword} linked />
        ))}
      </Item>
      <Item label="Email">
        <a href={"mailto:" + member.work_email}>{member.work_email}</a>
      </Item>
      <Item label="Phone">
        <a href={"tel:" + member.work_phone}>{member.work_phone}</a>
      </Item>
      <Item label={en ? "Links" : "Liens"}>
        <>
          {member.cv_link ? (
            <SafeLink href={member.cv_link} external>
              <Tag icon={<CvIcon />} color="#002766">
                CV
              </Tag>
            </SafeLink>
          ) : null}

          {member.website_link ? (
            <SafeLink href={member.website_link} external>
              <Tag icon={<WebsiteIcon />} color="#002766">
                Website
              </Tag>
            </SafeLink>
          ) : null}

          {member.linkedin_link ? (
            <SafeLink href={member.linkedin_link} external>
              <Tag icon={<LinkedinOutlined />} color="#0a66c2">
                LinkedIn
              </Tag>
            </SafeLink>
          ) : null}

          {member.facebook_link ? (
            <SafeLink href={member.facebook_link} external>
              <Tag icon={<FacebookOutlined />} color="#4267B2">
                Facebook
              </Tag>
            </SafeLink>
          ) : null}

          {member.twitter_link ? (
            <SafeLink href={member.twitter_link} external>
              <Tag icon={<TwitterOutlined />} color="#1da1f2">
                Twitter
              </Tag>
            </SafeLink>
          ) : null}

          {member.tiktok_link ? (
            <SafeLink href={member.tiktok_link} external>
              <Tag icon={<TikTokIcon />} color="#0D0D0D">
                TikTok
              </Tag>
            </SafeLink>
          ) : null}
        </>
      </Item>
    </Descriptions>
  );
};

export default PublicMemberDescription;
