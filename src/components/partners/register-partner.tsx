import { Button, Select } from "antd";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { FC, useContext } from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useForm } from "antd/lib/form/Form";
import { LanguageCtx } from "../../services/context/language-ctx";

type Data = {
  Name: string;
  Type: string;
  Scope: string;
  Members: string[];
  Notes: string;
};

const RegisterPartner: FC = () => {
  // This hook is important for type checking the form
  const [form] = useForm<Data>();
  const { en } = useContext(LanguageCtx);

  // async function handleRegister({ Name, Type, Scope, Members, Notes }: Data) {
  //   const res = await registerPartner({ Name, Type, Scope, Members, Notes });
  //   if (res) form.resetFields();
  // }

  return (
    <div className="register-partner-form">
      <h1>{en ? "Register Partner" : "Enregistrer un Partenaire"}</h1>
      <h2 style={{ marginBottom: 24 }}>
        {en
          ? "This page will register a new partner."
          : "Cette page enregistrera un nouveau partenaire."}
      </h2>
      <Form
        form={form}
        //onFinish={handleRegister}
        style={{ width: "100%", maxWidth: "25rem" }}
        size="large"
        layout="vertical"
      >
        <Form.Item
          label={en ? "Name" : "Nom"}
          name="Name"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={en ? "Type" : "Type"} name="Type">
          <Select>
            <Select.Option value="Type1">Type1</Select.Option>
            <Select.Option value="Type2">Type2</Select.Option>
            <Select.Option value="Type3">Type3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={en ? "Scope" : "Portée"} name="Scope">
          <Select>
            <Select.Option value="Scope1">Scope1</Select.Option>
            <Select.Option value="Scope2">Scope2</Select.Option>
            <Select.Option value="Scope3">Scope3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={en ? "Members" : "Membres"} name="Members">
          <Select mode="multiple">
            <Select.Option value="Member1">Member1</Select.Option>
            <Select.Option value="Member2">Member2</Select.Option>
            <Select.Option value="Member3">Member3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={en ? "Notes" : "Notes"} name="Notes">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ paddingLeft: 40, paddingRight: 40 }}
            size="large"
          >
            {en ? "Register Partner" : "Enregistrer un Partenaire"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPartner;
