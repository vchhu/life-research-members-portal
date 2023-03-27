const isAuthorMatch = (author: string, firstName: string, lastName: string) => {
  const normalizedAuthor = author.replace(/[^a-zA-Z\s]+/g, "").trim();
  const authorParts = normalizedAuthor.split(" ").map((part) => part.trim());

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
