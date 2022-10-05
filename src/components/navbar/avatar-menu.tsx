import { blue } from "@ant-design/colors";
import { useMsal } from "@azure/msal-react";
import Avatar from "antd/lib/avatar";
import Dropdown from "antd/lib/dropdown";
import { FunctionComponent } from "react";
import { DownOutlined } from "@ant-design/icons";
import Menu from "antd/lib/menu";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import Card from "antd/lib/card";
import LogoutButton from "./logout-button";
import Space from "antd/lib/space";

const AvatarMenu: FunctionComponent = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();

  const avatarLabel = account?.name?.split(" ").reduce((prev, curr) => prev + curr[0], "");
  const avatarColor = blue[5];

  const items: MenuItemType[] = [{ label: "Logout", key: "Logout" }];
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
      <Avatar
        className="avatar"
        size="large"
        gap={6}
        style={{ fontSize: "3rem", backgroundColor: avatarColor, cursor: "pointer" }}
      >
        {avatarLabel}
      </Avatar>
    </Dropdown>
  );
};

export default AvatarMenu;
