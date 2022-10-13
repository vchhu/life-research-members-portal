import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import AccountProfile from "../../components/accounts/account-profile";

const AccountProfilePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!(typeof id === "string")) return null;
  return <AccountProfile id={parseInt(id)} />;
};

export default AccountProfilePage;
