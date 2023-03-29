import removeDiacritics from "../../utils/front-end/remove-diacritics";

const isAuthorMatch = (author: string, firstName: string, lastName: string) => {
  const normalizedAuthor = removeDiacritics(
    author.replace(/[^a-zA-Z\s\-]+/g, "").trim()
  );
  const authorParts = normalizedAuthor.split(" ").map((part) => part.trim());

  firstName = removeDiacritics(firstName);
  lastName = removeDiacritics(lastName);

  if (authorParts.length === 2) {
    const [aFirstName, aLastName] = authorParts;

    const formattedNames = [
      `${firstName} ${lastName}`,
      `${lastName} ${firstName}`,
      `${firstName.charAt(0)}. ${lastName}`,
      `${firstName.charAt(0)} ${lastName}`,
      `${lastName}, ${firstName.charAt(0)}.`,
      `${lastName}, ${firstName}`,
      `Dr. ${firstName} ${lastName}`,
    ];

    return (
      formattedNames.includes(normalizedAuthor) ||
      formattedNames.includes(`${aLastName} ${aFirstName}`)
    );
  } else if (authorParts.length === 1) {
    const [aLastName] = authorParts;
    const formattedNames = [
      `${lastName}`,
      `${lastName}, ${firstName.charAt(0)}.`,
      `${lastName}, ${firstName}`,
    ];

    return formattedNames.includes(normalizedAuthor);
  }

  return false;
};

export default isAuthorMatch;
