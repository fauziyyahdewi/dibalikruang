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

  const [formResultData, setFormResultData] = useState<CalculateResult | null>(
    null
  );

  const handleRetry = () => {
    if (formResultData?.rawInput) {
      setCurrentStep("form");
    }
  };

  return (
    <div>
      {currentStep !== "result" && <div className="bg-white rounded-md shadow-md p-6">
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
            clientFinanceId={formResultData?.clientFinanceId}
            fincheckId={formResultData?.fincheckId}
            previousValues={formResultData?.rawInput}
            onSubmitComplete={(data) => {
              setFormResultData(data);
              setCurrentStep("result");
            }}
          />
        )}
      </div>}

      {currentStep === "result" && formResultData && (
        <Result data={formResultData} onRetry={handleRetry} />
      )}
    </div>
  );
};

export default FinancialCheckWrapper;
