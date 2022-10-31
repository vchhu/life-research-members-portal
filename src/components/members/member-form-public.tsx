import Button from "antd/lib/button";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";
import React, { FC, Fragment, useContext } from "react";
import type { PrivateMemberInfo, ProblemInfo, PublicMemberInfo } from "../../services/_types";
import updateMember from "../../services/update-member";
import type { keyword, problem } from "@prisma/client";
import { LanguageCtx } from "../../services/context/language-ctx";
import Select from "antd/lib/select";
import TextArea from "antd/lib/input/TextArea";
import { FacultiesCtx } from "../../services/context/faculties-ctx";
import { KeywordsCtx } from "../../services/context/keywords-ctx";
import { MemberTypesCtx } from "../../services/context/member-types-ctx";
import GetLanguage from "../../utils/front-end/get-language";
import Divider from "antd/lib/divider";
import type { UpdateMemberParams } from "../../pages/api/update-member/[id]";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import KeywordListInput from "./keyword-list-input";

const { Option } = Select;

type Props = {
  member: PublicMemberInfo;
  onSuccess?: (member: PrivateMemberInfo) => void;
};

type Data = {
  first_name: string;
  last_name: string;
  about_me_en: string;
  about_me_fr: string;
  faculty_id?: number;
  type_id?: number;
  problems: ProblemInfo[];
  keywords: keyword[];
  work_email: string;
  work_phone: string;
  website_link: string;
  twitter_link: string;
  linkedin_link: string;
  cv_link: string;
};

const MemberFormPublic: FC<Props> = ({ member, onSuccess }) => {
  // This sets the return type of the form
  const [form] = useForm<Data>();
  const { en } = useContext(LanguageCtx);
  const { memberTypes } = useContext(MemberTypesCtx);
  const { faculties } = useContext(FacultiesCtx);
  const { keywords } = useContext(KeywordsCtx);

  async function handleUpdate(data: Data) {
    const { addProblems, deleteProblems } = diffProblems(data.problems);
    const params: UpdateMemberParams = {
      first_name: data.first_name,
      last_name: data.last_name,
      about_me_en: data.about_me_en,
      about_me_fr: data.about_me_fr,
      faculty_id: data.faculty_id || null,
      type_id: data.type_id || null,
      work_email: data.work_email,
      work_phone: data.work_phone,
      website_link: data.website_link,
      twitter_link: data.twitter_link,
      linkedin_link: data.linkedin_link,
      cv_link: data.cv_link,
      deleteProblems,
      addProblems,
      // deleteKeywords,
      // addKeywords,
    };
    const newInfo = await updateMember(member.id, params);
    if (newInfo && onSuccess) onSuccess(newInfo);
  }

  function getInitialProblems() {
    const problems: ProblemInfo[] = [];
    for (const i of [0, 1, 2]) {
      const problem = member.problem[i] as problem | undefined;
      problems[i] = { name_en: problem?.name_en || "", name_fr: problem?.name_fr || "" };
    }
    return problems;
  }

  function getInitialKeywords() {
    return member.has_keyword.map((k) => ({ ...k.keyword }));
  }

  function diffProblems(newProblems: ProblemInfo[]): {
    addProblems: ProblemInfo[];
    deleteProblems: number[];
  } {
    const oldProblems = member.problem;
    const addProblems = [];
    const deleteProblems = [];
    for (const [i, newP] of newProblems.entries()) {
      const oldP = oldProblems[i] as problem | undefined;
      const different = oldP?.name_en !== newP.name_en || oldP?.name_fr !== newP.name_fr;
      const hasName = newP.name_en || newP.name_fr;
      if (different) {
        if (oldP) deleteProblems.push(oldP.id);
        if (hasName) addProblems.push(newP);
      }
    }
    return { addProblems, deleteProblems };
  }

  const initialValues: Data = {
    first_name: member.account.first_name,
    last_name: member.account.last_name,
    about_me_en: member.about_me_en || "",
    about_me_fr: member.about_me_fr || "",
    faculty_id: member.faculty?.id,
    type_id: member.member_type?.id,
    work_email: member.work_email || "",
    work_phone: member.work_phone || "",
    website_link: member.website_link || "",
    twitter_link: member.twitter_link || "",
    linkedin_link: member.linkedin_link || "",
    cv_link: member.cv_link || "",
    problems: getInitialProblems(),
    keywords: getInitialKeywords(),
  };

  return (
    <div className="public-member-form-container">
      <Title level={4}>{en ? "Public Information" : "Information Publique"}</Title>
      <Text strong>
        {en
          ? "You are encouraged to provide both languages where applicable, but it is not required."
          : "Vous êtes encouragé à fournir les deux langues, le cas échéant, mais ce n'est pas obligatoire."}
      </Text>
      <Divider />
      <Form
        form={form}
        onFinish={handleUpdate}
        initialValues={initialValues}
        layout="vertical"
        className="public-member-form"
      >
        <div className="row">
          <Form.Item
            label={en ? "First Name" : "Prénom"}
            name="first_name"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={en ? "Last Name" : "Nom de Famille"}
            name="last_name"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={en ? "Member Type" : "Type de Membre"} name="type_id">
            <Select>
              <Option value={undefined}>{""}</Option>
              {memberTypes.map((f) => (
                <Option key={f.id} value={f.id}>
                  <GetLanguage obj={f} />
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="faculty" label={en ? "Faculty" : "Faculté"} name="faculty_id">
            <Select>
              <Option value={undefined}>{""}</Option>
              {faculties.map((f) => (
                <Option key={f.id} value={f.id}>
                  <GetLanguage obj={f} />
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={en ? "Work Email" : "Email de Travail"}
            name="work_email"
            rules={[{ type: "email", message: en ? "Invalid Email" : "Email Invalide" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={en ? "Work Phone" : "Téléphone de Travail"} name="work_phone">
            <Input type="tel" />
          </Form.Item>
        </div>

        <div className="row">
          <Form.Item
            label={en ? "About Me (English)" : "À Propos de Moi (Anglais)"}
            name="about_me_en"
          >
            <TextArea rows={4} spellCheck="false" />
          </Form.Item>

          <Form.Item
            label={en ? "About Me (French)" : "À Propos de Moi (Français)"}
            name="about_me_fr"
          >
            <TextArea rows={4} spellCheck="false" />
          </Form.Item>
        </div>

        <span>{en ? "Problems I Work On" : "Problèmes sur Lesquels Je Travaille"}</span>
        <Form.List name="problems">
          {(fields) =>
            fields.map((field) => (
              <Fragment key={field.key}>
                <Divider />
                <div className="row">
                  <Form.Item
                    name={[field.name, "name_en"]}
                    label={
                      en
                        ? "Problem " + (field.name + 1) + " (English)"
                        : "Problème " + (field.name + 1) + " (Anglais)"
                    }
                  >
                    <TextArea rows={1} spellCheck="false" />
                  </Form.Item>

                  <Form.Item
                    key={field.key}
                    name={[field.name, "name_fr"]}
                    label={
                      en
                        ? "Problem " + (field.name + 1) + " (French)"
                        : "Problème " + (field.name + 1) + " (Français)"
                    }
                  >
                    <TextArea rows={1} spellCheck="false" />
                  </Form.Item>
                </div>
              </Fragment>
            ))
          }
        </Form.List>

        <Form.Item label={en ? "Keywords" : "Mots Clés	"} name="keywords">
          <KeywordListInput />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ paddingLeft: 40, paddingRight: 40 }}
            size="large"
          >
            {en ? "Save Changes" : "Sauvegarder"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MemberFormPublic;
