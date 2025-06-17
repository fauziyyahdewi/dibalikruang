"use client";

import { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Checkbox } from "./checkbox";

type PasswordFieldProps = {
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


export default function PasswordField({
  name = "password",
  id = "password",
  placeholder = "Enter password",
  value,
  onChange,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Password</Label>
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="rounded-full border-gray-200 focus:ring-amber-300"
        value={value}
        onChange={onChange}
        required
      />

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
  );
}
