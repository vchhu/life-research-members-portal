import type { NextPage } from "next/types";
import { useContext } from "react";
import AllPartnership from "../../components/partnership/all-partnership";
import { LanguageCtx } from "../../services/context/language-ctx";

const PartnershipPage: NextPage = () => {
const { en } = useContext(LanguageCtx);
// return <AllPartners />;

    return (<AllPartnership />);
};

export default PartnershipPage;