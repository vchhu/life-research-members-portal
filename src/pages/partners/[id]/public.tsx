import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicPartnerProfile from "../../../components/partners/partner-public-profile";
import Layout from "../../../components/layout/layout";

const PublicPartnerPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return (
    <Layout>
      <PublicPartnerProfile id={parseInt(id)} />
    </Layout>
  );
};

export default PublicPartnerPage;
