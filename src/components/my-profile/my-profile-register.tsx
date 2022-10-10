import Button from "antd/lib/button";
import { FunctionComponent, useContext, useState } from "react";
import registerMember from "../../api-facade/register-member";
import { AccountCtx } from "../../context/account-ctx";
import MemberInfoSkeleton from "../loading/member-info-skeleton";

const MyProfileRegister: FunctionComponent = () => {
  const { localAccount, loading, setLocalAccount } = useContext(AccountCtx);
  const [waiting, setWaiting] = useState(false);

  async function handleRegisterMember(id: number) {
    try {
      setWaiting(true);
      const newMember = await registerMember(id);
      setLocalAccount((prev) => {
        return prev && { ...prev, main_members: newMember };
      });
      alert("Success!");
    } catch (e) {
      console.error(e);
      alert(e);
    } finally {
      setWaiting(false);
    }
  }

  if (!localAccount) return null; // Auth guard should prevent this
  if (waiting) return <MemberInfoSkeleton />;

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div style={{ height: "20vh" }}></div>
      <h1>You have no member information!</h1>
      <h2>Register as a member to tell us more about yourself.</h2>
      <Button
        type="primary"
        size="large"
        style={{ marginTop: 18 }}
        onClick={() => handleRegisterMember(localAccount.id)}
      >
        Register as Member
      </Button>
    </div>
  );
};

export default MyProfileRegister;
