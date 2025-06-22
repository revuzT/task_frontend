import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    remember: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  remember: z.boolean().optional(),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const taskSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export type TaskSchema = z.infer<typeof taskSchema>;
