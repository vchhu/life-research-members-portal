import { NextPage } from "next/types";
import MyProfile from "../../components/member-info/my-profile";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";
import Authorizations from "../../components/auth-guard/authorizations";
import CardSkeleton from "../../components/loading/card-skeleton";

const MyProfilePage: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.registered]} loadingIcon={<CardSkeleton />}>
      <MyProfile />
    </PageAuthGuard>
  );
};

export default MyProfilePage;