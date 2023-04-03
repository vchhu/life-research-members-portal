import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicGrantProfile from "../../../components/grants/grant-public-profile";
import Layout from "../../../components/layout/layout";

const PublicGrantPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return (
    <Layout>
      <PublicGrantProfile id={parseInt(id)} />
    </Layout>
  );
};

export default PublicGrantPage;
