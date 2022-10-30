import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Spin from "antd/lib/spin";
import { FC, useContext } from "react";
import { AccountCtx } from "../services/context/account-ctx";
import { blue } from "@ant-design/colors";
import { LanguageCtx } from "../services/context/language-ctx";

const Greeting: FC = () => {
  const { instance } = useMsal();
  const name = instance.getActiveAccount()?.name?.split(" ")[0];
  const { localAccount, loading } = useContext(AccountCtx);
  const { en } = useContext(LanguageCtx);

  const adminGreeting = (
    <h2 style={{ color: blue[6] }}>
      {en ? "You are an administrator, congrats!" : "Vous êtes administrateur, félicitations !"}
    </h2>
  );

  const noMemberInfo = (
    <>
      <h2>
        {en
          ? "This account has no member information!"
          : "Ce compte ne contient aucune information de membre !"}
      </h2>
      <h2>
        {en
          ? "If you are a member, please go to your profile and add your info!"
          : "Si vous êtes membre, rendez-vous sur votre profil et ajoutez vos informations !"}
      </h2>
    </>
  );

  const memberGreeting = (
    <>
      <h2>
        {en
          ? "Looks like you have some member information."
          : "Il semble que vous ayez des informations sur les membres."}
      </h2>
      <h2>
        {en
          ? "Please go to My Profile and make sure it is up to date!"
          : "Veuillez vous rendre sur Mon profil et assurez-vous qu'il est à jour !"}
      </h2>
    </>
  );

  const notRegistered = (
    <>
      <h2>{en ? "This account is not registered." : "Ce compte n'est pas enregistré."}</h2>
      <h2>
        {en
          ? "If you are a member, please ask an administrator to register you."
          : "Si vous êtes membre, veuillez demander à un administrateur de vous inscrire."}
      </h2>
    </>
  );

  const unauthenticatedGreeting = (
    <>
      <h2>
        {en
          ? "If you are a member, please login."
          : "Si vous êtes membre, connectez-vous s'il vous plait."}
      </h2>
      <h2>
        {en
          ? "Otherwise, feel free to look around."
          : "Sinon, n'hésitez pas à regarder autour de vous."}
      </h2>
    </>
  );

  const greeting = () => {
    if (loading) return <Spin size="large" />;
    if (!localAccount) return notRegistered;
    return (
      <>
        {localAccount?.member ? memberGreeting : noMemberInfo}
        {localAccount.is_admin ? adminGreeting : null}
      </>
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <h1>
        {en
          ? "Welcome to the LIFE Research Insitute Member Portal!"
          : "Bienvenue sur le Portail des Membres du LIFE Research Institute !"}
      </h1>
      <UnauthenticatedTemplate>{unauthenticatedGreeting}</UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <h1>{en ? `Good to see you ${name}.` : `C'est bon de te voir ${name}.`}</h1>
        {greeting()}
      </AuthenticatedTemplate>
    </div>
  );
};

export default Greeting;
