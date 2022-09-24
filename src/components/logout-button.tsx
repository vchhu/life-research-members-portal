import { useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";
import { IPublicClientApplication } from "@azure/msal-browser";

// TODO: make this logout from server
// TODO: make server session expire
function handleLogout(instance: IPublicClientApplication) {
  instance.logoutRedirect({ onRedirectNavigate: () => false }).catch((e: any) => {
    console.error(e);
  });
}

const LogoutButton: FunctionComponent = () => {
  const { instance } = useMsal();
  return <button onClick={() => handleLogout(instance)}>Logout</button>;
};

export default LogoutButton;
