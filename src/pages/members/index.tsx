import type { NextPage } from "next/types";
import AllMembers from "../../components/members/all-members";
import Layout from "../../components/layout/layout";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";
import Authorizations from "../../components/auth-guard/authorizations";

const MembersPage: NextPage = () => {
  return (
    <Layout>
      <PageAuthGuard auths={[Authorizations.registered]}>
        <AllMembers />
      </PageAuthGuard>
    </Layout>
  );
};

export default MembersPage;
