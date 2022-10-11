import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import AuthGuard from "../../../components/auth-guard/auth-guard";
import Authorizations from "../../../components/auth-guard/authorizations";
import MemberProfile from "../../../components/member-info/member-profile";

const MemberPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return (
    <AuthGuard auths={[Authorizations.admin, Authorizations.matchId]}>
      <MemberProfile id={parseInt(id)} editMode />
    </AuthGuard>
  );
};

export default MemberPage;
