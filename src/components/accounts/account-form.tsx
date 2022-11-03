import Button from "antd/lib/button";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";
import { FC, useContext } from "react";
import authHeader from "../../services/headers/auth-header";
import { contentTypeJsonHeader } from "../../services/headers/content-type-headers";
import ApiRoutes from "../../routing/api-routes";
import Checkbox from "antd/lib/checkbox";
import type { AccountRes } from "../../pages/api/account/[id]";
import { LanguageCtx } from "../../services/context/language-ctx";

type Props = {
  account: AccountRes;
  onSuccess?: () => void;
  onDelete?: () => void;
};

type Data = Partial<AccountRes>;

const AccountForm: FC<Props> = ({ account, onSuccess, onDelete }) => {
  const { en } = useContext(LanguageCtx);
  const [form] = useForm<Data>();

  async function updateAccount(data: Data) {
    try {
      const result = await fetch(ApiRoutes.updateAccount(account.id), {
        method: "PATCH",
        headers: { ...(await authHeader()), ...contentTypeJsonHeader },
        body: JSON.stringify(data),
      });
      if (!result.ok) {
        const e = await result.text();
        console.error(e);
        alert(e);
        return;
      }
      alert("Success!");
      if (onSuccess) onSuccess();
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  async function deleteAccount() {
    try {
      const message = "Are you sure you want to delete account: " + account.login_email + "?";
      if (!confirm(message)) return;
      const result = await fetch(ApiRoutes.deleteAccount(account.id), {
        method: "DELETE",
        headers: await authHeader(),
      });
      if (!result.ok) {
        const e = await result.text();
        console.error(e);
        alert(e);
        return;
      }
      alert("Success!");
      if (onDelete) onDelete();
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  return (
    <Form form={form} onFinish={updateAccount} initialValues={account}>
      <Form.Item label={en ? "Login Email" : "Compte Email"} name="login_email">
        <Input />
      </Form.Item>

      <Form.Item
        label={en ? "Admin Privileges" : "Privilèges d'Administrateur"}
        name="is_admin"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 24 }}
            size="large"
          >
            {en ? "Save Changes" : "Sauvegarder"}
          </Button>
        </Form.Item>
        <span style={{ flexGrow: 1 }}></span>
        <Button
          danger
          type="primary"
          style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 24 }}
          size="large"
          onClick={deleteAccount}
        >
          {en ? "Delete Account" : "Supprimer le Compte"}
        </Button>
      </div>
    </Form>
  );
};

export default AccountForm;
