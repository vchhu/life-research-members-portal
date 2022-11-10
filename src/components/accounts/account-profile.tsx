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
import updateAccountName from "../../services/update-account-name";
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

  const changeNameButton = (
    <Button ghost type="primary" onClick={handleChangeName}>
      {en ? "Change Name" : "Changer de nom"}
    </Button>
  );

  const header = (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Title
        level={2}
        style={{
          margin: 0,
          minWidth: 0,
          marginRight: "auto",
          paddingRight: 16,
          whiteSpace: "break-spaces",
        }}
      >
        {account.first_name + " " + account.last_name}
      </Title>
      {changeNameButton}
    </div>
  );

  const changeEmailButton = (
    <Button ghost type="primary" onClick={handleChangeEmail}>
      {en ? "Change Email" : "Changer l'e-mail"}
    </Button>
  );

  const loginEmail = (
    <>
      {account.login_email}
      {changeEmailButton}
    </>
  );

  const lastLogin =
    account.last_login ||
    (en ? "This account has never signed in" : "Ce compte ne s'est jamais connecté");

  const grantAdminButton = (
    <Button type="primary" onClick={handleGrantAdmin}>
      {en ? "Grant admin privileges" : "Accorder des privilèges d'administrateur"}
    </Button>
  );

  const removeAdminButton = (
    <Button danger type="primary" onClick={handleRemoveAdmin}>
      {en ? "Remove admin privileges" : "Supprimer les privilèges d'administrateur"}
    </Button>
  );

  const adminPrivileges = account.is_admin ? (
    <>
      <Text>{en ? "Administrator" : "Administrateur"}</Text>
      <CheckCircleTwoTone />
      <Text>
        {en
          ? "This account has administrative privileges"
          : "Ce compte a des privilèges administratifs"}
      </Text>
      {removeAdminButton}
    </>
  ) : (
    <>
      <Text>{en ? "Administrator" : "Administrateur"}</Text>
      <CloseCircleTwoTone twoToneColor={red[6]} />
      <Text>
        {en
          ? "This account does not have administrative privileges"
          : "Ce compte n'a pas de privilèges administratifs"}
      </Text>
      {grantAdminButton}
    </>
  );

  const goToProfileButton = (
    <Button ghost type="primary">
      <SafeLink href={PageRoutes.privateMemberProfile(account.member?.id || 0)}>
        {en ? "Go to member profile" : "Accéder au profil du membre"}
      </SafeLink>
    </Button>
  );

  const deleteMemberButton = (
    <Button danger type="primary" onClick={handleDeleteMember}>
      {en ? "Delete member info" : "Supprimer les informations sur le membre"}
    </Button>
  );

  const registerMemberButton = (
    <Button ghost type="primary" onClick={handleRegisterMember}>
      {en ? "Register as member" : "Inscrivez-vous en tant que membre"}
    </Button>
  );

  const memberInfo = account.member ? (
    <>
      <Text>{en ? "Member" : "Membre"}</Text>
      <CheckCircleTwoTone />
      <Text>
        {en
          ? "This account is registered as a member"
          : "Ce compte est enregistré en tant que membre"}
      </Text>
      {goToProfileButton}
      {deleteMemberButton}
    </>
  ) : (
    <>
      <Text>{en ? "Member" : "Membre"}</Text>
      <CloseCircleTwoTone twoToneColor={red[6]} />
      {en
        ? "This account is not registered as a member"
        : "Ce compte n'est pas enregistré en tant que membre"}
      {registerMemberButton}
    </>
  );

  const deleteAccountButton = (
    <Button
      danger
      type="primary"
      style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 24 }}
      size="large"
      onClick={handleDeleteAccount}
    >
      {en ? "Delete Account" : "Supprimer le Compte"}
    </Button>
  );

  return (
    <Card title={header} className="account-profile-card">
      <Descriptions>
        <Item label={en ? "Login Email" : "Compte email"}>{loginEmail}</Item>
        <Item label={en ? "Last Login" : "Dernière connexion"}>{lastLogin}</Item>
      </Descriptions>
      {adminPrivileges}
      {memberInfo}
      {deleteAccountButton}
    </Card>
  );
};

export default AccountProfile;
