/**
 * @file response.ts
 * @layer lib/axios/interceptors
 * @description Response interceptor - handles 401, token refresh, and error normalization.
 */

import { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getClientApiBaseUrl } from "@/lib/api/axios/tenantUtils";
import { tokenManager } from "@/lib/api/axios/tokenManager";
import { refreshQueue } from "@/lib/api/axios/refreshQueue";
import api from "@/lib/api/axios";

interface RetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export async function responseInterceptor(error: AxiosError) {
  const originalRequest = error.config as RetriableConfig | undefined;

  // Handle 401 - attempt token refresh
  if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
    if (refreshQueue.isRefreshing()) {
      return refreshQueue.enqueue();
    }

    originalRequest._retry = true;
    refreshQueue.setRefreshing(true);

    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      tokenManager.clearTokens();
      window.location.href = "/auth/login";
      refreshQueue.setRefreshing(false);
      return Promise.reject(error);
    }

    try {
      const response = await fetch(`${getClientApiBaseUrl()}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Refresh token failed");
      }

      const data = await response.json();
      tokenManager.setTokens(data.payload.accessToken, data.payload.refreshToken);
      refreshQueue.processQueue(null);

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${data.payload.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      refreshQueue.processQueue(refreshError);
      tokenManager.clearTokens();
      window.location.href = "/auth/login";
      return Promise.reject(refreshError);
    } finally {
      refreshQueue.setRefreshing(false);
    }
  }

  return Promise.reject(error);
}
