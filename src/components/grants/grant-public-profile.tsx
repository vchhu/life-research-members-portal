import Empty from "antd/lib/empty";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FC, useContext } from "react";
import usePublicGrantInfo from "../../services/use-public-grant-info";
import CardSkeleton from "../loading/card-skeleton";
import PublicGrantDescription from "./grant-public-description";
import { LanguageCtx } from "../../services/context/language-ctx";

type Props = {
  id: number;
};

const PublicGrantProfile: FC<Props> = ({ id }) => {
  const { grant, loading } = usePublicGrantInfo(id);
  const { en } = useContext(LanguageCtx);

  if (loading) return <CardSkeleton />;
  if (!grant) return <Empty />;

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
        {grant.title}
      </Title>
    </div>
  );

  return (
    <Card title={header}>
      <PublicGrantDescription grant={grant} />
    </Card>
  );
};

export default PublicGrantProfile;
