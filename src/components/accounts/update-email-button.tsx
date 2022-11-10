import useForm from "antd/lib/form/hooks/useForm";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import type { AccountInfo } from "../../services/_types";
import updateAccountEmail from "../../services/update-account-email";

type Data = { login_email: string; confirm_email: string };
type Props = { account: AccountInfo; setAccount: Dispatch<SetStateAction<AccountInfo | null>> };

const UpdateEmailButton: FC<Props> = ({ account, setAccount }) => {
  const { en } = useContext(LanguageCtx);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = useForm<Data>();

  async function submit({ login_email }: Data) {
    const res = await updateAccountEmail(account.id, { login_email });
    if (res) {
      setAccount(res);
      setModalOpen(false);
    }
  }

  return (
    <>
      <Button ghost type="primary" onClick={() => setModalOpen(true)}>
        {en ? "Change Email" : "Changer l'e-mail"}
      </Button>
      <Modal
        title={
          <>
            {en ? "Change Login Email: " : "Changer l'e-mail de connexion: "}
            {account.login_email}
          </>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        okButtonProps={{ htmlType: "submit", form: "update-email-form" }}
        okText={en ? "Submit" : "Soumettre"}
        cancelButtonProps={{ danger: true }}
        cancelText={en ? "Cancel" : "Annuler"}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          id="update-email-form"
          onFinish={submit}
          preserve={false}
        >
          <Form.Item
            label={en ? "New Email" : "Nouveau Email"}
            name="login_email"
            rules={[
              { required: true, message: en ? "Required" : "Requis" },
              { type: "email", message: en ? "Invalid Email" : "Email invalide" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={en ? "Confirm Email" : "Confirmer Email"}
            name="confirm_email"
            validateFirst={true}
            rules={[
              { required: true, message: en ? "Required" : "Requis" },
              { type: "email", message: en ? "Invalid Email" : "Email invalide" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("login_email") === value) return Promise.resolve();
                  return Promise.reject(
                    new Error(en ? "Emails do not match" : "Emails ne correspondent pas")
                  );
                },
              }),
            ]}
            dependencies={["login_email"]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateEmailButton;
