import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { AccountRes } from "../../pages/api/account/[id]";
import { LanguageCtx } from "../../services/context/language-ctx";
import PageRoutes from "../../routing/page-routes";
import Link from "next/link";

const { useBreakpoint } = Grid;

type Props = {
  account: AccountRes;
};

const AccountDescription: FC<Props> = ({ account }) => {
  const screens = useBreakpoint();
  const { en } = useContext(LanguageCtx);

  const memberLink = (
    <Link href={account.member?.id ? PageRoutes.memberProfile(account.member.id) : PageRoutes._404}>
      {en ? "Yes" : "Oui"}
    </Link>
  );

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: "2rem" }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item label={en ? "Login Email" : "Compte Email"}>{account.login_email}</Item>
      <Item label={en ? "Admin" : "Admin"}>
        {account.is_admin ? (en ? "Yes" : "Oui") : en ? "No" : "Non"}
      </Item>
      <Item label={en ? "Member" : "Membre"}>
        {account.member ? memberLink : en ? "No" : "Non"}
      </Item>
    </Descriptions>
  );
};

export default AccountDescription;
