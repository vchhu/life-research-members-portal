import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicSupervisionProfile from "../../../components/supervisions/supervision-public-profile";
import Layout from "../../../components/layout/layout";

const PublicSupervisionPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return (
    <Layout>
      <PublicSupervisionProfile id={parseInt(id)} />
    </Layout>
  );
};

export default PublicSupervisionPage;
