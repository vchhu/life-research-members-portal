import type { NextPage } from "next/types";
import { useContext } from "react";
import AllPartnership from "../../components/partnership/all-partnership";
import { LanguageCtx } from "../../services/context/language-ctx";

const Product: NextPage = () => {
  const { en } = useContext(LanguageCtx);

  return <AllPartnership />;
};

export default Product;
