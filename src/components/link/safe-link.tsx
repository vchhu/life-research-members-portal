import Link from "next/link";
import { useRouter } from "next/router";
import { FC, MouseEvent, PropsWithChildren, useContext } from "react";
import { SaveChangesCtx } from "../../services/context/save-changes-ctx";

type Props = { href: string };

const SafeLink: FC<PropsWithChildren<Props>> = ({ href, children }) => {
  const { saveChangesPrompt } = useContext(SaveChangesCtx);
  const router = useRouter();

  function handleNav(e: MouseEvent) {
    e.preventDefault();
    saveChangesPrompt({
      onSuccessOrDiscard: () => {
        router.push(href);
      },
    });
  }

  return (
    <Link href={href}>
      <a onClick={handleNav}>{children}</a>
    </Link>
  );
};

export default SafeLink;
