import Empty from "antd/lib/empty";
import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FC, useContext, useState } from "react";
import CardSkeleton from "../loading/card-skeleton";
import useAccount from "../../services/use-account";
import AccountDescription from "./account-description";
import AccountForm from "./account-form";
import { useRouter } from "next/router";
import PageRoutes from "../../routing/page-routes";
import { LanguageCtx } from "../../services/context/language-ctx";

type Props = {
  id: number;
};

const AccountProfile: FC<Props> = ({ id }) => {
  const router = useRouter();
  const { en } = useContext(LanguageCtx);
  const { account, loading, refresh } = useAccount(id);
  const [editMode, setEditMode] = useState(false);

  if (loading) return <CardSkeleton />;
  if (!account) return <Empty />;

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
        {account.first_name + " " + account.last_name}
      </Title>
      {editMode ? cancelButton : editButton}
    </div>
  );

  const accountDescription = <AccountDescription account={account} />;

  const accountForm = (
    <AccountForm
      account={account}
      onSuccess={() => {
        refresh();
        setEditMode(false);
      }}
      onDelete={() => {
        router.push(PageRoutes.allAccounts);
      }}
    />
  );

  return <Card title={header}>{editMode ? accountForm : accountDescription}</Card>;
};

export default AccountProfile;
