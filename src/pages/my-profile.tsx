import { NextPage } from "next/types";
import MyProfile from "../components/my-profile";
import AuthGuard from "../components/auth-guard/auth-guard";
import Authorizations from "../components/auth-guard/authorizations";
import MemberInfoSkeleton from "../components/loading/member-info-skeleton";

const RegisterPage: NextPage = () => {
  return (
    <AuthGuard auths={[Authorizations.registered]} loadingIcon={<MemberInfoSkeleton />}>
      <MyProfile />
    </AuthGuard>
  );
};

export default RegisterPage;
