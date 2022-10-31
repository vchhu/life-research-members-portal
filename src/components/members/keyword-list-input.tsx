import type { keyword } from "@prisma/client";
import { FC, useContext, useState } from "react";
import { KeywordsCtx } from "../../services/context/keywords-ctx";
import KeywordTag from "./keyword-tag";

type Props = { value?: keyword[]; onChange?: (value: keyword[]) => void };

const KeywordListInput: FC<Props> = ({ value = [], onChange }) => {
  const { keywords: allKeywords } = useContext(KeywordsCtx);

  const [keywords, setKeywords] = useState<keyword[]>(value);

  return (
    <div>
      {keywords.map((k) => (
        <KeywordTag key={k.id} keyword={k} />
      ))}
    </div>
  );
};

export default KeywordListInput;
