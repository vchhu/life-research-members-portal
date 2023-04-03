import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicMemberProfile from "../../../components/members/member-public-profile";
import Layout from "../../../components/layout/layout";

const PublicMemberPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return (
    <Layout>
      <PublicMemberProfile id={parseInt(id)} />
    </Layout>
  );
};

export default PublicMemberPage;
