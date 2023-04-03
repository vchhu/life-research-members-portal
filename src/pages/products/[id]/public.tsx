import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicProductProfile from "../../../components/products/product-public-profile";
import Layout from "../../../components/layout/layout";

const PublicProductPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return (
    <Layout>
      <PublicProductProfile id={parseInt(id)} />
    </Layout>
  );
};

export default PublicProductPage;
