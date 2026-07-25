import { authEndpoints } from "@/lib/api/endpoints";
import { IResponse } from "@/types/api.responses";
import api from "@/lib/api/axios";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
} from "../types";

export const login = async (data: ILoginRequest) =>
  api
    .post<IResponse<ILoginResponse>>(authEndpoints.login, data)
    .then((res) => res.data);

export const register = async (data: IRegisterRequest) =>
  api
    .post<IResponse<ILoginResponse>>(authEndpoints.register, data)
    .then((res) => res.data);

export const forgotPassword = async (data: IForgotPasswordRequest) =>
  api
    .post<IResponse<null>>(authEndpoints.forgotPassword, data)
    .then((res) => res.data);

export const resetPassword = async (data: IResetPasswordRequest) =>
  api
    .post<IResponse<null>>(authEndpoints.resetPassword, data)
    .then((res) => res.data);
