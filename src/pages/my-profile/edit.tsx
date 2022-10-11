import { NextPage } from "next/types";
import MyProfile from "../../components/member-info/my-profile";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";
import Authorizations from "../../components/auth-guard/authorizations";
import MemberInfoSkeleton from "../../components/loading/member-info-skeleton";

const RegisterPage: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.registered]} loadingIcon={<MemberInfoSkeleton />}>
      <MyProfile editMode />
    </PageAuthGuard>
  );
};

export default RegisterPage;
