import Button from "antd/lib/button";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import React, { FC, useContext, useState } from "react";
import type { MemberPrivateInfo, ProblemInfo, MemberPublicInfo } from "../../services/_types";
import { LanguageCtx } from "../../services/context/language-ctx";
import Select from "antd/lib/select";
import TextArea from "antd/lib/input/TextArea";
import { FacultiesCtx } from "../../services/context/faculties-ctx";
import { MemberTypesCtx } from "../../services/context/member-types-ctx";
import Divider from "antd/lib/divider";
import Text from "antd/lib/typography/Text";
import type { Moment } from "moment";
import type { UpdateMemberInsightParams } from "../../pages/api/update-member/[id]/insight";
import updateMemberInsight from "../../services/update-member-insight";
import moment from "moment";
import DatePicker from "antd/lib/date-picker";

const { Option } = Select;

type Props = {
  member: MemberPrivateInfo;
  onValuesChange?: (changedValues: any, values: Data) => void;
  onSuccess?: (member: MemberPrivateInfo) => void;
};

type Data = {
  interview_date: Moment | null;
  about_member: string;
  about_promotions: string;
  dream: string;
  how_can_we_help: string;
  admin_notes: string;
  other_notes: string;
};

const MemberInsightForm: FC<Props> = ({ member, onValuesChange, onSuccess }) => {
  // This sets the return type of the form
  const [form] = useForm<Data>();
  const { en } = useContext(LanguageCtx);
  const { memberTypes } = useContext(MemberTypesCtx);
  const { faculties } = useContext(FacultiesCtx);
  const [loading, setLoading] = useState(false);
  const insight = member.insight;

  async function handleUpdate(data: Data) {
    setLoading(true);
    const params: UpdateMemberInsightParams = {
      interview_date: data.interview_date?.toISOString() || null,
      about_member: data.about_member,
      about_promotions: data.about_promotions,
      dream: data.dream,
      how_can_we_help: data.how_can_we_help,
      admin_notes: data.admin_notes,
      other_notes: data.other_notes,
    };
    const newInfo = await updateMemberInsight(member.id, params);
    setLoading(false);
    if (newInfo && onSuccess) onSuccess(newInfo);
  }

  const initialValues: Data = {
    interview_date: insight?.interview_date ? moment(insight.interview_date) : null,
    about_member: insight?.about_member || "",
    about_promotions: insight?.about_promotions || "",
    dream: insight?.dream || "",
    how_can_we_help: insight?.how_can_we_help || "",
    admin_notes: insight?.admin_notes || "",
    other_notes: insight?.other_notes || "",
  };

  return (
    <div className="member-insight-form-container">
      <Text strong>
        {en
          ? "The institution is here to help, give us some insight into yourself."
          : "L'institution est là pour vous aider, donnez-nous un aperçu de vous-même."}
      </Text>
      <Divider />
      <Form
        form={form}
        onFinish={handleUpdate}
        initialValues={initialValues}
        layout="vertical"
        className="member-insight-form"
        onValuesChange={onValuesChange}
      >
        <Form.Item label={en ? "Interview Date" : "Date de l'entretien"} name="interview_date">
          <DatePicker />
        </Form.Item>
        <div className="row">
          <Form.Item label={en ? "About Member" : "À propos du membre"} name="about_member">
            <TextArea />
          </Form.Item>

          <Form.Item
            label={en ? "About Promotions" : "À propos des promotions"}
            name="about_promotions"
          >
            <TextArea />
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item label={en ? "Dream" : "Rêver"} name="dream">
            <TextArea />
          </Form.Item>

          <Form.Item
            label={en ? "How the institute can help" : "Comment l'institut peut vous aider"}
            name="how_can_we_help"
          >
            <TextArea />
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item label={en ? "Admin Notes" : "Notes d'administration"} name="admin_notes">
            <TextArea />
          </Form.Item>

          <Form.Item label={en ? "Other Notes" : "Autres notes"} name="other_notes">
            <TextArea />
          </Form.Item>
        </div>
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

export default MemberInsightForm;
