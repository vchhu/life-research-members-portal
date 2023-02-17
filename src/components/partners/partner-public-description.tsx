import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { PartnerPublicInfo } from "../../services/_types";
import GetLanguage from "../../utils/front-end/get-language";
import React from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import Tag from "antd/lib/tag";
import SafeLink from "../link/safe-link";
import PartnerScopeLink from "../link/partner-scope-link";
import PartnerTypeLink from "../link/partner-type-link";
const { useBreakpoint } = Grid;

type Props = {
  partner: PartnerPublicInfo;
};

const PublicPartnerDescription: FC<Props> = ({ partner }) => {
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
      <Item label={en ? "Orgnanization type" : "Type d'organisation"}>
        <PartnerTypeLink org_type={partner.org_type} />
      </Item>
      <Item label={en ? "Organization Scope" : "Champ d'organisation"}>
        <PartnerScopeLink org_scope={partner.org_scope} />
      </Item>
      <Item label={en ? "Organization Description" : "Description"}>
        {partner.description}
      </Item>
    </Descriptions>
  );
};

export default PublicPartnerDescription;
