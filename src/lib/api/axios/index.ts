/**
 * @file index.ts
 * @layer lib/axios
 * @description Public entry point for the Axios client.
 * Consumers import only from here — never from sub-modules directly.
 * CLIENT-SIDE use only.
 */

import axios from "axios";
import { getClientApiBaseUrl } from "@/lib/api/axios/tenantUtils";
import { setupInterceptors } from "@/lib/api/axios/interceptors";

const api = axios.create({
  baseURL: getClientApiBaseUrl(),
  timeout: 100_000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(api);

export default api;
