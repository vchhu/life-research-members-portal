import Empty from "antd/lib/empty";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FC, useContext, useEffect } from "react";
import CardSkeleton from "../loading/card-skeleton";
import useAccount from "../../services/use-account";
import { useRouter } from "next/router";
import { LanguageCtx } from "../../services/context/language-ctx";
import Descriptions from "antd/lib/descriptions";
import CheckCircleTwoTone from "@ant-design/icons/lib/icons/CheckCircleTwoTone";
import CloseCircleTwoTone from "@ant-design/icons/lib/icons/CloseCircleTwoTone";
import Button from "antd/lib/button";
import { red } from "@ant-design/colors";
import SafeLink from "../link/safe-link";
import PageRoutes from "../../routing/page-routes";
import Text from "antd/lib/typography/Text";
import updateAccountGrantAdmin from "../../services/update-account-grant-admin";
import updateAccountRemoveAdmin from "../../services/update-account-remove-admin";
import updateAccountDeleteMember from "../../services/update-account-delete-member";
import deleteAccount from "../../services/delete-account";
import updateAccountRegisterMember from "../../services/update-account-register-member";

const { Item } = Descriptions;

type Props = {
  id: number;
};

const AccountProfile: FC<Props> = ({ id }) => {
  const router = useRouter();
  const { en } = useContext(LanguageCtx);
  const { account, setAccount, loading, refresh } = useAccount(id);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <CardSkeleton />;
  if (!account) return <Empty />;

  async function handleChangeName() {}

  async function handleChangeEmail() {}

  async function handleGrantAdmin() {
    const res = await updateAccountGrantAdmin(id);
    if (res) setAccount(res);
  }

  async function handleRemoveAdmin() {
    const res = await updateAccountRemoveAdmin(id);
    if (res) setAccount(res);
  }

  async function handleDeleteMember() {
    const res = await updateAccountDeleteMember(id);
    if (res) setAccount(res);
  }

  async function handleRegisterMember() {
    const res = await updateAccountRegisterMember(id);
    if (res) setAccount(res);
  }

  async function handleDeleteAccount() {
    const res = await deleteAccount(id);
    if (res) router.replace(PageRoutes.allAccounts);
  }

  const header = (
    <div
      className="header"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: 20,
        rowGap: 10,
      }}
    >
      <Title level={2} style={{ display: "inline-block", margin: 0 }}>
        {account.first_name + " " + account.last_name}
      </Title>
      <Button ghost type="primary" onClick={handleChangeName}>
        {en ? "Change Name" : "Changer de nom"}
      </Button>
    </div>
  );

  const loginItem = (
    <Item label={<>{en ? "Login Email" : "Compte email"}</>}>
      {account.login_email}
      <Button ghost type="primary" onClick={handleChangeEmail}>
        {en ? "Change Email" : "Changer l'e-mail"}
      </Button>
    </Item>
  );

  const lastLoginItem = (
    <Item label={en ? "Last Login" : "Dernière connexion"}>
      {account.last_login ||
        (en ? "This account has never signed in" : "Ce compte ne s'est jamais connecté")}
    </Item>
  );

  const trueSymbol = <CheckCircleTwoTone style={{ fontSize: 18, marginRight: 8 }} />;
  const falseSymbol = (
    <CloseCircleTwoTone style={{ fontSize: 18, marginRight: 8 }} twoToneColor={red[6]} />
  );

  const adminItem = (
    <Item label={en ? "Administrator Privileges" : "Privilèges Administratifs"}>
      {account.is_admin ? (
        <>
          <Text>
            {trueSymbol}
            {en
              ? "This account has administrative privileges"
              : "Ce compte a des privilèges administratifs"}
          </Text>
          <Button danger type="primary" onClick={handleRemoveAdmin}>
            {en ? "Remove admin privileges" : "Supprimer privilèges d'admin"}
          </Button>
        </>
      ) : (
        <>
          <Text>
            {falseSymbol}
            {en
              ? "This account does not have administrative privileges"
              : "Ce compte n'a pas de privilèges administratifs"}
          </Text>
          <Button type="primary" onClick={handleGrantAdmin}>
            {en ? "Grant admin privileges" : "Accorder privilèges d'admin"}
          </Button>
        </>
      )}
    </Item>
  );

  const memberItem = (
    <Item label={en ? "Member" : "Membre"}>
      {account.member ? (
        <>
          <Text>
            {trueSymbol}
            {en
              ? "This account is registered as a member"
              : "Ce compte est enregistré en tant que membre"}
          </Text>
          <Button ghost type="primary">
            <SafeLink href={PageRoutes.privateMemberProfile(account.member?.id || 0)}>
              {en ? "Go to member profile" : "Accéder au profil du membre"}
            </SafeLink>
          </Button>
          <Button danger type="primary" onClick={handleDeleteMember}>
            {en ? "Delete member info" : "Supprimer informations membre"}
          </Button>
        </>
      ) : (
        <>
          <Text>
            {falseSymbol}
            {en
              ? "This account is not registered as a member"
              : "Ce compte n'est pas enregistré en tant que membre"}
          </Text>
          <Button ghost type="primary" onClick={handleRegisterMember}>
            {en ? "Register as member" : "Inscrivez en tant que membre"}
          </Button>
        </>
      )}
    </Item>
  );

  const deleteAccountButton = (
    <div>
      <Button
        danger
        type="primary"
        size="large"
        onClick={handleDeleteAccount}
        style={{ marginLeft: "auto", display: "block" }}
      >
        {en ? "Delete Account" : "Supprimer le Compte"}
      </Button>
    </div>
  );

  return (
    <Card title={header} className="account-profile-card">
      <Descriptions
        layout="vertical"
        bordered
        column={{ xs: 1, sm: 2 }}
        contentStyle={{
          display: "flex",
          columnGap: 16,
          rowGap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {loginItem}
        {lastLoginItem}
        {adminItem}
        {memberItem}
      </Descriptions>
      <div style={{ display: "block", height: 24 }}></div>
      {deleteAccountButton}
    </Card>
  );
};

export default AccountProfile;
