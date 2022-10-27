import { useMsal } from "@azure/msal-react";
import Dropdown from "antd/lib/dropdown";
import type { FC } from "react";
import Typography from "antd/lib/typography";
import Card from "antd/lib/card";
import LogoutButton from "./logout-button";

const AvatarMenu: FC = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();

  const avatarLabel = account?.name?.split(" ").reduce((prev, curr) => prev + curr[0], "");

  const dropdown = (
    <Card bodyStyle={{ padding: 0 }}>
      <div className="avatar-dropdown">
        <Typography>{account?.name}</Typography>
        <Typography>{account?.username}</Typography>
        <div style={{ height: 16 }}></div>
        <LogoutButton />
      </div>
    </Card>
  );

  return (
    <Dropdown overlay={dropdown}>
      <div className="avatar">{avatarLabel}</div>
    </Dropdown>
  );
};

export default AvatarMenu;
