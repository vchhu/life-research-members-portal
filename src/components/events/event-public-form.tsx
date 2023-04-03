import React, { FC, useContext, useState, useCallback, useEffect } from "react";
import { Form, Input, Select, Button, DatePicker, Divider } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { useForm } from "antd/lib/form/Form";
import { LanguageCtx } from "../../services/context/language-ctx";
import {
  SaveChangesCtx,
  useResetDirtyOnUnmount,
} from "../../services/context/save-changes-ctx";
import moment, { Moment } from "moment";
import Notification from "../../services/notifications/notification";
import type { organization } from "@prisma/client";
import type { grant } from "@prisma/client";
import type { product } from "@prisma/client";
import type { topic } from "@prisma/client";
import type {
  EventPrivateInfo,
  EventPublicInfo,
  MemberPublicInfo,
} from "../../services/_types";

// Import additional required components
import TopicSelector from "../topics/topic-selector";
import MemberSelector from "../members/member-selector";
import PartnerSelector from "../partners/partner-selector";
import ProductSelector from "../products/product-selector";
import { EventTypesCtx } from "../../services/context/event-types-ctx";
import GetLanguage from "../../utils/front-end/get-language";
import type { UpdateEventPublicParams } from "../../pages/api/update-event/[id]/public";
import updateEventPublic from "../../services/update-event-public";

const { Option } = Select;

type Props = {
  event: EventPublicInfo;
  onSuccess: (event: EventPrivateInfo) => void;
};

type EventMemberInvolved = {
  member: {
    id: number;
    account: {
      first_name: string;
      last_name: string;
    };
  };
};

type Data = {
  name_en: string;
  name_fr: string;
  start_date: Moment | null;
  end_date: Moment | null;
  event_type_id?: number;
  note?: string;
  topics: Map<number, topic>;
  members: Map<number, MemberPublicInfo>;
  organizations: Map<number, organization>;
  grants: Map<number, grant>;
  products: Map<number, product>;
};

