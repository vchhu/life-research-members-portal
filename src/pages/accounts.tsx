import type { NextPage } from "next/types";
import AllAccounts from "../components/all-accounts";
import Authorizations from "../utils/front-end/auth-guard/authorizations";
import AuthGuard from "../utils/front-end/auth-guard/auth-guard";

const AccountsPage: NextPage = () => {
  return (
    <AuthGuard auths={[Authorizations.admin]}>
      <AllAccounts />
    </AuthGuard>
  );
};

export default AccountsPage;
