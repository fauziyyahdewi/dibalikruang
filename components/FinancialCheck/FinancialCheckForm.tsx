"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import StepNavigation from "./StepNavigation";
import HeaderForm from "./HeaderForm";
import IncomeStep from "./Step/IncomeStep";
import ExpenseStep from "./Step/ExpenseStep";
import SavingStep from "./Step/SavingStep";
import InvestmentStep from "./Step/InvestmentStep";
import AssetStep from "./Step/AssetStep";
import DebtStep from "./Step/DebtStep";
import { FormValues } from "@/types/form-values";
import LastStep from "./Step/LastStep";
import Swal from "sweetalert2";
import { transformFormValues } from "@/utils/financial/tranformValuesForm";
import { calculateIndicators } from "@/utils/financial/calculate";
import { CalculateResult } from "@/types/financial-check-result";

type FinancialCheckFormProps = {
  onSubmitComplete: (data: CalculateResult) => void;
  previousValues?: FormValues;
  clientFinanceId?: number;
  fincheckId?: number;
};

const TOTAL_STEPS = 7;

const FinancialCheckForm = ({
  onSubmitComplete,
  previousValues,
  clientFinanceId,
  fincheckId,
}: FinancialCheckFormProps) => {
  const form = useForm<FormValues>({
    defaultValues: previousValues || {
      incomesSources: [
        { name: "Gaji", amount: 0 },
        { name: "Pendapatan Pasif", amount: 0 },
      ],
      expensesSources: [{ name: "Biaya Hidup", amount: 0 }],
      savingsSources: [
        {
          name: "Menabung dan berinvestasi dalam satu bulan",
          amount: 0,
          type: "menabung",
        },
        { name: "Total Tabungan", amount: 0, type: "tabungan" },
      ],
      investmentSources: [
        { name: "Saham", amount: 0 },
        { name: "Reksadana", amount: 0 },
      ],
      assetsSources: [],
      debtsSources: [{ name: "Hutang", amount: 0 }],
    },
  });

  const [step, setStep] = useState(0);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <IncomeStep form={form} />;
      case 1:
        return <ExpenseStep form={form} />;
      case 2:
        return <SavingStep form={form} />;
      case 3:
        return <InvestmentStep form={form} />;
      case 4:
        return <AssetStep form={form} />;
      case 5:
        return <DebtStep form={form} />;
      case 6:
        return <LastStep />;
      default:
        return <div>Langkah tidak ditemukan</div>;
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const { summary, details, dataForCalculation } =
        transformFormValues(values);

      console.log("=== Raw Form Values ===", values);
      console.log("=== Summary ===", summary);
      console.log("=== Details ===", details);
      console.log("=== Data for Calculation ===", dataForCalculation);

      const calculated = calculateIndicators(dataForCalculation);

      console.log("=== Calculated Indicators ===", calculated);
      console.log("=== Calculated Indicators (Detail) ===", calculated.details);

      const res = await fetch("/api/fincheck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientFinanceId,
          fincheckId,
          financeSummary: summary,
          financeDetails: details,
          calculated,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Hasil Financial Check Up Anda Telah Keluar",
      });

      onSubmitComplete({
        clientFinanceId: result.client_finance_id,
        fincheckId: result.fincheck_id,
        ...calculated,
        rawInput: values,
      });
    } catch (err: any) {
      console.log(err.message, err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form data-aos="fade-left">
        {/* Header */}
        {step >= 0 && step <= 5 && <HeaderForm step={step} />}

        {/* Step Content */}
        <div className="mb-6">{renderStepContent(step)}</div>

        {/* Step Navigation */}
        {step >= 0 && step <= 6 && (
          <StepNavigation
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={form.handleSubmit(handleSubmit)}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default FinancialCheckForm;
