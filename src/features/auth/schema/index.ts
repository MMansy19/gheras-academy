import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "الاسم الأول مطلوب"),
    lastName: z.string().min(1, "الاسم الأخير مطلوب"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z.string().min(10, "رقم الهاتف غير صحيح"),
    countryCode: z.string().min(2, "كود الدولة مطلوب"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string(),
    dateOfBirth: z.string().min(1, "تاريخ الميلاد مطلوب"),
    gender: z.enum(["male", "female"]).describe("الجنس مطلوب"),
    nationality: z.string().min(1, "الجنسية مطلوبة"),
    countryOfResidence: z.string().min(1, "بلد الإقامة مطلوب"),
    telegramId: z.string().min(1, "معرف تيليجرام مطلوب"),
    educationLevel: z.string().min(1, "المستوى التعليمي مطلوب"),
    previousShariaPrograms: z.boolean(),
    previousShariaProgramsDetail: z.string().optional(),
    howHeardAbout: z.string().min(1, "كيف سمعت عن غراس مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
