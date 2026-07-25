import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useApiMutation, MutationHookOptions } from "@/hooks/useApiMutation";
import { postProgram } from "../services";
import { PROGRAM_QUERY_KEYS } from "../constants";

export default function useCreateProgram(
  options?: MutationHookOptions<typeof postProgram>,
) {
  const router = useRouter();

  return useApiMutation({
    mutationFn: postProgram,
    invalidateKeys: [PROGRAM_QUERY_KEYS.ALL],
    ...options,
    onSuccess: (...args) => {
      if (options?.onSuccess) {
        options.onSuccess(...args);
      } else {
        router.push(ROUTES.SUPERVISOR_PROGRAMS);
      }
    },
  });
}
