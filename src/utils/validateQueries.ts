export const validateQueries = (query: Query, validQueries: string[]) => {
  const entries = Object.entries(query);
  return validQueries.some((q: string) => {
    return entries.flat().includes(q);
  });
};

export interface Query {
  category?: string;
  age_group?: string;
  gender?: string;
  order?: string;
}
