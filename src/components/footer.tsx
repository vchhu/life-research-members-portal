// components/Footer.tsx

import { Row, Col } from "antd";

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
          <a href="/privacy-policy" style={{ marginRight: "16px" }}>
            Privacy Policy
          </a>
          <a href="/terms-of-use">Terms of Use</a>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
