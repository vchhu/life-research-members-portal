import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { auth_accounts, main_members } from "@prisma/client";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import { msalInstance } from "../../../auth-config";
import { all_account_info } from "../../../prisma/types";
import isEmptyObject from "../../utils/common/isEmptyObject";
import ApiRoutes from "../../utils/front-end/api-routes";
import authHeader from "../../utils/front-end/auth-header";
import { contentTypeJsonHeader } from "../../utils/front-end/content-type-headers";

const EditAccountPage: NextPage = () => {
  const [account, setAccount] = useState<all_account_info | null>(null);
  const [accountInfoChanges, setAccountInfoChanges] = useState<Partial<auth_accounts>>({});
  const [memberInfoChanges, setMemberInfoChanges] = useState<Partial<main_members>>({});
  const router = useRouter();
  const { id } = router.query as { id: string };

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
      const newMember: main_members = await result.json();
      fetchAccount();
      alert("Member Registered. Member ID: " + newMember.id);
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  async function unregisterMember() {
    if (!account?.main_members?.id) return;
    const confirmation = confirm(
      "Are you sure you want to unregister member for: " + account.microsoft_email + "?"
    );
    if (!confirmation) return;
    try {
      const result = await fetch(ApiRoutes.deleteMember + account.main_members.id, {
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
        return { ...prev, main_members: null };
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
    if (!account?.main_members)
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
        <input readOnly defaultValue={account?.main_members?.id}></input>
        <label>First Name:</label>
        <input
          defaultValue={account?.main_members.first_name || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              first_name: diff(prev.first_name, ev.target.value),
            }))
          }
        ></input>
        <label>Last Name:</label>
        <input
          defaultValue={account?.main_members.last_name || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              last_name: diff(prev.last_name, ev.target.value),
            }))
          }
        ></input>
        <label>Business Name:</label>
        <input
          defaultValue={account?.main_members.business_name || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              business_name: diff(prev.business_name, ev.target.value),
            }))
          }
        ></input>
        <label>Email:</label>
        <input
          defaultValue={account?.main_members.email || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              email: diff(prev.email, ev.target.value),
            }))
          }
        ></input>
        <label>Address:</label>
        <input
          defaultValue={account?.main_members.address || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              address: diff(prev.address, ev.target.value),
            }))
          }
        ></input>
        <label>City:</label>
        <input
          defaultValue={account?.main_members.city || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              city: diff(prev.city, ev.target.value),
            }))
          }
        ></input>
        <label>Province:</label>
        <input
          defaultValue={account?.main_members.province || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              province: diff(prev.province, ev.target.value),
            }))
          }
        ></input>
        <label>Country:</label>
        <input
          defaultValue={account?.main_members.country || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              country: diff(prev.country, ev.target.value),
            }))
          }
        ></input>
        <label>Postal Code:</label>
        <input
          defaultValue={account?.main_members.postal_code || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              postal_code: diff(prev.postal_code, ev.target.value),
            }))
          }
        ></input>
        <label>Business Phone:</label>
        <input
          defaultValue={account?.main_members.business_phone || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              business_phone: diff(prev.business_phone, ev.target.value),
            }))
          }
        ></input>
        <label>Mobile Phone:</label>
        <input
          defaultValue={account?.main_members.mobile_phone || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              mobile_phone: diff(prev.mobile_phone, ev.target.value),
            }))
          }
        ></input>
        <label>Keywords (English):</label>
        <input
          defaultValue={account?.main_members.keywords_EN || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              keywords_EN: diff(prev.keywords_EN, ev.target.value),
            }))
          }
        ></input>
        <label>Keywords (French):</label>
        <input
          defaultValue={account?.main_members.keywords_FR || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              keywords_FR: diff(prev.keywords_FR, ev.target.value),
            }))
          }
        ></input>
        <label>Problems (English):</label>
        <input
          defaultValue={account?.main_members.problems_EN || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              problems_EN: diff(prev.problems_EN, ev.target.value),
            }))
          }
        ></input>
        <label>Problems (French):</label>
        <input
          defaultValue={account?.main_members.problems_FR || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              problems_FR: diff(prev.problems_FR, ev.target.value),
            }))
          }
        ></input>
        <label>Dream:</label>
        <input
          defaultValue={account?.main_members.dream || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              dream: diff(prev.dream, ev.target.value),
            }))
          }
        ></input>
        <label>Notes:</label>
        <input
          defaultValue={account?.main_members.notes || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              notes: diff(prev.notes, ev.target.value),
            }))
          }
        ></input>
        <label>How can we help:</label>
        <input
          defaultValue={account?.main_members.how_can_we_help || ""}
          onChange={(ev) =>
            setMemberInfoChanges((prev) => ({
              ...prev,
              how_can_we_help: diff(prev.how_can_we_help, ev.target.value),
            }))
          }
        ></input>
        <label>Faculty (English):</label>
        <input
          readOnly
          defaultValue={account?.main_members.types_faculty?.faculty_name_en || ""}
        ></input>
        <label>Faculty (French):</label>
        <input
          readOnly
          defaultValue={account?.main_members.types_faculty?.faculty_name_fr || ""}
        ></input>
        <label>Category (English):</label>
        <input
          readOnly
          defaultValue={account?.main_members.types_member_category?.category_name_en || ""}
        ></input>
        <label>Category (French):</label>
        <input
          readOnly
          defaultValue={account?.main_members.types_member_category?.category_name_fr || ""}
        ></input>
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
