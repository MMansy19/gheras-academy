import { useApiMutation, MutationHookOptions } from "@/hooks/useApiMutation";
import { deleteProgram } from "../services";
import { PROGRAM_QUERY_KEYS } from "../constants";

export default function useDeleteProgram(
  options?: MutationHookOptions<typeof deleteProgram>,
) {
  return useApiMutation({
    mutationFn: deleteProgram,
    invalidateKeys: [PROGRAM_QUERY_KEYS.ALL],
    successMessage: "تم حذف البرنامج بنجاح",
    ...options,
  });
}
