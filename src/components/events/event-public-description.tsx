import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { EventPublicInfo } from "../../services/_types";
import { LanguageCtx } from "../../services/context/language-ctx";
import React from "react";
import { Tag } from "antd";

const { useBreakpoint } = Grid;

type Props = {
  event: EventPublicInfo;
};

const PublicEventDescription: FC<Props> = ({ event }) => {
  const screens = useBreakpoint();
  const { en } = useContext(LanguageCtx);

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: 0 }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item label={en ? "Name (English)" : "Nom (anglais)"}>
        {event.name_en}
      </Item>
      <Item label={en ? "Name (French)" : "Nom (français)"}>
        {event.name_fr}
      </Item>
      <Item label={en ? "Start Date" : "Date de début"}>
        {event.start_date
          ? new Date(event.start_date).toISOString().split("T")[0]
          : ""}
      </Item>
      <Item label={en ? "End Date" : "Date de fin"}>
        {event.end_date
          ? new Date(event.end_date).toISOString().split("T")[0]
          : ""}
      </Item>
      <Item label={en ? "Event Type" : "Type d'événement"}>
        {event.event_type
          ? en
            ? event.event_type.name_en
            : event.event_type.name_fr
          : ""}
      </Item>
      <Item label={en ? "Topic" : "Sujet"}>
        {event.topic ? (en ? event.topic.name_en : event.topic.name_fr) : ""}
      </Item>
      <Item label={en ? "Note" : "Note"} style={{ whiteSpace: "break-spaces" }}>
        {event.note}
      </Item>

      <Item label={en ? "Member Involved" : "Membre impliqué"}>
        {event.event_member_involved.map((entry, i) => (
          <Tag key={entry.member.id} color="blue">
            {entry.member.account.first_name +
              " " +
              entry.member.account.last_name}
          </Tag>
        ))}
      </Item>

      <Item label={en ? "Event Partnership" : "Partenariat de l'événement"}>
        {event.event_partner_involved.map((entry, i) => (
          <Tag key={entry.organization.id} color="green">
            {en ? entry.organization.name_en : entry.organization.name_fr}
          </Tag>
        ))}
      </Item>

      <Item label={en ? "Grant Resulted" : "Subvention résultante"}>
        {event.event_grant_resulted.map((entry, i) =>
          entry.grant ? (
            <Tag key={entry.grant.id} color="orange">
              {entry.grant.title}
            </Tag>
          ) : null
        )}
      </Item>

      <Item label={en ? "Product Resulted" : "Produit résultant"}>
        {event.event_product_resulted.map((entry, i) =>
          entry.product ? (
            <Tag key={entry.product.id} color="red">
              {en ? entry.product.title_en : entry.product.title_fr}
            </Tag>
          ) : null
        )}
      </Item>

      <Item label={en ? "Product Topic" : "Sujet du produit"}>
        {event.event_topic.map((entry, i) => (
          <Tag key={i} color="blue">
            {en ? entry.topic.name_fr : entry.topic.name_en}
          </Tag>
        ))}
      </Item>
    </Descriptions>
  );
};

export default PublicEventDescription;
