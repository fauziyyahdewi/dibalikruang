"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import Swal from "sweetalert2";
import { FormDataLogin } from "@/types/form-values";
import { loginCredentials } from "@/lib/actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>();

  // const onSubmit = async (data: FormDataLogin) => {
  //   const result = await loginCredentials(data);

  //   if (result?.error) {
  //     for (const key in result.error) {
  //       setError(key as keyof FormDataLogin, {
  //         type: "manual",
  //         message: key as string,
  //       });
  //     }
  //     return;
  //   }

  //   if (result?.error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Gagal Login",
  //     });
  //     return;
  //   }

  //   // ✅ Setelah berhasil login (tanpa error), sign in ke NextAuth
  //   const signInResult = await signIn("credentials", {
  //     redirect: false,
  //     email: data.email,
  //     password: data.password,
  //   });

  //   if (signInResult?.ok) {
  //     // Optional: redirect ke halaman utama atau dashboard
  //     Swal.fire({
  //       icon: "success",
  //       title: "Login Berhasil",
  //       text: "Selamat datang kembali!",
  //     }).then(() => router.push("/"));
  //   } else {`
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Login gagal, cek kembali email dan password kamu.",
  //     });
  //   }
  // };

  const onSubmit = async (data: FormDataLogin) => {
    const result = await loginCredentials(data);

    if (result?.error || result?.message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email atau password salah",
      });
      return;
    }

    // Setelah berhasil login
    Swal.fire({
      title: "Tunggu Sebentar...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // Tunggu session update
    const interval = setInterval(async () => {
      const session = await getSession(); // dari next-auth/react
      if (session) {
        clearInterval(interval);
        Swal.close();
        if (session.user.role === "financial-advisor") {
          router.push("/financial-advisor");
        } else {
          router.push("/");
        }
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="youremail@gmail.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="rounded-full border-gray-200 focus:ring-amber-300"
        />
        <p className="text-sm text-red-600">{errors.email?.message}</p>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min. 6 characters" },
          })}
          className="rounded-full border-gray-200 focus:ring-amber-300"
        />
        <p className="text-sm text-red-600">{errors.password?.message}</p>

        <div className="flex items-center justify-between pt-1">
          <Label>
            <Checkbox
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(!!checked)}
              className="data-[state=checked]:bg-amber-500"
            />
            <span>Show Password</span>
          </Label>
          <a
            href="/forgot-password"
            className="text-xs text-gray-500 hover:text-amber-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full rounded-full bg-amber-400 py-6 font-extrabold text-black hover:bg-amber-500"
      >
        SIGN IN
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-amber-600 hover:underline"
        >
          Create an account
        </Link>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">or</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2 rounded-full py-5 cursor-pointer hover:bg-zinc-100"
      >
        {/* Google Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </Button>

      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2 rounded-full py-5 cursor-pointer hover:bg-zinc-100"
      >
        {/* Facebook Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#1877F2"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Sign in with Facebook
      </Button>
    </form>
  );
};

export default LoginForm;
