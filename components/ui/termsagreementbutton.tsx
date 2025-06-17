"use client";

import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "./checkbox";
import { Button } from "./button";

type TermsAgreementButtonProps = {
  label: string;
  className?: string;
};

export default function TermsAgreementButton({
  label,
  className = "",
}: TermsAgreementButtonProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(!!checked)}
          className="data-[state=checked]:bg-amber-500"
        />
        <div className="text-center text-sm">
          I agree to the{" "}
          <Link href="/" className="font-medium text-amber-600 hover:underline">
          Terms of Service{" "}
          </Link>
           and{" "}
          <Link href="/" className="font-medium text-amber-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        className={`w-full rounded-full py-6 font-bold text-black ${
          agreed
            ? "bg-amber-400 hover:bg-amber-500"
            : "bg-gray-300 cursor-not-allowed"
        } ${className}`}
        disabled={!agreed}
      >
        {label}
      </Button>
    </div>
  );
}
