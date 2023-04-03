import type { NextPage } from "next/types";
import AllPartners from "../../components/partners/all-partners";
import Layout from "../../components/layout/layout";

const PartnersPage: NextPage = () => {
  return (
    <Layout>
      <AllPartners />
    </Layout>
  );
};

export default PartnersPage;
