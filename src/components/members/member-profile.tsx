import Empty from "antd/lib/empty";
import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import useMember from "../../api-facade/use-member";
import PageRoutes from "../../routing/page-routes";
import CardSkeleton from "../loading/card-skeleton";
import PublicMemberDescription from "./public-member-description";
import MemberForm from "./member-form";
import AuthGuard from "../auth-guard/auth-guard";
import Authorizations from "../auth-guard/authorizations";

type Props = {
  id: number;
};

const MemberProfile: FC<Props> = ({ id }) => {
  const router = useRouter();
  const { member, loading, refresh } = useMember(id);
  const [editMode, setEditMode] = useState(false);

  if (loading) return <CardSkeleton />;
  if (!member) return <Empty />;

  const editButton = (
    <AuthGuard auths={[Authorizations.admin, Authorizations.matchId]}>
      <Button
        size="large"
        type="primary"
        style={{ flexGrow: 1, maxWidth: "10rem" }}
        onClick={() => setEditMode(true)}
      >
        Edit
      </Button>
    </AuthGuard>
  );

  const cancelButton = (
    <Button
      size="large"
      danger
      style={{ flexGrow: 1, maxWidth: "10rem" }}
      onClick={() => setEditMode(false)}
    >
      Cancel
    </Button>
  );

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
      {editMode ? cancelButton : editButton}
    </div>
  );

  if (editMode)
    return (
      <Card title={header}>
        <MemberForm
          member={member}
          onSuccess={() => {
            refresh();
            router.push(PageRoutes.memberProfile(id));
          }}
        />
      </Card>
    );

  return (
    <Card title={header} bodyStyle={{ padding: 0 }}>
      <PublicMemberDescription member={member} />
    </Card>
  );
};

export default MemberProfile;
