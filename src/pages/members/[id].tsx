import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import MemberProfile from "../../components/members/member-profile";

const MemberPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return <MemberProfile id={parseInt(id)} />;
};

export default MemberPage;
