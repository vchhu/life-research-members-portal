import Card from "antd/lib/card";
import Skeleton from "antd/lib/skeleton/Skeleton";
import { FunctionComponent } from "react";

const MemberInfoSkeleton: FunctionComponent = () => {
  return <Card loading title={<Skeleton paragraph={false} active style={{ margin: 0 }} />} />;
};

export default MemberInfoSkeleton;
