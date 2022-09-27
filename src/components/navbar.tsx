import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Link from "next/link";
import { CSSProperties, FunctionComponent } from "react";
import PageRoutes from "../utils/front-end/page-routes";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

const Navbar: FunctionComponent = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  return (
    <>
      <div className="navbar">
        <Link href={PageRoutes.home}>
          <a>Home</a>
        </Link>
        <span style={{ width: "1rem" }}></span>
        <Link href={PageRoutes.members}>
          <a>Members</a>
        </Link>
        <span style={{ width: "1rem" }}></span>
        <Link href={PageRoutes.accounts}>
          <a>Accounts</a>
        </Link>
        <span style={{ width: "1rem" }}></span>
        <Link href={PageRoutes.register}>
          <a>Register</a>
        </Link>
        <span style={{ flex: 1 }}></span>
        <UnauthenticatedTemplate>
          <LoginButton />
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <span style={{ fontSize: "1.2rem" }}>{account?.username}</span>
          <span style={{ width: "1rem" }}></span>
          <LogoutButton />
        </AuthenticatedTemplate>
      </div>
    </>
  );
};

export default Navbar;
