import type { NextPage } from "next/types";
import AllGrants from "../../components/grants/all-grants";
import Layout from "../../components/layout/layout";

const GrantsPage: NextPage = () => {
  return (
    <Layout>
      <AllGrants />
    </Layout>
  );
};

export default GrantsPage;
