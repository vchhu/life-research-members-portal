import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { auth_accounts } from "@prisma/client";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { LocalAccountCtx } from "../context/local-account-ctx";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";

const AccountData: FunctionComponent = () => {
  const { localAccount, loading } = useContext(LocalAccountCtx);
  const { instance } = useMsal();
  const user = instance.getActiveAccount();

  function localAccountData() {
    if (loading) return <p>Loading...</p>;
    if (!localAccount) return <p>Account is not registered.</p>;
    return (
      <>
        <p>{localAccount.microsoft_email}</p>
        <p>{localAccount.microsoft_id}</p>
        <p>{"admin: " + localAccount.is_admin}</p>
      </>
    );
  }

  return (
    <>
      <AuthenticatedTemplate>
        <h1>Welcome!</h1>
        <h2>Microsoft Account:</h2>
        <p>{user?.name}</p>
        <p>{user?.username}</p>
        <p>{user?.localAccountId}</p>
        <h2>Local Account:</h2>
        {localAccountData()}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>Please sign in...</h1>
      </UnauthenticatedTemplate>
    </>
  );
};

export default AccountData;
