export const validateQueries = (query, validQeries) => {
  const entries = Object.entries(query);
  return validQeries.some((q) => {
    return entries.flat().includes(q);
  });
};
