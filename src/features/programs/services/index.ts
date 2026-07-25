import { programsEndpoints } from "@/lib/api/endpoints";
import { GlobalFilters, IPagedResponse, IResponse } from "@/types/api.responses";
import api from "@/lib/api/axios";
import { IProgramTableRecord, IProgramDetailRecord } from "../types";
import { ProgramCreateSchema, ProgramUpdateSchema } from "../schema";

export const getAllPrograms = async (filters: GlobalFilters) =>
  api
    .get<IPagedResponse<IProgramTableRecord>>(programsEndpoints.getAll, {
      params: filters,
    })
    .then((res) => res.data);

export const getProgramById = async (id: string | number) =>
  api
    .get<IResponse<IProgramDetailRecord>>(programsEndpoints.getById(id))
    .then((res) => res.data);

export const postProgram = async (data: ProgramCreateSchema) =>
  api
    .post<IResponse<IProgramDetailRecord>>(programsEndpoints.post, data)
    .then((res) => res.data);

export const putProgram = async (data: ProgramUpdateSchema & { id: string }) =>
  api
    .put<IResponse<IProgramDetailRecord>>(programsEndpoints.put(data.id), data)
    .then((res) => res.data);

export const deleteProgram = async (id: string | number) =>
  api.delete(programsEndpoints.delete(id)).then((data) => data.data);
