import removeDiacritics from "./remove-diacritics";

/** Returns if a includes b after removing accents and converting to lowercase */
export default function fuzzyIncludes(a: string, b: string) {
  return removeDiacritics(a).includes(removeDiacritics(b));
}
