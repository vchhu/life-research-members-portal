import Button from "antd/lib/button";
import { FC, useContext } from "react";
import { ActiveAccountCtx } from "../../services/context/active-account-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";

const LogoutButton: FC = () => {
  const { logout } = useContext(ActiveAccountCtx);
  const { en } = useContext(LanguageCtx);

  return (
    <Button type="primary" onClick={logout} className="logout-button">
      {en ? "Logout" : "Déconnecter"}
    </Button>
  );
};

export default LogoutButton;
