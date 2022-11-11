import { useMsal } from "@azure/msal-react";
import Dropdown from "antd/lib/dropdown";
import { FC, useContext } from "react";
import Typography from "antd/lib/typography";
import Card from "antd/lib/card";
import LogoutButton from "./logout-button";
import { ActiveAccountCtx } from "../../services/context/active-account-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import CheckCircleTwoTone from "@ant-design/icons/lib/icons/CheckCircleTwoTone";
import Spin from "antd/lib/spin";
import LoginButton from "./login-button";

const AvatarMenu: FC = () => {
  const { en } = useContext(LanguageCtx);
  const { localAccount, loading } = useContext(ActiveAccountCtx);

  if (loading) return <Spin />;
  if (!localAccount) return <LoginButton />; // Fallback in case of error

  const avatarLabel = localAccount.first_name[0] + localAccount.last_name[0];
  const name = localAccount.first_name + " " + localAccount.last_name;
  const email = localAccount.login_email;

  const administrator = localAccount.is_admin ? (
    <Typography>
      {en ? "Administrator" : "Administrateur"} &nbsp; <CheckCircleTwoTone />
    </Typography>
  ) : null;

  const member = localAccount.member ? (
    <Typography>
      {en ? "Member" : "Membre"} &nbsp; <CheckCircleTwoTone />
    </Typography>
  ) : null;

  const dropdown = (
    <Card bodyStyle={{ padding: 0 }}>
      <div className="avatar-dropdown">
        <Typography>{name}</Typography>
        <Typography>{email}</Typography>
        {administrator}
        {member}
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
