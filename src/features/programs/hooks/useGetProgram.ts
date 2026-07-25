import { useQuery } from "@tanstack/react-query";
import { getProgramById } from "../services";
import { PROGRAM_QUERY_KEYS } from "../constants";

export default function useGetProgram(id: string | number) {
  return useQuery({
    queryKey: PROGRAM_QUERY_KEYS.DETAIL(id),
    queryFn: () => getProgramById(id),
  });
}
