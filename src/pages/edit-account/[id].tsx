import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { account, member } from "@prisma/client";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useCallback, useEffect, useState } from "react";
import { msalInstance } from "../../../auth-config";
import { all_account_info } from "../../../prisma/types";
import isEmptyObject from "../../utils/common/isEmptyObject";
import ApiRoutes from "../../routing/api-routes";
import authHeader from "../../api-facade/headers/auth-header";
import { contentTypeJsonHeader } from "../../api-facade/headers/content-type-headers";

const EditAccountPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [account, setAccount] = useState<all_account_info | null>(null);
  const memberInfo = account?.member;
  const [accountInfoChanges, setAccountInfoChanges] = useState<Partial<account>>({});
  const [memberInfoChanges, setMemberInfoChanges] = useState<Partial<member>>({});

  async function deleteAccount() {
    if (!account) return;
    const confirmation = confirm(
      "Are you sure you want to delete Account: " + account.microsoft_email + "?"
    );
    if (!confirmation) return;
    try {
      const result = await fetch(ApiRoutes.deleteAccount + id, { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      alert("Account: " + account.microsoft_email + " deleted successfully.");
      router.push("/");
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  async function updateAccount() {
    if (isEmptyObject(accountInfoChanges) && isEmptyObject(memberInfoChanges)) return;
    const result = await fetch(ApiRoutes.updateAccount + id, {
      headers: await authHeader(),
      body: JSON.stringify({
        accountInfo: accountInfoChanges,
        memberInfo: memberInfoChanges,
      }),
      method: "PATCH",
    });
    if (!result.ok) return console.error(await result.text());
    const updated = await result.json();
    setAccount(updated);
    setAccountInfoChanges({});
    setMemberInfoChanges({});
    alert("Account: " + updated.microsoft_email + " updated successfully.");
  }

  const fetchAccount = useCallback(async () => {
    const res = await fetch(ApiRoutes.account + id, { headers: await authHeader() });
    if (!res.ok) return console.error(await res.text());
    setAccount(await res.json());
  }, [id]);

  useEffect(() => {
    if (id && msalInstance.getActiveAccount()) fetchAccount();
  }, [id, fetchAccount]);

  async function registerAsMember() {
    try {
      const result = await fetch(ApiRoutes.registerMember, {
        headers: { ...(await authHeader()), ...contentTypeJsonHeader },
        body: JSON.stringify({ account_id: account?.id }),
        method: "PUT",
      });
      if (!result.ok) {
        const e = await result.text();
        console.error(e);
        alert(e);
        return;
      }
      const newMember: member = await result.json();
      fetchAccount();
      alert("Member Registered. Member ID: " + newMember.id);
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  async function unregisterMember() {
    if (!account?.member?.id) return;
    const confirmation = confirm(
      "Are you sure you want to unregister member for: " + account.microsoft_email + "?"
    );
    if (!confirmation) return;
    try {
      const result = await fetch(ApiRoutes.deleteMember + account.member.id, {
        headers: await authHeader(),
        method: "DELETE",
      });
      if (!result.ok) {
        const e = await result.text();
        console.error(e);
        alert(e);
        return;
      }
      const deleted = await result.json();
      setAccount((prev) => {
        if (!prev) return prev;
        return { ...prev, member: null };
      });
      alert("Member Unregistered. Member ID: " + deleted.id);
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  function diff(oldValue: any, newValue: any) {
    if (!oldValue && !newValue) return undefined;
    if (String(oldValue) === String(newValue)) return undefined;
    return newValue;
  }

  function accountInfoHtml() {
    return (
      <>
        <label>Account ID:</label>
        <input readOnly defaultValue={account?.id}></input>
        <label>Microsoft Email:</label>
        <input
          defaultValue={account?.microsoft_email}
          onChange={(ev) =>
            setAccountInfoChanges((prev) => ({
              ...prev,
              microsoft_email: diff(account?.microsoft_email, ev.target.value),
            }))
          }
        ></input>
        <label>Microsoft ID:</label>
        <input
          defaultValue={account?.microsoft_id || ""}
          onChange={(ev) =>
            setAccountInfoChanges((prev) => ({
              ...prev,
              microsoft_id: diff(account?.microsoft_id, ev.target.value),
            }))
          }
        ></input>
        <label>Admin Privileges:</label>
        <input
          type="checkbox"
          defaultChecked={account?.is_admin}
          onChange={(ev) =>
            setAccountInfoChanges((prev) => ({
              ...prev,
              is_admin: diff(account?.is_admin, ev.target.checked),
            }))
          }
        ></input>
      </>
    );
  }

  function memberInfoHtml() {
    if (!memberInfo)
      return (
        <>
          <p>This account is not registered as a member</p>
          <button
            onClick={() => {
              registerAsMember();
            }}
          >
            REGISTER AS MEMBER
          </button>
        </>
      );
    return (
      <>
        <label>Member ID:</label>
        <input readOnly defaultValue={memberInfo?.id}></input>
        <label>First Name:</label>
        <input
          defaultValue={memberInfo.first_name || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              first_name: diff(memberInfo.first_name, ev.target.value),
            }))
          }
        ></input>
        <label>Last Name:</label>
        <input
          defaultValue={memberInfo.last_name || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              last_name: diff(memberInfo.last_name, ev.target.value),
            }))
          }
        ></input>
        <label>Business Name:</label>
        <input
          defaultValue={memberInfo.business_name || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              business_name: diff(memberInfo.business_name, ev.target.value),
            }))
          }
        ></input>
        <label>Email:</label>
        <input
          defaultValue={memberInfo.email || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              email: diff(memberInfo.email, ev.target.value),
            }))
          }
        ></input>
        <label>Address:</label>
        <input
          defaultValue={memberInfo.address || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              address: diff(memberInfo.address, ev.target.value),
            }))
          }
        ></input>
        <label>City:</label>
        <input
          defaultValue={memberInfo.city || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              city: diff(memberInfo.city, ev.target.value),
            }))
          }
        ></input>
        <label>Province:</label>
        <input
          defaultValue={memberInfo.province || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              province: diff(memberInfo.province, ev.target.value),
            }))
          }
        ></input>
        <label>Country:</label>
        <input
          defaultValue={memberInfo.country || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              country: diff(memberInfo.country, ev.target.value),
            }))
          }
        ></input>
        <label>Postal Code:</label>
        <input
          defaultValue={memberInfo.postal_code || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              postal_code: diff(memberInfo.postal_code, ev.target.value),
            }))
          }
        ></input>
        <label>Business Phone:</label>
        <input
          defaultValue={memberInfo.business_phone || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              business_phone: diff(memberInfo.business_phone, ev.target.value),
            }))
          }
        ></input>
        <label>Mobile Phone:</label>
        <input
          defaultValue={memberInfo.mobile_phone || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              mobile_phone: diff(memberInfo.mobile_phone, ev.target.value),
            }))
          }
        ></input>
        <label>Keywords (English):</label>
        <input
          defaultValue={memberInfo.keywords_EN || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              keywords_EN: diff(memberInfo.keywords_EN, ev.target.value),
            }))
          }
        ></input>
        <label>Keywords (French):</label>
        <input
          defaultValue={memberInfo.keywords_FR || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              keywords_FR: diff(memberInfo.keywords_FR, ev.target.value),
            }))
          }
        ></input>
        <label>Problems (English):</label>
        <input
          defaultValue={memberInfo.problems_EN || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              problems_EN: diff(memberInfo.problems_EN, ev.target.value),
            }))
          }
        ></input>
        <label>Problems (French):</label>
        <input
          defaultValue={memberInfo.problems_FR || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              problems_FR: diff(memberInfo.problems_FR, ev.target.value),
            }))
          }
        ></input>
        <label>Dream:</label>
        <input
          defaultValue={memberInfo.dream || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              dream: diff(memberInfo.dream, ev.target.value),
            }))
          }
        ></input>
        <label>Notes:</label>
        <input
          defaultValue={memberInfo.notes || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              notes: diff(memberInfo.notes, ev.target.value),
            }))
          }
        ></input>
        <label>How can we help:</label>
        <input
          defaultValue={memberInfo.how_can_we_help || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              how_can_we_help: diff(memberInfo.how_can_we_help, ev.target.value),
            }))
          }
        ></input>
        <label>Faculty (English):</label>
        <input readOnly defaultValue={memberInfo.faculty?.faculty_name_en || ""}></input>
        <label>Faculty (French):</label>
        <input readOnly defaultValue={memberInfo.faculty?.faculty_name_fr || ""}></input>
        <label>Category (English):</label>
        <input readOnly defaultValue={memberInfo.member_type?.category_name_en || ""}></input>
        <label>Category (French):</label>
        <input readOnly defaultValue={memberInfo.member_type?.category_name_fr || ""}></input>
      </>
    );
  }

  function authenticatedHtml() {
    if (!account) return <div>Loading...</div>;
    return (
      <div className="edit-account">
        <h1>{account.microsoft_email}</h1>
        <h1>Account Info</h1>
        {accountInfoHtml()}
        <h1>Member Info</h1>
        {memberInfoHtml()}
        <br />
        <h2>Account Info Changes</h2>
        <pre>{JSON.stringify(accountInfoChanges, null, 2)}</pre>
        <h2>Member Info Changes</h2>
        <pre>{JSON.stringify(memberInfoChanges, null, 2)}</pre>
        <br />
        <button onClick={() => updateAccount()}>APPLY CHANGES</button>
        <br />
        <br />
        <br />
        <button onClick={() => unregisterMember()}>UNREGISTER MEMBER</button>
        <br />
        <br />
        <br />
        <button onClick={() => deleteAccount()}>DELETE ACCOUNT</button>
        <br />
        <br />
        <br />
      </div>
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

export default EditAccountPage;
