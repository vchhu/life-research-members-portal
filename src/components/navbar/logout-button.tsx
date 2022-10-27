import Button from "antd/lib/button";
import { FC, useContext } from "react";
import { AccountCtx } from "../../api-facade/account-ctx";

const LogoutButton: FC = () => {
  const { logout } = useContext(AccountCtx);

  return (
    <Button type="primary" onClick={logout} className="logout-button">
      Logout
    </Button>
  );
};

export default LogoutButton;
