import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useApiMutation, MutationHookOptions } from "@/hooks/useApiMutation";
import { login } from "../services";
import { tokenManager } from "@/lib/api/axios/tokenManager";
import { AUTH_QUERY_KEYS } from "../constants";

export default function useLogin(
  options?: MutationHookOptions<typeof login>,
) {
  const router = useRouter();

  return useApiMutation({
    mutationFn: login,
    invalidateKeys: [AUTH_QUERY_KEYS.ALL],
    ...options,
    onSuccess: (data, ...rest) => {
      tokenManager.setTokens(
        data.payload.accessToken,
        data.payload.refreshToken,
      );

      if (options?.onSuccess) {
        options.onSuccess(data, ...rest);
      } else {
        router.push(ROUTES.STUDENT_HOME);
      }
    },
  });
}
