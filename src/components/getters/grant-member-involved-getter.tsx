import React from "react";
import PageRoutes from "../../routing/page-routes";
import SafeLink from "../link/safe-link";
import Tag from "antd/lib/tag";
import colorFromString from "../../utils/front-end/color-from-string";

const getMemberInvolved = (
  grant_member_involved: Array<{
    member: {
      id: number;
      account: { first_name: string; last_name: string };
    };
  }>
) => {
  const memberNames = grant_member_involved.map((member_involved) => {
    const name =
      member_involved.member.account.first_name +
      " " +
      member_involved.member.account.last_name;
    return (
      // eslint-disable-next-line react/jsx-key
      <SafeLink href={PageRoutes.memberProfile(member_involved.member.id)}>
        <Tag color={colorFromString(name)}>{name}</Tag>
      </SafeLink>
    );
  });
  return <>{memberNames}</>;
};

export default getMemberInvolved;
