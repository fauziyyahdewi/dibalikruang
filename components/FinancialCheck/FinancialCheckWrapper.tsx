"use client";

import React, { useState } from "react";
import PrivacyConsentStep from "./Step/PrivacyConsentStep";
import FinancialCheckForm from "./FinancialCheckForm";
import Image from "next/image";
import Result from "./Result";
import { CalculateResult } from "@/types/financial-check-result";

const FinancialCheckWrapper = () => {
  const [currentStep, setCurrentStep] = useState<"consent" | "form" | "result">(
    "consent"
  );

  const [formResultData, setFormResultData] = useState<CalculateResult | null>(null);

  return (
    <div>
      <div className="bg-white rounded-md shadow-md p-6">
        {/* Header */}
        <div className="flex border-b-[1px] justify-center mb-6">
          <div className="w-25 md:w-30 pb-2">
            <Image
              className="w-full"
              width={100}
              height={100}
              src="/images/Logo-text.png"
              alt="logo"
            />
          </div>
        </div>

        {/* Content */}

        {currentStep === "consent" && (
          <PrivacyConsentStep
            onConsentAccepted={() => setCurrentStep("form")}
          />
        )}

        {currentStep === "form" && (
          <FinancialCheckForm
            onSubmitComplete={(data) => {
              setFormResultData(data);
              setCurrentStep("result");
            }}
          />
        )}

        {currentStep === "result" && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-semibold">
              Hai, Jia Hasil Financial Check Up Anda sudah keluar nih!
            </h2>
            <p>Mari kita review satu persatu.</p>
          </div>
        )}
      </div>

      {currentStep === "result" && formResultData && (
        <Result data={formResultData} />
      )}
    </div>
  );
};

export default FinancialCheckWrapper;
