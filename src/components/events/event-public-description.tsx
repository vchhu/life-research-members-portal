import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { EventPublicInfo } from "../../services/_types";
import { LanguageCtx } from "../../services/context/language-ctx";
import React from "react";
import { Tag } from "antd";
import SafeLink from "../link/safe-link";
import PageRoutes from "../../routing/page-routes";

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

      <Item label={en ? "Member Involved" : "Membre impliqué"}>
        {event.event_member_involved.map((entry, i) => (
          <SafeLink
            key={entry.member.id}
            href={PageRoutes.memberProfile(entry.member.id)}
          >
            <Tag color="blue">
              {entry.member.account.first_name +
                " " +
                entry.member.account.last_name}
            </Tag>
          </SafeLink>
        ))}
      </Item>

      <Item label={en ? "Event Partnership" : "Partenariat de l'événement"}>
        {event.event_partner_involved.map((entry, i) => (
          <SafeLink
            key={entry.organization.id}
            href={PageRoutes.organizationProfile(entry.organization.id)}
          >
            <Tag color="green">
              {en ? entry.organization.name_en : entry.organization.name_fr}
            </Tag>
          </SafeLink>
        ))}
      </Item>

      <Item label={en ? "Grant Resulted" : "Subvention résultante"}>
        <ol>
          {event.event_grant_resulted.map((entry, i) =>
            entry.grant ? (
              <li key={entry.grant.id}>
                <SafeLink href={PageRoutes.grantProfile(entry.grant.id)}>
                  {entry.grant.title}
                </SafeLink>
              </li>
            ) : null
          )}
        </ol>
      </Item>

      <Item label={en ? "Product Resulted" : "Produit résultant"}>
        <ol>
          {event.event_product_resulted.map((entry, i) =>
            entry.product ? (
              <li key={entry.product.id}>
                <SafeLink href={PageRoutes.productProfile(entry.product.id)}>
                  {en ? entry.product.title_en : entry.product.title_fr}
                </SafeLink>
              </li>
            ) : null
          )}
        </ol>
      </Item>

      <Item label={en ? "Product Topic" : "Sujet du produit"}>
        {event.event_topic.map((entry, i) => (
          <Tag key={i} color="blue">
            {en ? entry.topic.name_fr : entry.topic.name_en}
          </Tag>
        ))}
      </Item>
      <Item label={en ? "Topic" : "Sujet"}>
        {event.topic ? (en ? event.topic.name_en : event.topic.name_fr) : ""}
      </Item>
      <Item label={en ? "Note" : "Note"} style={{ whiteSpace: "break-spaces" }}>
        {event.note}
      </Item>
    </Descriptions>
  );
};

export default PublicEventDescription;
