import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { FunctionComponent, useContext } from "react";
import { AccountCtx } from "../context/account-ctx";
import CenteredSpinner from "./centered-spinner";

const MyProfile: FunctionComponent = () => {
  const { localAccount, loading } = useContext(AccountCtx);

  if (loading) return <CenteredSpinner />;
  if (!localAccount) return null;
  if (!localAccount.main_members)
    return (
      <div style={{ textAlign: "center" }}>
        <></>
      </div>
    );

  return <></>;
};

export default MyProfile;
