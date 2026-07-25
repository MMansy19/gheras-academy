import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { notify } from "@/notifications/notify";
import { BaseResponse } from "@/types/api.responses";

export interface ApiMutationOptions<
  TData extends BaseResponse,
  TError,
  TVariables,
  TContext,
> extends UseMutationOptions<TData, TError, TVariables, TContext> {
  invalidateKeys?: readonly (readonly unknown[])[];
  successMessage?: string | ((data: TData) => string);
  disableSuccessToast?: boolean;
  disableErrorToast?: boolean;
}

export type MutationHookOptions<
  T extends (...args: never[]) => Promise<unknown>,
> = Omit<
  ApiMutationOptions<
    Awaited<ReturnType<T>>,
    unknown,
    Parameters<T>[0],
    unknown
  >,
  "mutationFn"
>;

export function useApiMutation<
  TData extends BaseResponse,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(options: ApiMutationOptions<TData, TError, TVariables, TContext>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    onSuccess: (...args) => {
      const [data] = args;

      if (!options.disableSuccessToast) {
        const message =
          typeof options.successMessage === "function"
            ? options.successMessage(data)
            : options.successMessage || data?.message || "تم بنجاح";

        notify.success(message || "تم بنجاح");
      }

      if (options.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      if (options.onSuccess) {
        options.onSuccess(...args);
      }
    },
    onError: (...args) => {
      const [error] = args;

      if (!options.disableErrorToast) {
        const axiosError = error as { response?: { data?: { message?: string; errors?: string[] } } };
        const message = axiosError?.response?.data?.message || "حدث خطأ";
        const errors = axiosError?.response?.data?.errors || [];
        notify.error(message, errors);
      }

      if (options.onError) {
        options.onError(...args);
      }
    },
  });
}
