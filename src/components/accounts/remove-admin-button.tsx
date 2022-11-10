import Button from "antd/lib/button";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import type { AccountInfo } from "../../services/_types";
import updateAccountRemoveAdmin from "../../services/update-account-remove-admin";
import Popconfirm from "antd/lib/popconfirm";

type Props = { account: AccountInfo; setAccount: Dispatch<SetStateAction<AccountInfo | null>> };

const RemoveAdminButton: FC<Props> = ({ account, setAccount }) => {
  const { en } = useContext(LanguageCtx);

  async function submit() {
    const res = await updateAccountRemoveAdmin(account.id);
    if (res) setAccount(res);
  }

  const confirmMessage = en
    ? "Are you sure you want to remove this account's admin privileges?"
    : "Voulez-vous vraiment supprimer les privilèges d'administrateur de ce compte ?";

  return (
    <>
      <Popconfirm
        title={confirmMessage}
        onConfirm={submit}
        okText={en ? "Confirm" : "Confirmer"}
        cancelButtonProps={{ danger: true }}
        cancelText={en ? "Cancel" : "Annuler"}
      >
        <Button danger type="primary">
          {en ? "Remove admin privileges" : "Supprimer privilèges d'admin"}
        </Button>
      </Popconfirm>
    </>
  );
};

export default RemoveAdminButton;
