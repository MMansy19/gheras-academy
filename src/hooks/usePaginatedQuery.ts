import { useEffect, useMemo } from "react";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  UseQueryOptions,
} from "@tanstack/react-query";
import { GlobalFilters, IPagedResponse } from "@/types/api.responses";

interface UsePaginatedQueryOptions<TData, TFilters> {
  queryKey: readonly unknown[];
  filters?: TFilters;
  queryFn: (filters: GlobalFilters) => Promise<IPagedResponse<TData>>;
  queryOptions?: Omit<
    UseQueryOptions<IPagedResponse<TData>>,
    "queryKey" | "queryFn" | "placeholderData"
  >;
}

export default function usePaginatedQuery<TData, TFilters>({
  queryKey,
  filters,
  queryFn,
  queryOptions,
}: UsePaginatedQueryOptions<TData, TFilters>) {
  const queryClient = useQueryClient();

  const mergedFilters = useMemo(() => {
    const combined = { ...filters };
    return Object.fromEntries(
      Object.entries(combined).filter(
        ([, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );
  }, [filters]);

  const baseCacheKey = useMemo(
    () => [...queryKey, { filters: mergedFilters }],
    [queryKey, mergedFilters],
  );

  const page = (mergedFilters.pageNumber as number) || 1;

  const queryInfo = useQuery({
    queryKey: [...baseCacheKey, page],
    queryFn: () => queryFn(mergedFilters as GlobalFilters),
    placeholderData: keepPreviousData,
    ...queryOptions,
  });

  const queryKeyString = JSON.stringify(baseCacheKey);

  useEffect(() => {
    if (!queryInfo.data) return;

    const baseKey = JSON.parse(queryKeyString);

    if (queryInfo.data.hasNext) {
      queryClient.prefetchQuery({
        queryKey: [...baseKey, page + 1],
        queryFn: () => queryFn({ ...mergedFilters, pageNumber: page + 1 } as GlobalFilters),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: [...baseKey, page - 1],
        queryFn: () => queryFn({ ...mergedFilters, pageNumber: page - 1 } as GlobalFilters),
      });
    }
  }, [page, queryInfo.data, queryClient, queryKeyString, queryFn, mergedFilters]);

  return queryInfo;
}
