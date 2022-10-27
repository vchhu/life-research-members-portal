import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { AccountCtx } from "../../api-facade/account-ctx";
import PageRoutes from "../../routing/page-routes";
import CardSkeleton from "../loading/card-skeleton";
import MemberDescription from "./member-description";
import MemberForm from "./member-form";
import MyProfileRegister from "./my-profile-register";

type Props = {
  editMode?: boolean;
};

const MyProfile: FC<Props> = ({ editMode }) => {
  const router = useRouter();
  const { localAccount, loading, refresh } = useContext(AccountCtx);

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
      onClick={() => router.push(PageRoutes.myProfileEdit)}
    >
      Edit
    </Button>
  );

  const cancelButton = (
    <Button
      size="large"
      type="primary"
      danger
      style={{ flexGrow: 1, maxWidth: "10rem" }}
      onClick={() => router.push(PageRoutes.myProfile)}
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
      <MemberDescription member={member} />
    </Card>
  );
};

export default MyProfile;
