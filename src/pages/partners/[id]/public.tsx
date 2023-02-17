import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicPartnerProfile from "../../../components/partners/partner-public-profile";

const PublicPartnerPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return <PublicPartnerProfile id={parseInt(id)} />;
};

export default PublicPartnerPage;
