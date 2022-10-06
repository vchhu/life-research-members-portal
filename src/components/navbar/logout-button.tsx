import Button from "antd/lib/button";
import { FunctionComponent, useContext } from "react";
import { AccountCtx } from "../../context/account-ctx";

const LogoutButton: FunctionComponent = () => {
  const { logout } = useContext(AccountCtx);

  return (
    <Button type="primary" onClick={logout} className="logout-button">
      Logout
    </Button>
  );
};

export default LogoutButton;
