export const AUTH_QUERY_KEYS = {
  ALL: ["auth"] as const,
  USER: () => [...AUTH_QUERY_KEYS.ALL, "user"] as const,
  PROFILE: () => [...AUTH_QUERY_KEYS.ALL, "profile"] as const,
} as const;

export const ROLE_LABELS = {
  student: "طالب",
  supervisor: "مشرف",
  admin: "إدارة",
} as const;
