import type { NextPage } from "next/types";
import AllAccounts from "../../components/accounts/all-accounts";
import Authorizations from "../../components/auth-guard/authorizations";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";

const AccountsPage: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.admin]}>
      <AllAccounts />
    </PageAuthGuard>
  );
};

export default AccountsPage;
