import { Button, Col, DatePicker, Row } from "antd";
import Select from "antd/lib/select";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import React, { FC, useContext } from "react";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import type { Moment } from "moment";
import registerSupervision from "../../services/register-supervision";
import { LanguageCtx } from "../../services/context/language-ctx";
import { FacultiesCtx } from "../../services/context/faculties-ctx";
import { LevelsCtx } from "../../services/context/levels-ctx";
import GetLanguage from "../../utils/front-end/get-language";

const { Option } = Select;

type SupervisionData = {
  last_name: string;
  first_name: string;
  start_date: Moment | null;
  end_date: Moment | null;
  faculty_id: number | null;
  level_id: number | null;
  note: string | null;
};

const RegisterSupervision: FC = () => {
  const [form] = useForm<SupervisionData>();
  const { en } = useContext(LanguageCtx);
  const { faculties } = useContext(FacultiesCtx);
  const { levels } = useContext(LevelsCtx);

  async function handleRegister({
    last_name,
    first_name,
    start_date,
    end_date,
    faculty_id,
    level_id,
    note,
  }: SupervisionData) {
    const res = await registerSupervision({
      last_name,
      first_name,
      start_date: start_date ? start_date.toDate() : null,
      end_date: end_date ? end_date.toDate() : null,
      faculty_id: faculty_id || null,
      level_id: level_id || null,
      note: note || null,
    });
    if (res) form.resetFields();
  }

  return (
    <div className="register-supervision-form">
      <h1>{en ? "Register Supervision" : "Enregistrer une Supervision"}</h1>
      <Form
        form={form}
        onFinish={handleRegister}
        style={{ width: "100%", maxWidth: "30rem" }}
        size="large"
        layout="vertical"
      >
        <Form.Item
          label={en ? "Last Name" : "Nom"}
          name="last_name"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={en ? "First Name" : "Prénom"}
          name="first_name"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={en ? "Start Date" : "Date de Début"}
          name="start_date"
          className="date-picker"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label={en ? "End Date" : "Date de Fin"}
          name="end_date"
          className="date-picker"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label={en ? "Faculty" : "Faculté"} name="faculty_id">
          <Select>
            <Option value="">{""}</Option>
            {faculties.map((f) => (
              <Option key={f.id} value={f.id}>
                <GetLanguage obj={f} />
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={en ? "Level" : "Niveau"} name="level_id">
          <Select>
            <Option value="">{""}</Option>
            {levels.map((l) => (
              <Option key={l.id} value={l.id}>
                <GetLanguage obj={l} />
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={en ? "Note" : "Note"} name="note">
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

export default RegisterSupervision;
