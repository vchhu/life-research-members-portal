import type { NextPage } from "next/types";
import Welcome from "../components/welcome";
import Footer from "../components/footer";

const Home: NextPage = () => {
  return (
    <>
      <Welcome />
      <Footer />
    </>
  );
};

export default Home;
