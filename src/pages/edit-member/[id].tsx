import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { main_Members } from "@prisma/client";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { msalInstance } from "../../../auth-config";
import ApiRoutes from "../../utils/front-end/api-routes";
import authHeader from "../../utils/front-end/auth-header";

const EditMember: NextPage = () => {
  const [member, setMember] = useState<main_Members | null>(null);
  const [changes, setChanges] = useState<Partial<main_Members> | null>(null);
  const router = useRouter();
  const { id } = router.query as { id: string };

  async function deleteMember() {
    if (!member) return;
    const confirmation = confirm(
      "Are you sure you want to delete Member: " + member.first_name + " " + member.last_name + "?"
    );
    if (!confirmation) return;
    const result = await fetch(ApiRoutes.deleteMember + id, { headers: await authHeader() });
    if (!result.ok) return console.error(await result.text());
    alert("Member: " + member.first_name + " " + member.last_name + " deleted successfully.");
    router.push("/");
  }

  async function updateMember() {
    if (!changes) return;
    const result = await fetch(ApiRoutes.updateMember + id, {
      headers: await authHeader(),
      body: JSON.stringify(changes),
      method: "PATCH",
    });
    if (!result.ok) return console.error(await result.text());
    const updated = await result.json();
    setMember(updated);
    setChanges(null);
    alert("Member: " + updated.first_name + " " + updated.last_name + " updated successfully.");
  }

  useEffect(() => {
    async function fetchMember(id: string) {
      const res = await fetch(ApiRoutes.member + id, { headers: await authHeader() });
      if (!res.ok) return console.error(await res.text());
      setMember(await res.json());
    }
    if (id && msalInstance.getActiveAccount()) fetchMember(id).catch((e) => console.error(e));
  }, [id]);

  function handleChange(ev: ChangeEvent<HTMLInputElement>, key: string) {
    setChanges((prev) => {
      if (!prev) prev = {};
      return { ...prev, [key]: ev.target.value };
    });
  }

  function authenticatedHtml() {
    if (!member) return <div>Loading...</div>;
    return (
      <>
        <h1>{member.first_name + " " + member.last_name}</h1>
        {Object.keys(member).map((k) => (
          <div key={k}>
            <label style={{ width: "200px", display: "inline-block" }}>{k}: </label>
            <input
              type="text"
              defaultValue={(member as any)[k]}
              onChange={(ev) => handleChange(ev, k)}
              style={{ width: "calc(95vw - 200px)", display: "inline-block" }}
              readOnly={k === "ID"}
            />
          </div>
        ))}
        <br />
        <h2>Changes</h2>
        <pre>{JSON.stringify(changes, null, 2)}</pre>
        <button onClick={() => updateMember()}>UPDATE MEMBER</button>
        <br />
        <br />
        <br />
        <button onClick={() => deleteMember()}>DELETE MEMBER</button>
        <br />
        <br />
        <br />
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
