// From https://www.davidbcalhoun.com/2019/matching-accented-strings-in-javascript/
// Removes accents for a more fuzzy search
export default function removeDiacritics(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}
