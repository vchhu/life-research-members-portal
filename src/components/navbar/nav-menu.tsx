import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { useMsal } from "@azure/msal-react";
import Button from "antd/lib/button";
import Item from "antd/lib/list/Item";
import Menu from "antd/lib/menu";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";
import { FunctionComponent, useRef, useState } from "react";

const NavMenu: FunctionComponent = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();

  const links = [{ label: "Members" }];

  const items: MenuItemType[] = [{ label: "item 1" }, { label: "item 2" }, { label: "item 3" }].map(
    (item) => ({
      ...item,
      key: item.label,
    })
  );

  return (
    <div className="nav-menu">
      <Menu items={items} mode="horizontal"></Menu>
    </div>
  );
};

export default NavMenu;
