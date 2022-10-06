import Link from "next/link";
import { FunctionComponent } from "react";
import PageRoutes from "../../utils/front-end/page-routes";
import Image from "next/image";
import logo from "../../../public/favicon.png";

const HomeLogo: FunctionComponent = () => {
  return (
    <Link href={PageRoutes.home}>
      <a className="logo" style={{ lineHeight: 0 }}>
        <Image src={logo} alt="logo" width="60rem" height="60rem" />
      </a>
    </Link>
  );
};

export default HomeLogo;
