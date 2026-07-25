import { z } from "zod";

export const programCreateSchema = z.object({
  name: z.string().min(1, "اسم البرنامج مطلوب"),
  description: z.string().min(10, "وصف البرنامج مطلوب"),
  isActive: z.boolean().default(true),
});

export const programUpdateSchema = programCreateSchema.partial().extend({
  id: z.string(),
});

export type ProgramCreateSchema = z.infer<typeof programCreateSchema>;
export type ProgramUpdateSchema = z.infer<typeof programUpdateSchema>;
