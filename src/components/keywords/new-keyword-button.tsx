import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { Divider } from "antd";
import Button from "antd/lib/button/button";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input/Input";
import Modal from "antd/lib/modal";
import { FC, PropsWithChildren, useState, useContext } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import type { KeywordInfo } from "../../services/_types";
import type { keyword } from "@prisma/client";
import registerKeyword from "../../services/register-keyword";
import { KeywordsCtx } from "../../services/context/keywords-ctx";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";

type Props = { initialValue?: KeywordInfo; onSuccess?: (keyword: keyword) => void };

const NewKeywordModal: FC<PropsWithChildren<Props>> = ({ children, initialValue, onSuccess }) => {
  const { en } = useContext(LanguageCtx);
  const { keywords, add } = useContext(KeywordsCtx);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = useForm<KeywordInfo>();

  async function handleCreate(info: KeywordInfo) {
    setLoading(true);
    const newKeyword = await registerKeyword({
      name_en: info.name_en || "",
      name_fr: info.name_fr || "",
    });
    if (newKeyword) {
      add(newKeyword);
      onSuccess?.(newKeyword);
      setModalOpen(false);
    }
    setLoading(false);
  }

  const title = (
    <>
      <Title level={3}>{en ? "New Keyword" : "Nouveau Mot Clé"}</Title>
      <Text style={{ fontSize: "14px" }}>
        {en
          ? "You are encouraged to provide both languages, but it is not required."
          : "Vous êtes encouragé à fournir les deux langues, mais ce n'est pas obligatoire."}
      </Text>
    </>
  );

  return (
    <>
      <Button
        className="create-new-button"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
      >
        {children}
      </Button>
      <Modal
        title={title}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
        footer={null}
        width="fit-content"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValue}
          preserve={false}
          onFinish={handleCreate}
        >
          <Form.Item
            label={en ? "English" : "Anglais"}
            name="name_en"
            rules={[
              { max: 50, message: en ? "Maximum 50 characters" : "50 caractères maximum" },
              (form) => ({
                validator: (_, value?: string) => {
                  if (form.getFieldValue("name_fr") || value) return Promise.resolve();
                  return Promise.reject(
                    new Error(en ? "Provide at least one" : "Fournir au moins un")
                  );
                },
              }),
              {
                validator(_, value?: string) {
                  if (
                    !keywords.find(
                      (k) => k.name_en && value && k.name_en.toLowerCase() === value.toLowerCase()
                    )
                  )
                    return Promise.resolve();
                  return Promise.reject(new Error(en ? "Already exists" : "Existe déjà"));
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={en ? "French" : "Français"}
            name="name_fr"
            rules={[
              { max: 50, message: en ? "Maximum 50 characters" : "50 caractères maximum" },
              (form) => ({
                validator(_, value?: string) {
                  if (form.getFieldValue("name_en") || value) return Promise.resolve();
                  return Promise.reject(
                    new Error(en ? "Provide at least one" : "Fournir au moins un")
                  );
                },
              }),
              () => ({
                validator(_, value?: string) {
                  if (
                    !keywords.find(
                      (k) => k.name_fr && value && k.name_fr.toLowerCase() === value.toLowerCase()
                    )
                  )
                    return Promise.resolve();
                  return Promise.reject(new Error(en ? "Already exists" : "Existe déjà"));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Divider />
          <Button
            htmlType="submit"
            type="primary"
            style={{ marginLeft: "auto", display: "block" }}
            loading={loading}
          >
            {en ? "Submit" : "Soumettre"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default NewKeywordModal;
