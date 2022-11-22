// From https://www.davidbcalhoun.com/2019/matching-accented-strings-in-javascript/
/** Allows fuzzy searching by removing accents and converting to lowercase */
export default function removeDiacritics(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}
