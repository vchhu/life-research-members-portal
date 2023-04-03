import type { NextPage } from "next/types";
import AllMembers from "../../components/members/all-members";
import Layout from "../../components/layout/layout";

const MembersPage: NextPage = () => {
  return (
    <Layout>
      <AllMembers />
    </Layout>
  );
};

export default MembersPage;
