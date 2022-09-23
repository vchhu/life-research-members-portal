import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { AccountInfo } from "@azure/msal-browser";
import React, { FunctionComponent } from "react";
import useForceUpdate from "../utils/front-end/use-force-update";

const UserData: FunctionComponent = () => {
  const forceUpdate = useForceUpdate();
  const { accounts, instance } = useMsal();
  const user = instance.getActiveAccount();

  const handleSwitchAccount = (user: AccountInfo | null) => {
    instance.setActiveAccount(user);
    forceUpdate();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allUserData = (
    <>
      <h2>All User Data:</h2>
      {accounts.map((user) => (
        <React.Fragment key={user.localAccountId}>
          <h3>{user.username}</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <button onClick={() => handleSwitchAccount(user)}>Switch to {user.username}</button>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <>
      <AuthenticatedTemplate>
        <h1>You are signed in!</h1>
        <h2>Active User Data:</h2>
        <h3>{user?.username}</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        {allUserData}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>Please sign in</h1>
        {allUserData}
      </UnauthenticatedTemplate>
    </>
  );
};

export default UserData;