const PublicEventForm: FC<Props> = ({ event, onSuccess }) => {
  const { en } = useContext(LanguageCtx);
  const [form] = useForm<Data>();
  const { eventTypes } = useContext(EventTypesCtx);
  const [loading, setLoading] = useState(false);
  const { dirty, setDirty, setSubmit } = useContext(SaveChangesCtx);
  useResetDirtyOnUnmount();

  // Implement the necessary functions to compare and update event data

  const diffMembers = useCallback(
    (
      newMembers: Map<number, MemberPublicInfo>
    ): {
      deleteMembers: number[];
      addMembers: number[];
    } => {
      const oldIds = new Set<number>();
      const newIds = new Set<number>();
      const deleteMembers: number[] = [];
      const addMembers: number[] = [];
      for (const event_member_involved of event.event_member_involved)
        oldIds.add(event_member_involved.member.id);
      for (const member of newMembers.values()) newIds.add(member.id);
      for (const oldId of oldIds.values())
        if (!newIds.has(oldId)) deleteMembers.push(oldId);
      for (const newId of newIds.values())
        if (!oldIds.has(newId)) addMembers.push(newId);
      return { deleteMembers, addMembers };
    },
    [event.event_member_involved]
  );

  const diffPartners = useCallback(
    (
      newPartners: Map<number, organization>
    ): {
      deletePartners: number[];
      addPartners: number[];
    } => {
      const oldIds = new Set<number>();
      const newIds = new Set<number>();
      const deletePartners: number[] = [];
      const addPartners: number[] = [];
      for (const event_partner_involved of event.event_partner_involved)
        oldIds.add(event_partner_involved.organization.id);
      for (const organization of newPartners.values())
        newIds.add(organization.id);
      for (const oldId of oldIds.values())
        if (!newIds.has(oldId)) deletePartners.push(oldId);
      for (const newId of newIds.values())
        if (!oldIds.has(newId)) addPartners.push(newId);
      return { deletePartners, addPartners };
    },
    [event.event_partner_involved]
  );

  const diffTopics = useCallback(
    (
      newTopics: Map<number, topic>
    ): {
      deleteTopics: number[];
      addTopics: number[];
    } => {
      const oldIds = new Set<number>();
      const newIds = new Set<number>();
      const deleteTopics: number[] = [];
      const addTopics: number[] = [];
      for (const event_topic of event.event_topic)
        oldIds.add(event_topic.topic.id);
      for (const topic of newTopics.values()) newIds.add(topic.id);
      for (const oldId of oldIds.values())
        if (!newIds.has(oldId)) deleteTopics.push(oldId);
      for (const newId of newIds.values())
        if (!oldIds.has(newId)) addTopics.push(newId);
      return { deleteTopics, addTopics };
    },
    [event.event_topic]
  );

  const diffProducts = useCallback(
    (
      newProducts: Map<number, product>
    ): {
      deleteProducts: number[];
      addProducts: number[];
    } => {
      const oldIds = new Set<number>();
      const newIds = new Set<number>();
      const deleteProducts: number[] = [];
      const addProducts: number[] = [];
      for (const event_product_resulted of event.event_product_resulted)
        oldIds.add(event_product_resulted.product.id);
      for (const product of newProducts.values()) newIds.add(product.id);
      for (const oldId of oldIds.values())
        if (!newIds.has(oldId)) deleteProducts.push(oldId);
      for (const newId of newIds.values())
        if (!oldIds.has(newId)) addProducts.push(newId);
      return { deleteProducts, addProducts };
    },
    [event.event_product_resulted]
  );

  /** Submits validated data */
  const submitValidated = useCallback(
    async (data: Data): Promise<boolean> => {
      if (!dirty) {
        new Notification().warning(en ? "No Changes" : "Aucun changement");
        return true;
      }
      setLoading(true);

      const { addPartners, deletePartners } = diffPartners(data.organizations);
      const { addMembers, deleteMembers } = diffMembers(data.members);
      const { addTopics, deleteTopics } = diffTopics(data.topics);
      const { addProducts, deleteProducts } = diffProducts(data.products);

      // Update the necessary fields and relations for the event
      const params: UpdateEventPublicParams = {
        name_en: data.name_en,
        name_fr: data.name_fr,
        start_date: data.start_date?.toISOString() || null,
        end_date: data.end_date?.toISOString() || null,
        event_type_id: data.event_type_id || null,
        note: data.note || "",
        addTopics,
        deleteTopics,
        addMembers,
        deleteMembers,
        addPartners,
        deletePartners,
        addProducts,
        deleteProducts,
      };

      const newInfo = await updateEventPublic(event.id, params);
      setLoading(false);
      if (newInfo) {
        setDirty(false);
        onSuccess(newInfo);
      }
      return !!newInfo;
    },
    [
      onSuccess,
      event.id,
      dirty,
      en,
      diffMembers,
      diffPartners,
      diffProducts,
      diffTopics,
      setDirty,
    ]
  );

  function getInitialMembers(event_member_involved: EventMemberInvolved[]) {
    const initialMembers = new Map(
      event_member_involved.map((k) => [
        k.member.id,
        {
          id: k.member.id,
          account: {
            first_name: k.member.account.first_name,
            last_name: k.member.account.last_name,
          },
        },
      ])
    );
    return initialMembers;
  }

  function getInitialTopics() {
    return new Map(event.event_topic.map((k) => [k.topic.id, k.topic]));
  }

  function getInitialPartners() {
    return new Map(
      event.event_partner_involved.map((k) => [
        k.organization.id,
        k.organization,
      ])
    );
  }

  function getInitialProducts() {
    return new Map(
      event.event_product_resulted.map((k) => [k.product.id, k.product])
    );
  }

  const initialValues: Data = {
    // Set the initial values for the event form
    name_en: event.name_en,
    name_fr: event.name_fr,
    start_date: event.start_date
      ? moment(
          event.start_date instanceof Date
            ? event.start_date.toISOString().split("T")[0]
            : (event.start_date as string).split("T")[0]
        )
      : null,
    end_date: event.end_date
      ? moment(
          event.end_date instanceof Date
            ? event.end_date.toISOString().split("T")[0]
            : (event.end_date as string).split("T")[0]
        )
      : null,
    event_type_id: event.event_type?.id,
    note: event.note || "",
    products: getInitialProducts(),
    organizations: getInitialPartners(),
    // @ts-ignore
    members: getInitialMembers(event.event_member_involved),
    topics: getInitialTopics(),
  };

  return (
    <div className="public-event-form-container">
      <Divider />
      <Form
        form={form}
        onFinish={submitValidated}
        initialValues={initialValues}
        layout="vertical"
        className="public-event-form"
        onValuesChange={() => setDirty(true)}
      >
        <Form.Item
          label={en ? "Name (English)" : "Nom (Anglais)"}
          name="name_en"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={en ? "Name (French)" : "Nom (Français)"}
          name="name_fr"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={en ? "Start Date" : "Date de début"}
          name="start_date"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label={en ? "End Date" : "Date de fin"} name="end_date">
          <DatePicker />
        </Form.Item>

        <Form.Item
          label={en ? "Event Type" : "Type d'événement"}
          name="event_type_id"
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

        <Form.Item label={en ? "Note" : "Note"} name="note">
          <TextArea rows={4} spellCheck="false" />
        </Form.Item>

        <label htmlFor="topics">
          {en ? "Event Topics" : "Sujets de l'événement"}
        </label>
        <Form.Item name="topics">
          <TopicSelector
            setErrors={(e) => form.setFields([{ name: "topics", errors: e }])}
          />
        </Form.Item>

        <label htmlFor="members">
          {en ? "Event Members" : "Membres de l'événement"}
        </label>
        <Form.Item name="members">
          <MemberSelector
            setErrors={(e) => form.setFields([{ name: "members", errors: e }])}
          />
        </Form.Item>

        <label htmlFor="organizations">
          {en ? "Event Partners" : "Partenaires de l'événement"}
        </label>
        <Form.Item name="organizations">
          <PartnerSelector
            setErrors={(e) =>
              form.setFields([{ name: "organizations", errors: e }])
            }
          />
        </Form.Item>

        <label htmlFor="products">
          {en ? "Event Products" : "Produits de l'événement"}
        </label>
        <Form.Item name="products">
          <ProductSelector
            setErrors={(e) => form.setFields([{ name: "products", errors: e }])}
          />
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

export default PublicEventForm;
