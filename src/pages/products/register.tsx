import type { NextPage } from "next/types";
import PageAuthGuard from "../../components/auth-guard/page-auth-guard";
import Authorizations from "../../components/auth-guard/authorizations";
import RegisterProduct from "../../components/products/product-register";

const Register: NextPage = () => {
  return (
    <PageAuthGuard auths={[Authorizations.admin]}>
      <RegisterProduct />
    </PageAuthGuard>
  );
};

export default Register;
