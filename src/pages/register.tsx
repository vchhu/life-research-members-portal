import type { NextPage } from "next";
import RegisterAccount from "../components/register-account";
import AuthGuard from "../utils/front-end/auth-guard/auth-guard";
import Authorizations from "../utils/front-end/auth-guard/authorizations";

const RegisterPage: NextPage = () => {
  return (
    <AuthGuard auths={[Authorizations.admin]}>
      <RegisterAccount />
    </AuthGuard>
  );
};

export default RegisterPage;
