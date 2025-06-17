"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma"; // Prisma client misalnya
import { hashSync } from "bcrypt-ts";
import { SigninSchema, SignUpSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type FormDataRegist = z.infer<typeof SignUpSchema>;
type FormDataLogin = z.infer<typeof SigninSchema>;

export async function signUpCredentials(data: FormDataRegist) {
  const validation = SignUpSchema.safeParse(data);
  if (!validation.success) {
    const formattedErrors: Record<string, string> = {};
    validation.error.errors.forEach((err) => {
      if (err.path[0]) {
        formattedErrors[err.path[0]] = err.message;
      }
    });
    return { error: formattedErrors };
  }

  const { name, email, password } = data;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return {
        error: {
          email: "Email is already registered",
        },
      };
    }

    // Simpan user baru
    const hashedPassword = hashSync(password, 10);
    await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Sign-up error:", err);
    return {
      error: {
        general: "Something went wrong. Please try again later.",
      },
    };
  }
}

export const loginCredentials = async (formData: FormDataLogin) => {
  const validatedFields = SigninSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      role: "user",
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Email atau password salah" };
        default:
          return { message: "Terjadi kesalahan pada proses login" };
      }
    }
    throw error;
  }
  return { data: validatedFields.data };
};
