import Empty from "antd/lib/empty";
import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FunctionComponent, useState } from "react";
import CardSkeleton from "../loading/card-skeleton";
import useAccount from "../../api-facade/use-account";
import AccountDescription from "./account-description";
import AccountForm from "./account-form";

type Props = {
  id: number;
};

const AccountProfile: FunctionComponent<Props> = ({ id }) => {
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
      Edit
    </Button>
  );

  const cancelButton = (
    <Button
      size="large"
      type="primary"
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
        {"Account " + account.id}
      </Title>
      {editMode ? cancelButton : editButton}
    </div>
  );

  if (editMode)
    return (
      <Card title={header}>
        <AccountForm
          account={account}
          onSuccess={() => {
            refresh();
            setEditMode(false);
          }}
        />
      </Card>
    );

  return (
    <Card title={header} bodyStyle={{ padding: 0 }}>
      <AccountDescription account={account} />
    </Card>
  );
};

export default AccountProfile;
