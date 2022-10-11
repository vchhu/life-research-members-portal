import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/router";
import { FunctionComponent, useContext } from "react";
import { AccountCtx } from "../../context/account-ctx";
import PageRoutes from "../../routing/page-routes";
import MemberInfoSkeleton from "../loading/member-info-skeleton";
import MemberDescription from "../member-info/member-description";
import MemberForm from "../member-info/member-form";
import MyProfileRegister from "./my-profile-register";

type Props = {
  editMode?: boolean;
};

const MyProfile: FunctionComponent<Props> = ({ editMode }) => {
  const router = useRouter();
  const { localAccount, loading } = useContext(AccountCtx);

  if (loading) return <MemberInfoSkeleton />;
  if (!localAccount) return null; // Auth guard should prevent this
  if (!localAccount.main_members) return <MyProfileRegister />;

  const member = localAccount.main_members;
  let titleText = "";
  if (!member.first_name || !member.last_name) titleText = "Member " + member.id;
  else titleText = (member.first_name || "") + " " + (member.last_name || "");

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
        <MemberForm member={member} />
      </Card>
    );

  return (
    <Card title={header} bodyStyle={{ padding: 0 }}>
      <MemberDescription member={member} />
    </Card>
  );
};

export default MyProfile;
