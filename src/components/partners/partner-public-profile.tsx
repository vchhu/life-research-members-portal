import Empty from "antd/lib/empty";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FC, useContext } from "react";
import usePublicOrganizationInfo from "../../services/use-public-partner-info";
import CardSkeleton from "../loading/card-skeleton";
import PublicPartnerDescription from "./partner-public-description";
import { LanguageCtx } from "../../services/context/language-ctx";

type Props = {
  id: number;
};

const PublicPartnerProfile: FC<Props> = ({ id }) => {
  const { org, loading } = usePublicOrganizationInfo(id);
  const { en } = useContext(LanguageCtx);

  if (loading) return <CardSkeleton />;
  if (!org) return <Empty />;

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
        {org.name_en}
      </Title>
    </div>
  );

  return (
    <Card title={header}>
      <PublicPartnerDescription partner={org} />
    </Card>
  );
};

export default PublicPartnerProfile;
