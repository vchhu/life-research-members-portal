import type { problem, faculty, member_type, keyword } from "@prisma/client";

export default function formatName(n: problem | faculty | member_type | keyword | null): string {
  if (!n) return "";
  if (n.name_en && n.name_fr && n.name_en !== n.name_fr) return n.name_en + " / " + n.name_fr;
  if (n.name_en) return n.name_en;
  if (n.name_fr) return n.name_fr;
  return "";
}
