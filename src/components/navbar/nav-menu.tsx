import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import Menu from "antd/lib/menu";
import type { MenuItemType } from "antd/lib/menu/hooks/useItems";
import Spin from "antd/lib/spin";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { ActiveAccountCtx } from "../../services/context/active-account-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";
import PageRoutes from "../../routing/page-routes";
import SafeLink from "../link/safe-link";

const NavMenu: FC = () => {
  const { localAccount, loading } = useContext(ActiveAccountCtx);
  const router = useRouter();
  const { en } = useContext(LanguageCtx);

  // Everyone
  const generalItems = [{ label: en ? "Members" : "Membres", href: PageRoutes.allMembers }];

  // Registered Acounts
  const registeredItems = [{ label: en ? "My Profile" : "Mon Profil", href: PageRoutes.myProfile }];

  // Admins
  const adminItems = [
    { label: en ? "Accounts" : "Comptes", href: PageRoutes.allAccounts },
    { label: en ? "Register" : "Enregistrer", href: PageRoutes.register },
  ];

  const items: { label: string; href: string }[] = generalItems;
  if (!loading) {
    if (localAccount) for (const it of registeredItems) items.push(it);
    if (localAccount?.is_admin) for (const it of adminItems) items.push(it);
  }

  const menuItems: MenuItemType[] = items.map((it) => {
    return {
      label: <SafeLink href={it.href}>{it.label}</SafeLink>,
      key: it.label,
    };
  });

  if (loading) menuItems.push({ label: <Spin />, key: "loading" });

  const activeItem = items.find((it) => router.pathname.startsWith(it.href));

  return (
    <div className="nav-menu">
      <Menu
        items={menuItems}
        mode="horizontal"
        overflowedIndicator={<MenuOutlined className="collapsed-icon" />}
        style={{ fontSize: "inherit" }}
        selectedKeys={activeItem ? [activeItem.label] : []}
        activeKey={activeItem?.label}
        getPopupContainer={() => document.querySelector(".navbar") || document.body}
      />
    </div>
  );
};

export default NavMenu;
