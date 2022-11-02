import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import type { FC } from "react";
import type { AccountRes } from "../../pages/api/account/[id]";

const { useBreakpoint } = Grid;

type Props = {
  account: AccountRes;
};

const AccountDescription: FC<Props> = ({ account }) => {
  const screens = useBreakpoint();

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: "2rem" }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item label="Login Email">{account.login_email}</Item>
      <Item label="Microsoft ID">{account.microsoft_id}</Item>
      <Item label="Admin">{account.is_admin ? "Yes" : "No"}</Item>
      <Item label="Member">{account.member ? "Yes" : "No"}</Item>
    </Descriptions>
  );
};

export default AccountDescription;
