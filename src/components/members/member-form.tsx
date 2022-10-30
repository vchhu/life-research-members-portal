import Button from "antd/lib/button";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";
import { FC, useContext } from "react";
import InputNumber from "antd/lib/input-number";
import type { PrivateMemberInfo, PublicMemberInfo } from "../../services/_types";
import updateMember from "../../services/update-member";
import type { keyword } from "@prisma/client";
import { LanguageCtx } from "../../services/context/language-ctx";
import Select from "antd/lib/select";
import TextArea from "antd/lib/input/TextArea";
import { FacultiesCtx } from "../../services/context/faculties-ctx";
import { KeywordsCtx } from "../../services/context/keywords-ctx";
import { MemberTypesCtx } from "../../services/context/member-types-ctx";
import GetLanguage from "../../utils/front-end/get-language";

const { Option } = Select;

type Props = {
  member: PublicMemberInfo;
  onSuccess?: (member: PrivateMemberInfo) => void;
};

type Data = {
  first_name: string;
  last_name: string;
  about_me: string;
  faculty_id?: number;
  type_id?: number;
  // problem1_en: string;
  // problem1_fr: string;
  // problem2_en: string;
  // problem2_fr: string;
  // problem3_en: string;
  // problem3_fr: string;
  // keywords: keyword[];
  work_email: string;
  work_phone: string;
  website_link: string;
  twitter_link: string;
  linkedin_link: string;
  cv_link: string;
};

const MemberForm: FC<Props> = ({ member, onSuccess }) => {
  // This sets the return type of the form
  const [form] = useForm<Data>();
  const { en } = useContext(LanguageCtx);
  const { memberTypes } = useContext(MemberTypesCtx);
  const { faculties } = useContext(FacultiesCtx);
  const { keywords } = useContext(KeywordsCtx);

  async function handleUpdate({
    first_name,
    last_name,
    about_me,
    faculty_id,
    type_id,
    work_email,
    work_phone,
    website_link,
    twitter_link,
    linkedin_link,
    cv_link,
  }: Data) {
    const params = {
      first_name,
      last_name,
      about_me,
      faculty_id,
      type_id,
      work_email,
      work_phone,
      website_link,
      twitter_link,
      linkedin_link,
      cv_link,
      // deleteProblems,
      // addProblems,
      // deleteKeywords,
      // addKeywords,
    };
    const newInfo = await updateMember(member.id, params);
    if (newInfo && onSuccess) onSuccess(newInfo);
  }

  const initialValues: Data = {
    first_name: member.account.first_name,
    last_name: member.account.last_name,
    about_me: member.about_me || "",
    faculty_id: member.faculty?.id,
    type_id: member.member_type?.id,
    work_email: member.work_email || "",
    work_phone: member.work_phone || "",
    website_link: member.website_link || "",
    twitter_link: member.twitter_link || "",
    linkedin_link: member.linkedin_link || "",
    cv_link: member.cv_link || "",
  };

  return (
    <Form
      form={form}
      onFinish={handleUpdate}
      initialValues={initialValues}
      layout="vertical"
      className="member-form"
    >
      <div className="row">
        <Form.Item
          className="first-name"
          label={en ? "First Name" : "Prénom"}
          name="first_name"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="last-name"
          label={en ? "Last Name" : "Nom de Famille"}
          name="last_name"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="member-type"
          label={en ? "Member Type" : "Type de Membre"}
          name="type_id"
        >
          <Select>
            {memberTypes.map((f) => (
              <Option key={f.id} value={f.id}>
                <GetLanguage obj={f} />
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className="faculty" label={en ? "Faculty" : "Faculté"} name="faculty_id">
          <Select>
            {faculties.map((f) => (
              <Option key={f.id} value={f.id}>
                <GetLanguage obj={f} />
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="row">
        <Form.Item
          className="work-phone"
          label={en ? "Work Phone" : "Téléphone de Travail"}
          name="work_phone"
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="work-email"
          label={en ? "Work Email" : "Email de Travail"}
          name="work_email"
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item className="about-me" label={en ? "About Me" : "À Propos de Moi"} name="about_me">
        <TextArea />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ paddingLeft: 40, paddingRight: 40 }}
          size="large"
        >
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MemberForm;
