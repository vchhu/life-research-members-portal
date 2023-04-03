import type { NextPage } from "next/types";
import AllSupervisions from "../../components/supervisions/all-supervisions";
import Layout from "../../components/layout/layout";

const SupervisionsPage: NextPage = () => {
  return (
    <Layout>
      <AllSupervisions />;
    </Layout>
  );
};

export default SupervisionsPage;
