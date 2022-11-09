import Button from "antd/lib/button";
import { FC, useContext } from "react";
import registerMember from "../../services/register-member";
import { ActiveAccountCtx } from "../../services/context/active-account-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";

const MyProfileRegister: FC = () => {
  const { en } = useContext(LanguageCtx);
  const { localAccount, setLocalAccount } = useContext(ActiveAccountCtx);

  async function handleRegisterMember(account_id: number) {
    const newMember = await registerMember({ account_id });
    setLocalAccount((prev) => {
      return prev && { ...prev, member: newMember };
    });
  }

  if (!localAccount) return null; // Auth guard should prevent this

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div style={{ height: "20vh" }}></div>
      <h1>
        {en ? "You have no member information!" : "Vous n'avez aucune information de membre !"}
      </h1>
      <h2>
        {en
          ? "Register as a member to tell us more about yourself."
          : "Inscrivez-vous en tant que membre pour nous en dire plus sur vous."}
      </h2>
      <Button
        type="primary"
        size="large"
        style={{ marginTop: 18 }}
        onClick={() => handleRegisterMember(localAccount.id)}
      >
        {en ? "Register as Member" : "Inscrivez-vous en tant que membre"}
      </Button>
    </div>
  );
};

export default MyProfileRegister;
