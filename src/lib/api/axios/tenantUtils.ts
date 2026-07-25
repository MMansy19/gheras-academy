/**
 * @file tenantUtils.ts
 * @layer lib/axios
 * @description URL resolution utilities for client and server.
 * Since Ghiras Academy is single-tenant (not multi-tenant like NQ ERP),
 * these resolve to the base API URL.
 */

export function getClientApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
}

export function getServerApiBaseUrl(): string {
  return process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
}
