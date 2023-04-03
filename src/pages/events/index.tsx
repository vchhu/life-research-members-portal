import type { NextPage } from "next/types";
import AllEvents from "../../components/events/all-events";
import Layout from "../../components/layout/layout";

const EventsPage: NextPage = () => {
  return (
    <Layout>
      <AllEvents />
    </Layout>
  );
};

export default EventsPage;
