import { NextPage } from "next/types";
import MyProfile from "../components/my-profile";
import AuthGuard from "../components/auth-guard/auth-guard";
import Authorizations from "../components/auth-guard/authorizations";

const RegisterPage: NextPage = () => {
  return (
    <AuthGuard auths={[Authorizations.registered]}>
      <h1>My Profile</h1>
      <MyProfile />
    </AuthGuard>
  );
};

export default RegisterPage;
