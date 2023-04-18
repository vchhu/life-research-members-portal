import type { NextPage } from "next/types";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";
import Authorizations from "../../components/auth-guard/authorizations";
import RegisterSupervision from "../../components/supervisions/supervision-member-register";
import Layout from "../../components/layout/layout";

const Register: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.registered]}>
      <Layout>
        <RegisterSupervision />
      </Layout>
    </PageAuthGuard>
  );
};

export default Register;
