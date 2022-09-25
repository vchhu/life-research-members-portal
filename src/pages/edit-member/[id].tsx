import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { main_Members } from "@prisma/client";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { msalInstance } from "../../../auth-config";
import ApiRoutes from "../../utils/front-end/api-routes";
import authHeader from "../../utils/front-end/auth-header";

const EditMember: NextPage = () => {
  const [member, setMember] = useState<main_Members | null>(null);
  const router = useRouter();
  const { id } = router.query as { id: string };

  async function deleteMember(member: main_Members) {
    const confirmation = confirm(
      "Are you sure you want to delete Member: " + member.first_name + " " + member.last_name + "?"
    );
    if (!confirmation) return;
    const result = await fetch(ApiRoutes.deleteMember + id, { headers: await authHeader() });
    if (!result.ok) return console.error(await result.text());
    alert("Member: " + member.first_name + " " + member.last_name + " deleted successfully.");
    router.push("/");
  }

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
        <button onClick={() => deleteMember(member)}>DELETE</button>
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

export default EditMember;
