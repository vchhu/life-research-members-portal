import React from "react";
import PageRoutes from "../../routing/page-routes";
import SafeLink from "../link/safe-link";
import Tag from "antd/lib/tag";
import colorFromString from "../../utils/front-end/color-from-string";

const getInvestigatorMember = (
  grant_investigator_member: Array<{
    member: {
      id: number;
      account: { first_name: string; last_name: string };
    };
  }>
) => {
  const memberNames = grant_investigator_member.map((investigator_member) => {
    const name =
      investigator_member.member.account.first_name +
      " " +
      investigator_member.member.account.last_name;
    return (
      // eslint-disable-next-line react/jsx-key
      <SafeLink href={PageRoutes.memberProfile(investigator_member.member.id)}>
        <Tag color={colorFromString(name)}>{name}</Tag>
      </SafeLink>
    );
  });
  return <>{memberNames}</>;
};

export default getInvestigatorMember;
