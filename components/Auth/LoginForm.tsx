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
import { GoogleButton } from "./SocialButton";

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

    if (result?.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email atau password salah",
      });
      return;
    } 
    
    if (result?.message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${result.message}`,
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
    <>
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
      </form>

      <div className="space-y-4">
        <GoogleButton />

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
      </div>
    </>
  );
};

export default LoginForm;
