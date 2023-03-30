// components/Footer.tsx

import { Row, Col } from "antd";
import SafeLink from "./link/safe-link";

const Footer = () => {
  return (
    <footer>
      <Row justify="space-between" align="middle" style={{ padding: "16px 0" }}>
        <Col>
          <span>
            © {new Date().getFullYear()} LIFE Research Insitute. All rights
            reserved.
          </span>
        </Col>
        <Col>
          <SafeLink
            href={"https://www.uottawa.ca/about-us/aipo/privacy-rights"}
            external
          >
            Privacy Policy
          </SafeLink>
          {/*    <a href="/terms-of-use">Terms of Use</a> */}
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
