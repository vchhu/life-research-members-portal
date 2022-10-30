import Empty from "antd/lib/empty";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import type { FC } from "react";
import usePublicMemberInfo from "../../api-facade/use-public-member-info";
import CardSkeleton from "../loading/card-skeleton";
import PublicMemberDescription from "./public-member-description";

type Props = {
  id: number;
};

const PublicMemberProfile: FC<Props> = ({ id }) => {
  const { member, loading } = usePublicMemberInfo(id);

  if (loading) return <CardSkeleton />;
  if (!member) return <Empty />;

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
        {member.account.first_name + " " + member.account.last_name}
      </Title>
    </div>
  );

  return (
    <Card title={header} bodyStyle={{ padding: 0 }}>
      <PublicMemberDescription member={member} />
    </Card>
  );
};

export default PublicMemberProfile;
