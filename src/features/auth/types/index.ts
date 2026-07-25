import { IUser } from "@/types";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  dateOfBirth: string;
  gender: "male" | "female";
  nationality: string;
  countryOfResidence: string;
  telegramId: string;
  educationLevel: string;
  previousShariaPrograms: boolean;
  previousShariaProgramsDetail?: string;
  howHeardAbout: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  token: string;
  password: string;
}
