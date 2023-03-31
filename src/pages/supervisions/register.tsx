import type { NextPage } from "next/types";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";
import Authorizations from "../../components/auth-guard/authorizations";
import RegisterSupervision from "../../components/supervisions/supervision-register";

const Register: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.admin]}>
      <RegisterSupervision />
    </PageAuthGuard>
  );
};

export default Register;
