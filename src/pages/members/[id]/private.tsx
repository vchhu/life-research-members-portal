import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import Authorizations from "../../../components/auth-guard/authorizations";
import PageAuthGuard from "../../../components/auth-guard/page-auth-guard";
import CardSkeleton from "../../../components/loading/card-skeleton";
import PrivateMemberProfile from "../../../components/members/member-private-profile";

const PrivateMemberPage: NextPage = () => {
  const router = useRouter();
  const { id: idString } = router.query;
  if (!(typeof idString === "string")) return null;
  const id = parseInt(idString);
  return (
    <PageAuthGuard auths={[Authorizations.admin]} loadingIcon={<CardSkeleton />}>
      <PrivateMemberProfile id={id} />
    </PageAuthGuard>
  );
};

export default PrivateMemberPage;
