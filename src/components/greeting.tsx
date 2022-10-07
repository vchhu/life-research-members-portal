import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Spin from "antd/lib/spin";
import { FunctionComponent, useContext } from "react";
import { AccountCtx } from "../context/account-ctx";

const Greeting: FunctionComponent = () => {
  const { instance } = useMsal();
  const name = instance.getActiveAccount()?.name?.split(" ")[0];
  const { localAccount, loading } = useContext(AccountCtx);

  const adminGreeting = () => {
    if (localAccount?.is_admin) return <h2>You are an administrator.</h2>;
  };

  const memberGreeting = () => {
    if (!localAccount?.main_members)
      return (
        <>
          <h2>This account has no member information!</h2>
          <h2>If you are a member, please go to your profile and add your info!</h2>
        </>
      );
    return (
      <>
        <h2>Looks like you have some member information.</h2>
        <h2>Please go to your profile and make sure it is up to date!</h2>
      </>
    );
  };

  const greeting = () => {
    if (loading) return <Spin size="large" />;
    if (!localAccount)
      return (
        <>
          <h2>This account is not registered.</h2>
          <h2>If you are a member, please ask an administrator to register you.</h2>
        </>
      );
    return (
      <>
        {memberGreeting()}
        {adminGreeting()}
      </>
    );
  };

  return (
    <div style={{ textAlign: "center", paddingTop: 36 }}>
      <h1>Welcome to the LIFE Research Insitute Member Directory!</h1>
      <UnauthenticatedTemplate>
        <h2>If you are a member, please login.</h2>
        <h2>Otherwise, feel free to look around.</h2>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <h1>Good to see you {name}.</h1>
        {greeting()}
      </AuthenticatedTemplate>
    </div>
  );
};

export default Greeting;
