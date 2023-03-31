import { Button, Col, DatePicker, Row, Switch } from "antd";
import Select from "antd/lib/select";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import React, { FC, useContext, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import type { Moment } from "moment";
import registerEvent from "../../services/register-event";
import { LanguageCtx } from "../../services/context/language-ctx";
import { EventTypesCtx } from "../../services/context/event-types-ctx";
import { AllTopicsCtx } from "../../services/context/all-topics-ctx";
import GetLanguage from "../../utils/front-end/get-language";

const { Option } = Select;

type EventData = {
  name_en: string;
  name_fr: string;
  start_date: Moment | null;
  end_date: Moment | null;
  event_type_id: number;
  topic_id: number;
  note: string;
};

const RegisterEvent: FC = () => {
  const [form] = useForm<EventData>();
  const { en } = useContext(LanguageCtx);
  const { eventTypes } = useContext(EventTypesCtx);
  const { topics } = useContext(AllTopicsCtx);

  async function handleRegister({
    name_en,
    name_fr,
    start_date,
    end_date,
    event_type_id,
    topic_id,
    note,
  }: EventData) {
    const res = await registerEvent({
      name_en,
      name_fr,
      start_date: start_date ? start_date.toDate() : null,
      end_date: end_date ? end_date.toDate() : null,
      event_type_id,
      topic_id,
      note,
    });
    if (res) form.resetFields();
  }

  return (
    <div className="register-event-form">
      <h1>{en ? "Register Event" : "Enregistrer un Événement"}</h1>
      <Form
        form={form}
        onFinish={handleRegister}
        style={{ width: "100%", maxWidth: "30rem" }}
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

        <Form.Item
          label={en ? "Event Type" : "Type d'Événement"}
          name="event_type_id"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Select>
            <Option value="">{""}</Option>
            {eventTypes.map((f) => (
              <Option key={f.id} value={f.id}>
                <GetLanguage obj={f} />
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={en ? "Topic" : "Sujet"}
          name="topic_id"
          rules={[{ required: true, message: en ? "Required" : "Requis" }]}
        >
          <Select>
            <Option value="">{""}</Option>
            {topics.map((f) => (
              <Option key={f.id} value={f.id}>
                <GetLanguage obj={f} />
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

export default RegisterEvent;
