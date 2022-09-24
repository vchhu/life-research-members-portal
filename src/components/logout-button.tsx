import { FunctionComponent } from "react";
import { msalInstance } from "../../auth-config";

// TODO: make this logout from server
// TODO: make server session expire
function logout() {
  msalInstance.logoutRedirect({ onRedirectNavigate: () => false }).catch((e: any) => {
    console.error(e);
  });
}

const LogoutButton: FunctionComponent = () => {
  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
