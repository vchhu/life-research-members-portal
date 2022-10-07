import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import Menu from "antd/lib/menu";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";
import Spin from "antd/lib/spin";
import Link from "next/link";
import { FunctionComponent, useContext } from "react";
import { AccountCtx } from "../../context/account-ctx";
import PageRoutes from "../../routing/page-routes";

const NavMenu: FunctionComponent = () => {
  const { localAccount, loading } = useContext(AccountCtx);

  // Everyone
  const generalItems = [{ label: "Members", href: PageRoutes.members }];

  // Registered Acounts
  const registeredItems = [{ label: "My Profile", href: PageRoutes.myProfile }];

  // Admins
  const adminItems = [
    { label: "Accounts", href: PageRoutes.accounts },
    { label: "Register", href: PageRoutes.register },
  ];

  const items: { label: string; href: string }[] = generalItems;
  if (!loading) {
    if (localAccount) for (const it of registeredItems) items.push(it);
    if (localAccount?.is_admin) for (const it of adminItems) items.push(it);
  }

  const menuItems: MenuItemType[] = items.map((it) => ({
    label: (
      <Link href={it.href}>
        <a>{it.label}</a>
      </Link>
    ),
    key: it.label,
  }));

  if (loading) menuItems.push({ label: <Spin />, key: "loading" });

  return (
    <div className="nav-menu">
      <Menu
        items={menuItems}
        mode="horizontal"
        overflowedIndicator={<MenuOutlined className="collapsed-icon" />}
        style={{ fontSize: "inherit" }}
      />
    </div>
  );
};

export default NavMenu;
