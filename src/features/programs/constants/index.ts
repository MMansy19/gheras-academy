export const PROGRAM_QUERY_KEYS = {
  ALL: ["programs"] as const,
  LISTS: () => [...PROGRAM_QUERY_KEYS.ALL, "list"] as const,
  LIST: (filters?: Record<string, unknown>) =>
    [...PROGRAM_QUERY_KEYS.LISTS(), { filters }] as const,
  DETAILS: () => [...PROGRAM_QUERY_KEYS.ALL, "details"] as const,
  DETAIL: (id: string | number) =>
    [...PROGRAM_QUERY_KEYS.DETAILS(), id] as const,
} as const;

export const PROGRAM_FORM_DEFAULT_VALUES = {
  name: "",
  description: "",
  isActive: true,
};
