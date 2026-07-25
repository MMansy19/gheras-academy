import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { getAllPrograms } from "../services";
import { PROGRAM_QUERY_KEYS } from "../constants";

export default function useGetAllPrograms() {
  return usePaginatedQuery({
    queryKey: PROGRAM_QUERY_KEYS.LISTS(),
    queryFn: getAllPrograms,
  });
}
