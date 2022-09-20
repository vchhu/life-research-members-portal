import type { NextPage } from "next";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../../auth-config";
import LoginButton from "../components/login-button";
import UserData from "../components/user-data";
import LogoutButton from "../components/logout-button";

const App: NextPage = () => {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <LoginButton />
        <br />
        <LogoutButton />
        <br />
        <UserData />
      </MsalProvider>
    </>
  );
};

export default App;
