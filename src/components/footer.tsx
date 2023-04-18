// components/Footer.tsx

import { Row, Col } from "antd";
import SafeLink from "./link/safe-link";
import { useContext } from "react";
import { LanguageCtx } from "../services/context/language-ctx";

const Footer = () => {
  const { en } = useContext(LanguageCtx);

  return (
    <footer>
      <Row justify="space-between" align="middle" style={{ padding: "16px 0" }}>
        <Col>
          <span>
            © {new Date().getFullYear()} LIFE Research Institute.{" "}
            {en ? "All rights reserved." : "Tous droits réservés."}
          </span>
        </Col>
        <Col>
          <SafeLink
            href={
              en
                ? "https://www.uottawa.ca/about-us/aipo/privacy-rights"
                : "https://www.uottawa.ca/notre-universite/baipvp/protection-vie-privee"
            }
            external
          >
            {en ? "Privacy Policy" : "Politique de confidentialité"}
          </SafeLink>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
