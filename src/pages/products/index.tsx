import type { NextPage } from "next/types";
import AllProducts from "../../components/products/all-products";
import Layout from "../../components/layout/layout";

const Product: NextPage = () => {
  return (
    <Layout>
      {" "}
      <AllProducts />
    </Layout>
  );
};

export default Product;
