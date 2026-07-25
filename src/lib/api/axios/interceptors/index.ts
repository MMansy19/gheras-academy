import { type AxiosInstance } from "axios";
import { requestInterceptor } from "./request";
import { responseInterceptor } from "./response";

export function setupInterceptors(api: AxiosInstance) {
  api.interceptors.request.use(requestInterceptor);
  api.interceptors.response.use(
    (response) => response,
    responseInterceptor,
  );
}
