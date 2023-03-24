import Button from "antd/lib/button";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";
import React, {
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  ProductPublicInfo,
  ProductPrivateInfo,
} from "../../services/_types";
import updateProductPublic from "../../services/update-product-public";
import { LanguageCtx } from "../../services/context/language-ctx";
import Select from "antd/lib/select";
import TextArea from "antd/lib/input/TextArea";
import GetLanguage from "../../utils/front-end/get-language";
import Divider from "antd/lib/divider";
import type { UpdateProductPublicParams } from "../../pages/api/update-product/[id]/public";
import Text from "antd/lib/typography/Text";
import Notification from "../../services/notifications/notification";
import {
  SaveChangesCtx,
  useResetDirtyOnUnmount,
} from "../../services/context/save-changes-ctx";
import { ProductTypesCtx } from "../../services/context/products-types-ctx";
import moment, { Moment } from "moment";

import DatePicker from "antd/lib/date-picker";

const { Option } = Select;

type Props = {
  product: ProductPublicInfo;
  onSuccess: (product: ProductPrivateInfo) => void;
};

type Data = {
  title_en: string;
  title_fr: string;
  publish_date: Moment | null;
  all_author?: string;
  doi?: string;
  product_type_id?: number;
  note?: string;
};

const PublicProductForm: FC<Props> = ({ product, onSuccess }) => {
  const { en } = useContext(LanguageCtx);
  const [form] = useForm<Data>();
  const { productTypes } = useContext(ProductTypesCtx);
  const [loading, setLoading] = useState(false);
  const { dirty, setDirty, setSubmit } = useContext(SaveChangesCtx);
  useResetDirtyOnUnmount();

  /** Submits validated data */
  const submitValidated = useCallback(
    async (data: Data): Promise<boolean> => {
      if (!dirty) {
        new Notification().warning(en ? "No Changes" : "Aucun changement");
        return true;
      }
      setLoading(true);
      const params: UpdateProductPublicParams = {
        title_en: data.title_en,
        title_fr: data.title_fr,
        publish_date: data.publish_date?.toISOString() || null,
        all_author: data.all_author || "",
        doi: data.doi || "",
        product_type_id: data.product_type_id || null,
        note: data.note || "",
      };
      const newInfo = await updateProductPublic(product.id, params);

      setLoading(false);
      if (newInfo) {
        setDirty(false);
        onSuccess(newInfo);
      }
      return !!newInfo;
    },
    [onSuccess, product.id, dirty, en, setDirty]
  );

  /** When called from context - need to validate manually */
  const validateAndSubmit = useCallback(async () => {
    try {
      return submitValidated(await form.validateFields());
    } catch (e: any) {
      new Notification().warning(
        en ? "A field is invalid!" : "Un champ est invalide !"
      );
      return false;
    }
  }, [en, form, submitValidated]);

  /** Pass submit function to context */
  useEffect(() => {
    setSubmit(() => validateAndSubmit);
  }, [setSubmit, validateAndSubmit]);

  const initialValues: Data = {
    title_en: product.title_en,
    title_fr: product.title_fr,
    publish_date: product.publish_date
      ? moment(
          product.publish_date instanceof Date
            ? product.publish_date.toISOString().split("T")[0]
            : (product.publish_date as string).split("T")[0]
        )
      : null,
    all_author: product.all_author || "",
    doi: product.doi || "",
    product_type_id: product.product_type?.id,
    note: product.note || "",
  };

  return (
    <div className="public-product-form-container">
      <Divider />
      <Form
        form={form}
        onFinish={submitValidated}
        initialValues={initialValues}
        layout="vertical"
        className="public-product-form"
        onValuesChange={() => setDirty(true)}
      >
        <Form.Item
          label={en ? "Title (English)" : "Titre (Anglais)"}
          name="title_en"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={en ? "Title (French)" : "Titre (Français)"}
          name="title_fr"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={en ? "Product Type" : "Type de produit"}
          name="product_type_id"
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

        <Form.Item
          label={en ? "Publication date" : "Date de publication"}
          name="publish_date"
          className="date-picker"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label={en ? "Authors" : "Auteurs"} name="all_author">
          <TextArea rows={4} spellCheck="false" />
        </Form.Item>

        <Form.Item label={en ? "DOI" : "DOI"} name="doi">
          <Input />
        </Form.Item>

        <Form.Item label={en ? "Abstract" : "Résumé"} name="note">
          <TextArea rows={4} spellCheck="false" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ paddingLeft: 40, paddingRight: 40 }}
            size="large"
            loading={loading}
          >
            {en ? "Save Changes" : "Sauvegarder"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PublicProductForm;
