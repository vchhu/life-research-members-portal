import { Button, DatePicker } from "antd";
import Select from "antd/lib/select";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import React, { FC, useContext } from "react";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import type { Moment } from "moment";
import registerProduct from "../../services/register-product";
import { LanguageCtx } from "../../services/context/language-ctx";
import { ProductTypesCtx } from "../../services/context/products-types-ctx";
import GetLanguage from "../../utils/front-end/get-language";

const { Option } = Select;

type Data = {
  title_en: string;
  title_fr: string;
  //date: Moment | null;
  doi: String;
  all_author: string;
  on_going: boolean;
  peer_reviewed: boolean;
  product_type_id: number;
  note: string;
};

const RegisterProduct: FC = () => {
  const [form] = useForm<Data>();
  const { en } = useContext(LanguageCtx);
  const { productTypes } = useContext(ProductTypesCtx);

  async function handleRegister({
    title_en,
    title_fr,
    //date,
    doi,
    all_author,
    on_going,
    peer_reviewed,
    product_type_id,
    note,
  }: Data) {
    const res = await registerProduct({
      title_en,
      title_fr,
      // date,
      doi,
      all_author,
      on_going,
      peer_reviewed,
      product_type_id,
      note,
    });
    if (res) form.resetFields();
  }

  return (
    <div className="register-partner-form">
      <h1>{en ? "Register Product" : "Enregistrer un Produit"}</h1>
      <Form
        form={form}
        onFinish={handleRegister}
        style={{ width: "100%", maxWidth: "25rem" }}
        size="large"
        layout="vertical"
      >
        <Form.Item
          label={en ? "Title (English)" : "Titre (Anglais)"}
          name="title_en"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={en ? "Title (French)" : "Titre (Français)"}
          name="title_fr"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>
        {/*  <Form.Item
          label={en ? "Date" : "Date"}
          name="date"
          className="date-picker"
        >
          <DatePicker />
        </Form.Item> */}
        <Form.Item label={en ? "DOI" : "DOI"} name="doi">
          <Input />
        </Form.Item>
        <Form.Item
          label={en ? "All Authors" : "Tous les Auteurs"}
          name="all_author"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={en ? "On Going" : "En Cours"} name="on_going">
          <Input type="checkbox" />
        </Form.Item>
        <Form.Item
          label={en ? "Peer Reviewed" : "Examiné par les Pairs"}
          name="peer_reviewed"
        >
          <Input type="checkbox" />
        </Form.Item>
        <Form.Item
          label={en ? "Product Type" : "Type de Produit"}
          name="product_type_id"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Select>
            <Option value="">{""}</Option>
            {productTypes.map((f) => (
              <Option key={f.id} value={f.id}>
                <GetLanguage obj={f} />
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={en ? "Abstract" : "Résumé"} name="note">
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
export default RegisterProduct;
