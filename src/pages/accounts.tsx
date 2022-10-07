import type { NextPage } from "next/types";
import AllAccounts from "../components/all-accounts";
import Authorizations from "../components/auth-guard/authorizations";
import AuthGuard from "../components/auth-guard/auth-guard";

const AccountsPage: NextPage = () => {
  return (
    <AuthGuard auths={[Authorizations.admin]}>
      <AllAccounts />
    </AuthGuard>
  );
};

export default AccountsPage;
