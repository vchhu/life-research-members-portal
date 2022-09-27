import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { main_members } from "@prisma/client";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { msalInstance } from "../../../auth-config";
import ApiRoutes from "../../utils/front-end/api-routes";
import authHeader from "../../utils/front-end/auth-header";

const ViewMemberPage: NextPage = () => {
  const [member, setMember] = useState<main_members | null>(null);
  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    async function fetchMember(id: string) {
      const res = await fetch(ApiRoutes.member + id, { headers: await authHeader() });
      if (!res.ok) return console.error(await res.text());
      setMember(await res.json());
    }
    if (id && msalInstance.getActiveAccount()) fetchMember(id).catch((e) => console.error(e));
  }, [id]);

  function authenticatedHtml() {
    if (!member) return <div>Loading...</div>;
    return (
      <>
        <h1>{member.first_name + " " + member.last_name}</h1>
        <pre>{JSON.stringify(member, null, 2)}</pre>
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

export default ViewMemberPage;
