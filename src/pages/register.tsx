import type { NextPage } from "next/types";
import RegisterAccount from "../components/register-account";
import AuthGuard from "../components/auth-guard/auth-guard";
import Authorizations from "../components/auth-guard/authorizations";

const RegisterPage: NextPage = () => {
  return (
    <AuthGuard auths={[Authorizations.admin]}>
      <RegisterAccount />
    </AuthGuard>
  );
};

export default RegisterPage;
