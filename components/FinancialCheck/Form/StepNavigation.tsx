"use client";

import React from "react";

type StepNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitDisabled?: boolean;
};

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSubmit,
  isSubmitDisabled = false,
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
            disabled={isSubmitDisabled}
            className={`px-4 py-2 rounded text-white font-medium transition ${
              isSubmitDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            Cek Hasil
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
