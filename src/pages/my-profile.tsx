import { NextPage } from "next/types";
import MyProfile from "../components/my-profile";
import AuthGuard from "../utils/front-end/auth-guard/auth-guard";
import Authorizations from "../utils/front-end/auth-guard/authorizations";

const RegisterPage: NextPage = () => {
  return (
    <AuthGuard auths={[Authorizations.registered]}>
      <MyProfile />
    </AuthGuard>
  );
};

export default RegisterPage;
