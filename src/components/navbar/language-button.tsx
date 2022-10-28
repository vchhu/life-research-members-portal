import Button from "antd/lib/button";
import { FC, useContext } from "react";
import { LanguageCtx } from "../../api-facade/context/language-ctx";

const LanguageButton: FC = () => {
  const { en, toggleLanguage } = useContext(LanguageCtx);

  return <Button onClick={toggleLanguage}>{en ? "EN" : "FR"}</Button>;
};

export default LanguageButton;
