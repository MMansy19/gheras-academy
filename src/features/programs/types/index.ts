import { IProgram } from "@/types";

export type { IProgram };

export interface IProgramTableRecord extends IProgram {
  courseCount?: number;
}

export interface IProgramDetailRecord extends IProgram {
  courses?: Array<{ id: string; name: string }>;
}
