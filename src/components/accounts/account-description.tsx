import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FunctionComponent } from "react";
import { all_account_info } from "../../../prisma/types";

const { useBreakpoint } = Grid;

type Props = {
  account: all_account_info;
};

const AccountDescription: FunctionComponent<Props> = ({ account }) => {
  const screens = useBreakpoint();

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: "2rem" }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item label="Login Email">{account.microsoft_email}</Item>
      <Item label="Microsoft ID">{account.microsoft_id}</Item>
      <Item label="Admin">{account.is_admin ? "Yes" : "No"}</Item>
      <Item label="Member">{account.main_members ? "Yes" : "No"}</Item>
    </Descriptions>
  );
};

export default AccountDescription;
