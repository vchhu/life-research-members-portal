import Button from "antd/lib/button";
import { FunctionComponent, useContext } from "react";
import { msalInstance } from "../../../auth-config";
import { LocalAccountCtx } from "../../context/local-account-ctx";

// TODO: make this logout from server
// TODO: make server session expire

const LogoutButton: FunctionComponent = () => {
  const { refresh } = useContext(LocalAccountCtx);

  function logout() {
    msalInstance.logoutRedirect({ onRedirectNavigate: () => false }).catch((e: any) => {
      console.error(e);
    });
    msalInstance.setActiveAccount(null);
    refresh();
  }

  return (
    <Button type="primary" onClick={logout} className="logout-button">
      Logout
    </Button>
  );
};

export default LogoutButton;
