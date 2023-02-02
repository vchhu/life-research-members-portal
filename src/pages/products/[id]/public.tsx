import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicProductProfile from "../../../components/products/product-public-profile";

const PublicProductPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return <PublicProductProfile id={parseInt(id)} />;
};

export default PublicProductPage;
