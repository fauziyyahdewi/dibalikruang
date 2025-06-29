"use client";

import React from "react";

type StepNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitDisabled?: boolean;
  is_loading?: boolean;
};

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSubmit,
  isSubmitDisabled = false,
  is_loading = false,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mt-6 space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-amber-600 h-2 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirstStep}
          className={`px-4 py-2 rounded-md font-medium transition ${
            isFirstStep
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sebelumnya
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitDisabled || is_loading}
            className={`px-4 py-2 rounded text-white font-medium transition inline-flex items-center justify-center gap-2 ${
              isSubmitDisabled || is_loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {is_loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                {/* <span>Memproses...</span> */}
              </>
            ) : (
              "Cek Hasil"
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-2 rounded-md font-medium transition bg-amber-600 text-white hover:bg-amber-700"
          >
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;
