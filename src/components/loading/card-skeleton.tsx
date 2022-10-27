import Card from "antd/lib/card";
import Skeleton from "antd/lib/skeleton/Skeleton";
import type { FC } from "react";

const CardSkeleton: FC = () => {
  return <Card loading title={<Skeleton paragraph={false} active style={{ margin: 0 }} />} />;
};

export default CardSkeleton;
