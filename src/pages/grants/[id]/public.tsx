import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicGrantProfile from "../../../components/grants/grant-public-profile";

const PublicGrantPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return <PublicGrantProfile id={parseInt(id)} />;
};

export default PublicGrantPage;
