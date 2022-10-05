import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { FunctionComponent } from "react";
import LoginButton from "./login-button";
import NavMenu from "./nav-menu";
import AvatarMenu from "./avatar-menu";
import HomeLogo from "./home-logo";

const Navbar: FunctionComponent = () => {
  return (
    <div className="navbar">
      <HomeLogo />
      <NavMenu />
      <span style={{ flexGrow: 1 }}></span>
      <UnauthenticatedTemplate>
        <LoginButton />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AvatarMenu />
      </AuthenticatedTemplate>
    </div>
  );
};

export default Navbar;
