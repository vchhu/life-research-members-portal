import type { NextPage } from "next/types";
import PageAuthGuard from "../../../components/auth-guard/page-auth-guard";
import Authorizations from "../../../components/auth-guard/authorizations";
import RegisterPartner from "../../../components/partners/register-partner";
import Layout from "../../../components/layout/layout";

const Register: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.admin]}>
      <Layout>
        <RegisterPartner />
      </Layout>
    </PageAuthGuard>
  );
};

export default Register;
