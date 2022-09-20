import { IMsalContext, useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";

function handleLogout(context: IMsalContext) {
  context.instance.logout().catch((e: any) => {
    console.error(e);
  });
}

const LogoutButton: FunctionComponent = () => {
  const msalContext = useMsal();
  return <button onClick={() => handleLogout(msalContext)}>Logout</button>;
};

export default LogoutButton;
