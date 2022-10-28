import { NextPage } from "next/types";
import MyProfile from "../../components/members/my-profile";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";
import Authorizations from "../../components/auth-guard/authorizations";
import CardSkeleton from "../../components/loading/card-skeleton";

const RegisterPage: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.registered]} loadingIcon={<CardSkeleton />}>
      <MyProfile editMode />
    </PageAuthGuard>
  );
};

export default RegisterPage;
