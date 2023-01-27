import type { NextPage } from "next/types";
import { useContext } from "react";

import AllProducts from "../../components/products/allproducts";
import { LanguageCtx } from "../../services/context/language-ctx";

const Product: NextPage = () => {
  const { en } = useContext(LanguageCtx);

  return <AllProducts />;
};

export default Product;
