import { toast } from "sonner";

export const notify = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (title: string, errors?: string[]) => {
    const description = errors?.length ? errors.join("\n") : undefined;
    toast.error(title, { description });
  },
  warning: (message: string) => {
    toast.warning(message);
  },
  info: (message: string) => {
    toast.info(message);
  },
  dismiss: (id: string | number) => {
    toast.dismiss(id);
  },
};
