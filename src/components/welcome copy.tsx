import { Row, Col } from "antd";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import Spin from "antd/lib/spin";
import { FC, useContext } from "react";
import { ActiveAccountCtx } from "../services/context/active-account-ctx";
import { blue, green } from "@ant-design/colors";
import { LanguageCtx } from "../services/context/language-ctx";
import Image from "next/image";
import life from "../../public/life-home.png";

const Welcome: FC = () => {
  const { localAccount, loading } = useContext(ActiveAccountCtx);
  const { en } = useContext(LanguageCtx);

  const adminGreeting = (
    <h4 style={{ color: green[6] }}>
      {en
        ? "You are login in as an administrator"
        : "Vous êtes connecté en tant qu'administrateur"}
    </h4>
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
      <h2>
        {en
          ? "This account is not registered."
          : "Ce compte n'est pas enregistré."}
      </h2>
      <h2>
        {en
          ? "If you are a member, please ask an administrator to register you."
          : "Si vous êtes membre, veuillez demander à un administrateur de vous inscrire."}
      </h2>
    </>
  );

  const unauthenticatedGreeting = (
    <>
      <h1>
        {en
          ? "Welcome to the LIFE Research Insitute Member Portal!"
          : "Bienvenue sur le portail des membres de l'Institut de recherche LIFE!"}
      </h1>
      <h3>
        {en
          ? "The LIFE Research Institute assembles researchers and partners with diverse perspectives who work collaboratively to understand how we are guided along the unexpected trajectories of life."
          : "L'institut de recherche LIFE rassemble des chercheurs et des partenaires aux perspectives diverses qui travaillent en collaboration pour comprendre comment nous sommes guidés le long des trajectoires inattendues de la vie."}
      </h3>
    </>
  );

  const greeting = () => {
    if (loading) return <Spin size="large" />;
    if (!localAccount) return notRegistered;
    return (
      <>
        <h3>
          {en
            ? `Good morning, ${localAccount.first_name}!`
            : `Bonjour ${localAccount.first_name} !`}
        </h3>
        <h1>
          {en
            ? "Welcome to the LIFE Research Insitute Member Portal"
            : "Bienvenue sur le portail des membres de l'Institut de recherche LIFE"}
        </h1>

        {/* {localAccount?.member ? memberGreeting : noMemberInfo} */}
        {localAccount.is_admin ? adminGreeting : null}
      </>
    );
  };

  return (
    <div className="homepage">
      <div
        className="banner"
        style={{ backgroundColor: "#f8f8f8", padding: "10px 0" }}
      >
        <Row gutter={[16, 16]}>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "50px",
            }}
          >
            <UnauthenticatedTemplate>
              {unauthenticatedGreeting}
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>{greeting()}</AuthenticatedTemplate>
          </Col>
          <Col
            className="welcome-image"
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={life}
              alt="LIFE Research Institute Home"
              width={318} // Set the width and height to the desired values
              height={343}
              //layout="responsive"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Welcome;
