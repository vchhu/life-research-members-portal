import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { account } from "@prisma/client";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { msalInstance } from "../../../auth-config";
import ApiRoutes from "../../routing/api-routes";
import authHeader from "../../api-facade/headers/auth-header";

const ViewAccountPage: NextPage = () => {
  const [account, setAccount] = useState<account | null>(null);
  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    async function fetchMember(id: string) {
      const res = await fetch(ApiRoutes.account + id, { headers: await authHeader() });
      if (!res.ok) return console.error(await res.text());
      setAccount(await res.json());
    }
    if (id && msalInstance.getActiveAccount()) fetchMember(id).catch((e) => console.error(e));
  }, [id]);

  function authenticatedHtml() {
    if (!account) return <div>Loading...</div>;
    return (
      <>
        <h1>{account.login_email}</h1>
        <pre>{JSON.stringify(account, null, 2)}</pre>
      </>
    );
  }

  return (
    <>
      <UnauthenticatedTemplate>
        <div>Please Sign In</div>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>{authenticatedHtml()}</AuthenticatedTemplate>
    </>
  );
};

export default ViewAccountPage;
