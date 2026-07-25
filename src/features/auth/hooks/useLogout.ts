import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { tokenManager } from "@/lib/api/axios/tokenManager";

export default function useLogout() {
  const router = useRouter();

  const logout = () => {
    tokenManager.clearTokens();
    router.push(ROUTES.LOGIN);
  };

  return { logout };
}
