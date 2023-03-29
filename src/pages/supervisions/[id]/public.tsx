import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicSupervisionProfile from "../../../components/supervisions/supervision-public-profile";

const PublicSupervisionPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return <PublicSupervisionProfile id={parseInt(id)} />;
};

export default PublicSupervisionPage;
