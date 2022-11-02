import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import React, { FC, ReactNode, useContext, useState } from "react";
import { AccountCtx } from "../../services/context/account-ctx";
import CardSkeleton from "../loading/card-skeleton";
import PublicMemberDescription from "./member-public-description";
import PublicMemberForm from "./member-public-form";
import MyProfileRegister from "./my-profile-register";
import { LanguageCtx } from "../../services/context/language-ctx";
import useConfirmUnsaved from "../../utils/front-end/use-confirm-unsaved";
import type { MemberPrivateInfo } from "../../services/_types";
import Tabs from "antd/lib/tabs";
import PrivateMemberDescription from "./member-private-description";
import MemberInsightDescription from "./member-insight-description";
import MemberPrivateForm from "./member-private-form";
import MemberInsightForm from "./member-insight-form";

type Tab = { label: string; key: string; children: ReactNode };

const MyProfile: FC = () => {
  const { en } = useContext(LanguageCtx);
  const { localAccount, setLocalAccount, loading } = useContext(AccountCtx);
  const [editMode, setEditMode] = useState(false);
  const { confirmUnsaved, setDirty } = useConfirmUnsaved();
  
  if (loading) return <CardSkeleton />;
  if (!localAccount) return null; // Auth guard should prevent this
  if (!localAccount.member) return <MyProfileRegister />;
  const member = localAccount.member;

  function onCancel() {
    if (confirmUnsaved()) {
      setDirty(false);
      setEditMode(false);
    }
  }

  function onSuccess(updatedMember: MemberPrivateInfo) {
    setDirty(false);
    setEditMode(false);
    setLocalAccount((prev) => {
      if (prev) return { ...prev, member: updatedMember };
      return prev;
    });
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
        {localAccount.first_name + " " + localAccount.last_name}
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

export default MyProfile;
