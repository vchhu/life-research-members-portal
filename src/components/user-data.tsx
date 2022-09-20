import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";

const UserData: FunctionComponent = () => {
  const msalContext = useMsal();
  const user = msalContext.accounts[0];
  return (
    <>
      <AuthenticatedTemplate>
        <h1>You are signed in!</h1>
        <h2>User Data:</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>Please sign in</h1>
      </UnauthenticatedTemplate>
    </>
  );
};

export default UserData;
