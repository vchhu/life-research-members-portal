import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { useMsal } from "@azure/msal-react";
import Button from "antd/lib/button";
import Item from "antd/lib/list/Item";
import Menu from "antd/lib/menu";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";
import Spin from "antd/lib/spin";
import Link from "next/link";
import { FunctionComponent, useContext, useRef, useState } from "react";
import { LocalAccountCtx } from "../../context/local-account-ctx";
import PageRoutes from "../../utils/front-end/page-routes";

const NavMenu: FunctionComponent = () => {
  // const { localAccount, loading } = useContext(LocalAccountCtx);

  // // Everyone
  // const generalItems = [{ label: "Members", href: PageRoutes.members }];

  // // Registered Acounts
  // const registeredItems = [
  //   { label: "My Profile", href: PageRoutes.viewAccount + localAccount?.id },
  // ];

  // // Admins
  // const adminItems = [
  //   { label: "Accounts", href: PageRoutes.accounts },
  //   { label: "Register", href: PageRoutes.register },
  // ];

  // const items: { label: string; href: string }[] = [...generalItems];
  // if (!loading) {
  //   if (localAccount) for (const it of registeredItems) items.push(it);
  //   if (localAccount?.is_admin) for (const it of adminItems) items.push(it);
  // }

  // const menuItems: MenuItemType[] = items.map((it) => ({
  //   label: (
  //     <Link href={it.href}>
  //       <a>{it.label}</a>
  //     </Link>
  //   ),
  //   key: it.label,
  // }));

  // if (loading) menuItems.push({ label: <Spin />, key: "loading" });

  return (
    <div className="nav-menu">
      {/* <Menu
        items={menuItems}
        mode="horizontal"
        overflowedIndicator={<MenuOutlined className="collapsed-icon" />}
        style={{ fontSize: "inherit" }}
      /> */}
    </div>
  );
};

export default NavMenu;
