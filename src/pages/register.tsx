import type { NextPage } from "next/types";
import RegisterAccount from "../components/register-account";
import PageAuthGuard from "../components/auth-guard/page-auth-guard";
import Authorizations from "../components/auth-guard/authorizations";

const RegisterPage: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.admin]}>
      <RegisterAccount />
    </PageAuthGuard>
  );
};

export default RegisterPage;
