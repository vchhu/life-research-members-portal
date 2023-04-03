import type { NextPage } from "next/types";
import MyProfile from "../../components/members/my-profile";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";
import Authorizations from "../../components/auth-guard/authorizations";
import CardSkeleton from "../../components/loading/card-skeleton";
import Layout from "../../components/layout/layout";

const MyProfilePage: NextPage = () => {
  return (
    <PageAuthGuard
      auths={[Authorizations.registered]}
      loadingIcon={<CardSkeleton />}
    >
      <Layout>
        <MyProfile />
      </Layout>
    </PageAuthGuard>
  );
};

export default MyProfilePage;
