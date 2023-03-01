import Empty from "antd/lib/empty";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FC, useContext } from "react";
import usePublicProductInfo from "../../services/use-public-product-info";
import CardSkeleton from "../loading/card-skeleton";
import PublicProductDescription from "./product-public-description";
import { LanguageCtx } from "../../services/context/language-ctx";

type Props = {
  id: number;
};

const PublicProductProfile: FC<Props> = ({ id }) => {
  const { product, loading } = usePublicProductInfo(id);
  const { en } = useContext(LanguageCtx);

  if (loading) return <CardSkeleton />;
  if (!product) return <Empty />;

  const header = (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Title
        level={2}
        style={{
          margin: 0,
          minWidth: 0,
          marginRight: "auto",
          paddingRight: 16,
          whiteSpace: "break-spaces",
        }}
      >
        {en ? product.title_en : product.title_fr}
      </Title>
    </div>
  );

  return (
    <Card title={header}>
      <PublicProductDescription product={product} />
    </Card>
  );
};

export default PublicProductProfile;
