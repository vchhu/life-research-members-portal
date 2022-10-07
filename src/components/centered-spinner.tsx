import Spin from "antd/lib/spin";
import { FunctionComponent } from "react";

const CenteredSpinner: FunctionComponent = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Spin size="large"></Spin>
    </div>
  );
};

export default CenteredSpinner;
