import React from "react";
import PageRoutes from "../../routing/page-routes";
import SafeLink from "../link/safe-link";
import Tag from "antd/lib/tag";
import colorFromString from "../../utils/front-end/color-from-string";

const getMemberAuthor = (
  product_member_author: Array<{
    member: {
      id: number;
      account: { first_name: string; last_name: string };
    };
  }>
) => {
  const memberNames = product_member_author.map((member_author) => {
    const name =
      member_author.member.account.first_name +
      " " +
      member_author.member.account.last_name;
    return (
      // eslint-disable-next-line react/jsx-key
      <SafeLink href={PageRoutes.memberProfile(member_author.member.id)}>
        <Tag color={colorFromString(name)}>{name}</Tag>
      </SafeLink>
    );
  });
  return <>{memberNames}</>;
};

export default getMemberAuthor;
