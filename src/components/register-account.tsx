import { Button } from "antd";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";
import { FunctionComponent, useRef } from "react";
import ApiRoutes from "../routing/api-routes";
import authHeader from "../api-facade/headers/auth-header";
import { contentTypeJsonHeader } from "../api-facade/headers/content-type-headers";

type Data = { email: string };

const RegisterAccount: FunctionComponent = () => {
  const [form] = useForm<Data>();

  async function registerAccount(data: Data) {
    try {
      const result = await fetch(ApiRoutes.registerAccount, {
        method: "PUT",
        headers: { ...(await authHeader()), ...contentTypeJsonHeader },
        body: JSON.stringify({ microsoft_email: data.email }),
      });
      if (!result.ok) {
        const e = await result.text();
        console.error(e);
        alert(e);
        return;
      }
      alert("Sucess! Account added: " + (await result.text()));
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Register Account</h1>
      <p style={{ marginBottom: 24 }}>
        This page will create an account and assign it to an email address.
      </p>
      <Form form={form} onFinish={registerAccount} style={{ width: "100%", maxWidth: "25rem" }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Invalid Email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit" style={{ paddingLeft: 40, paddingRight: 40 }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterAccount;
