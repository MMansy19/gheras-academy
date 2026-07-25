// Shared base for all responses
export interface BaseResponse {
  succeeded: boolean;
  statusCode: number;
  message: string | null;
  errors: string[];
}

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface IDropdownItem {
  id: number | string;
  code: string;
  name: string;
}

export interface IBaseRecord {
  id: string | number;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface IPagedResponse<T> extends BaseResponse, IPagination {
  payload: T[];
}

export interface IResponse<T> extends BaseResponse {
  payload: T;
}

export interface IErrorResponse extends BaseResponse {
  payload: null;
}

export type DropdownResponse = IPagedResponse<IDropdownItem>;

export interface GlobalFilters {
  pageNumber?: number | null;
  pageSize?: number | null;
  sortBy?: string | null;
  sortDirection?: string | null;
  search?: string | null;
  isActive?: boolean | null;
  programId?: string | number | null;
  courseId?: string | number | null;
  studentId?: string | number | null;
  [key: string]: unknown;
}
