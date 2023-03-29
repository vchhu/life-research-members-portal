import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import PublicEventProfile from "../../../components/events/event-public-profile";

const PublicEventPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return <PublicEventProfile id={parseInt(id)} />;
};

export default PublicEventPage;
