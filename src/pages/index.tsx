import type { NextPage } from "next/types";
import Welcome from "../components/welcome";
import Layout from "../components/layout/layout";

const Home: NextPage = () => {
  console.log("Home page");
  return <Layout>Home</Layout>;
};

export default Home;
