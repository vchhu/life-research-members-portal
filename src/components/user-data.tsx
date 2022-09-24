import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import React, { FunctionComponent } from "react";

const UserData: FunctionComponent = () => {
  const { instance } = useMsal();
  const user = instance.getActiveAccount();

  return (
    <>
      <AuthenticatedTemplate>
        <h1>You are signed in!</h1>
        <h2>{user?.name}</h2>
        <h2>{user?.username}</h2>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>Please sign in</h1>
      </UnauthenticatedTemplate>
    </>
  );
};

export default UserData;
