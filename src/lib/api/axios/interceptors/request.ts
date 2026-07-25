/**
 * @file request.ts
 * @layer lib/axios/interceptors
 * @description Request interceptor - attaches JWT token to outgoing requests.
 */

import { type InternalAxiosRequestConfig } from "axios";
import { tokenManager } from "@/lib/api/axios/tokenManager";

export function requestInterceptor(config: InternalAxiosRequestConfig) {
  const token = tokenManager.getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
