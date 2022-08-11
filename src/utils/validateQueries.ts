export const validateQueries = (query, validQueries) => {
  const entries = Object.entries(query);
  return validQueries.some((q) => {
    return entries.flat().includes(q);
  });
};
