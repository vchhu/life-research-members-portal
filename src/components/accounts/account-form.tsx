import Button from "antd/lib/button";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";
import { FunctionComponent } from "react";
import { all_account_info } from "../../../prisma/types";
import authHeader from "../../api-facade/headers/auth-header";
import { contentTypeJsonHeader } from "../../api-facade/headers/content-type-headers";
import ApiRoutes from "../../routing/api-routes";
import Checkbox from "antd/lib/checkbox";

type Props = {
  account: all_account_info;
  onSuccess?: () => void;
  onDelete?: () => void;
};

type Data = Partial<all_account_info>;

const AccountForm: FunctionComponent<Props> = ({ account, onSuccess, onDelete }) => {
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
      <Form.Item label="Login Email" name="login_email">
        <Input />
      </Form.Item>

      <Form.Item label="Microsoft ID" name="microsoft_id">
        <Input />
      </Form.Item>

      <Form.Item label="Admin Privileges" name="is_admin" valuePropName="checked">
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
            Save Changes
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
          Delete Account
        </Button>
      </div>
    </Form>
  );
};

export default AccountForm;
