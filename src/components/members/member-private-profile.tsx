import Empty from "antd/lib/empty";
import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FC, useContext, useState } from "react";
import CardSkeleton from "../loading/card-skeleton";
import PublicMemberDescription from "./member-public-description";
import PublicMemberForm from "./member-public-form";
import usePrivateMemberInfo from "../../services/use-private-member-info";
import { LanguageCtx } from "../../services/context/language-ctx";
import useConfirmUnsaved from "../../utils/front-end/use-confirm-unsaved";
import Tabs from "antd/lib/tabs";
import type { MemberPrivateInfo } from "../../services/_types";
import PrivateMemberDescription from "./member-private-description";
import MemberInsightDescription from "./member-insight-description";
import MemberPrivateForm from "./member-private-form";
import MemberInsightForm from "./member-insight-form";

type Props = {
  id: number;
};

const MemberProfile: FC<Props> = ({ id }) => {
  const { en } = useContext(LanguageCtx);
  const { member, setMember, loading } = usePrivateMemberInfo(id);
  const [editMode, setEditMode] = useState(false);
  const { confirmUnsaved, setDirty } = useConfirmUnsaved();

  if (loading) return <CardSkeleton />;
  if (!member) return <Empty />;

  function onCancel() {
    if (confirmUnsaved()) {
      setDirty(false);
      setEditMode(false);
    }
  }

  function onSuccess(updatedMember: MemberPrivateInfo) {
    setDirty(false);
    setEditMode(false);
    setMember(updatedMember);
  }

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
    <Button size="large" danger style={{ flexGrow: 1, maxWidth: "10rem" }} onClick={onCancel}>
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

  const descriptions = [
    {
      label: en ? "Public" : "Public",
      key: "public",
      children: <PublicMemberDescription member={member} />,
    },
    {
      label: en ? "Private" : "Privé",
      key: "private",
      children: <PrivateMemberDescription member={member} />,
    },
    {
      label: en ? "Insight" : "Aperçu",
      key: "insight",
      children: <MemberInsightDescription member={member} />,
    },
  ];

  const forms = [
    {
      label: en ? "Public" : "Public",
      key: "public",
      children: (
        <PublicMemberForm
          member={member}
          onValuesChange={() => setDirty(true)}
          onSuccess={onSuccess}
        />
      ),
    },
    {
      label: en ? "Private" : "Privé",
      key: "private",
      children: (
        <MemberPrivateForm
          member={member}
          onValuesChange={() => setDirty(true)}
          onSuccess={onSuccess}
        />
      ),
    },
    {
      label: en ? "Insight" : "Aperçu",
      key: "insight",
      children: (
        <MemberInsightForm
          member={member}
          onValuesChange={() => setDirty(true)}
          onSuccess={onSuccess}
        />
      ),
    },
  ];

  return (
    <Card title={header} bodyStyle={{ paddingTop: 0 }}>
      <Tabs items={editMode ? forms : descriptions} />
    </Card>
  );
};

export default MemberProfile;
