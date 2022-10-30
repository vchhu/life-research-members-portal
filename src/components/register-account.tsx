import { Button } from "antd";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { FC, useContext } from "react";
import registerAccount from "../services/register-account";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useForm } from "antd/lib/form/Form";
import { LanguageCtx } from "../services/context/language-ctx";

type Data = {
  login_email: string;
  confirm_email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
};

async function handleRegister({ first_name, last_name, login_email, is_admin }: Data) {
  registerAccount({ first_name, last_name, login_email, is_admin });
}

const RegisterAccount: FC = () => {
  // This hook is important for type checking the form
  const [form] = useForm<Data>();
  const { en } = useContext(LanguageCtx);

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2vh",
      }}
    >
      <h1>Register Account</h1>
      <h2 style={{ marginBottom: 24 }}>
        {en
          ? "This page will create an account for the given email."
          : "Cette page créera un compte pour l'e-mail donné."}
      </h2>
      <Form
        form={form}
        onFinish={handleRegister}
        style={{ width: "100%", maxWidth: "25rem" }}
        size="large"
        layout="vertical"
      >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="login_email"
          rules={[
            { required: true, message: en ? "Required" : "Requis" },
            { type: "email", message: en ? "Invalid Email" : "Email invalide" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Confirm Email"
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
        >
          <Input />
        </Form.Item>
        <Form.Item name="is_admin" valuePropName="checked">
          <Checkbox>Grant Admin Privileges</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ paddingLeft: 40, paddingRight: 40 }}
            size="large"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterAccount;
