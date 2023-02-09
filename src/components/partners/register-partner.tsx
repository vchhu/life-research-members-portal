import { Button } from "antd";
import Select from "antd/lib/select";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import React, { FC, useContext } from "react";
import { useForm } from "antd/lib/form/Form";
import registerPartner from "../../services/register-partner";
import { LanguageCtx } from "../../services/context/language-ctx";
import { OrgTypesCtx } from "../../services/context/org-types-ctx";
import { OrgScopeCtx } from "../../services/context/org-scopes-ctx";
import { FacultiesCtx } from "../../services/context/faculties-ctx";
import GetLanguage from "../../utils/front-end/get-language";

const { Option } = Select;

type Data = {
  name_en: string;
  name_fr: string;
  scope_id: number;
  type_id: number;
  description: string;
};

const RegisterPartner: FC = () => {
  const [form] = useForm<Data>();
  const { en } = useContext(LanguageCtx);
  //const { orgTypes } = useContext(OrgTypesCtx);
  const { faculties } = useContext(FacultiesCtx);
  //const { orgScopes } = useContext(OrgScopeCtx);

  async function handleRegister({
    name_en,
    name_fr,
    scope_id,
    type_id,
    description,
  }: Data) {
    const res = await registerPartner({
      name_en,
      name_fr,
      scope_id,
      type_id,
      description,
    });
    if (res) form.resetFields();
  }

  return (
    <div className="register-partner-form">
      <h1>{en ? "Register Partner" : "Enregistrer un Partenaire"}</h1>
      <Form
        form={form}
        onFinish={handleRegister}
        style={{ width: "100%", maxWidth: "25rem" }}
        size="large"
        layout="vertical"
      >
        <Form.Item
          label={en ? "Name (English)" : "Nom (Anglais)"}
          name="name_en"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={en ? "Name (French)" : "Nom (Français)"}
          name="name_fr"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={en ? "Scope ID" : "ID de Portée"}
          name="scope_id"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label={en ? "Organization Type" : "Type de l'organisation"}
          name="type_id"
        >
          <Select>
            <Option value="">{""}</Option>
            {faculties.map((f) => (
              <Option key={f.id} value={f.id}>
                <GetLanguage obj={f} />
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={en ? "Description" : "Description"}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ paddingLeft: 40, paddingRight: 40 }}
            size="large"
          >
            {en ? "Register" : "Enregistrer"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPartner;
