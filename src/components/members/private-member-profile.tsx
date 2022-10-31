import Empty from "antd/lib/empty";
import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FC, useContext, useState } from "react";
import CardSkeleton from "../loading/card-skeleton";
import PublicMemberDescription from "./public-member-description";
import MemberFormPublic from "./member-form-public";
import usePrivateMemberInfo from "../../services/use-private-member-info";
import { LanguageCtx } from "../../services/context/language-ctx";

type Props = {
  id: number;
};

const MemberProfile: FC<Props> = ({ id }) => {
  const { en } = useContext(LanguageCtx);
  const { member, setMember, loading } = usePrivateMemberInfo(id);
  const [editMode, setEditMode] = useState(false);

  if (loading) return <CardSkeleton />;
  if (!member) return <Empty />;

  const editButton = (
    <Button
      size="large"
      type="primary"
      style={{ flexGrow: 1, maxWidth: "10rem" }}
      onClick={() => setEditMode(true)}
    >
      {en ? "Edit" : "Éditer"}
    </Button>
  );

  const cancelButton = (
    <Button
      size="large"
      danger
      style={{ flexGrow: 1, maxWidth: "10rem" }}
      onClick={() => setEditMode(false)}
    >
      {en ? "Cancel" : "Annuler"}
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
        <MemberFormPublic
          member={member}
          onSuccess={(member) => {
            setEditMode(false);
            setMember(member);
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
