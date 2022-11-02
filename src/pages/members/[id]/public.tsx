import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicMemberProfile from "../../../components/members/member-public-profile";

const PublicMemberPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return <PublicMemberProfile id={parseInt(id)} />;
};

export default PublicMemberPage;
