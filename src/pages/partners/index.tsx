import type { NextPage } from "next/types";
import { useContext } from "react";
import AllPartners from "../../components/partners/all-partners";
import { LanguageCtx } from "../../services/context/language-ctx";

const PartnersPage: NextPage = () => {
  return <AllPartners />;
};

export default PartnersPage;
