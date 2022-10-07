import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { FunctionComponent, useContext } from "react";
import { AccountCtx } from "../context/account-ctx";

const MyProfile: FunctionComponent = () => {
  const { localAccount, loading } = useContext(AccountCtx);

  return <></>;
};

export default MyProfile;
