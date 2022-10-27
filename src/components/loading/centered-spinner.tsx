import Spin from "antd/lib/spin";
import type { FC } from "react";

const CenteredSpinner: FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Spin size="large"></Spin>
    </div>
  );
};

export default CenteredSpinner;
