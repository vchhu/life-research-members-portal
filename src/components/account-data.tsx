import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { auth_accounts } from "@prisma/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";

let cachedLocalAccount: auth_accounts | null = null;

const AccountData: FunctionComponent = () => {
  const { instance } = useMsal();
  const user = instance.getActiveAccount();
  const [localAccount, setLocalAccount] = useState(cachedLocalAccount);

  async function fetchLocalAccount() {
    try {
      const accountRes = await fetch(ApiRoutes.account, { headers: await authHeader() });
      if (!accountRes.ok) return console.error(await accountRes.text());
      const account = await accountRes.json();
      setLocalAccount(account);
      cachedLocalAccount = account;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!cachedLocalAccount) fetchLocalAccount();
  }, []);

  function localAccountData() {
    if (!localAccount) return <p>Loading...</p>;
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
