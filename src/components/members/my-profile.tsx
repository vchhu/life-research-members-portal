import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { AccountCtx } from "../../api-facade/context/account-ctx";
import PageRoutes from "../../routing/page-routes";
import CardSkeleton from "../loading/card-skeleton";
import PublicMemberDescription from "./public-member-description";
import MemberForm from "./member-form";
import MyProfileRegister from "./my-profile-register";

const MyProfile: FC = () => {
  const router = useRouter();
  const { localAccount, loading, refresh } = useContext(AccountCtx);
  const [editMode, setEditMode] = useState(false);

  if (loading) return <CardSkeleton />;
  if (!localAccount) return null; // Auth guard should prevent this
  if (!localAccount.member) return <MyProfileRegister />;

  const member = localAccount.member;
  let titleText = "";
  if (!member.account.first_name || !member.account.last_name) titleText = "Member " + member.id;
  else titleText = (member.account.first_name || "") + " " + (member.account.last_name || "");

  const editButton = (
    <Button
      size="large"
      type="primary"
      style={{ flexGrow: 1, maxWidth: "10rem" }}
      onClick={() => setEditMode(true)}
    >
      Edit
    </Button>
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
        {titleText}
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
            router.push(PageRoutes.myProfile);
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

export default MyProfile;
