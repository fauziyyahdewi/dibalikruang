"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import StepNavigation from "./StepNavigation";
import HeaderForm from "./HeaderForm";
import IncomeStep from "../Step/IncomeStep";
import ExpenseStep from "../Step/ExpenseStep";
import SavingStep from "../Step/SavingStep";
import InvestmentStep from "../Step/InvestmentStep";
import AssetStep from "../Step/AssetStep";
import DebtStep from "../Step/DebtStep";
import LastStep from "../Step/LastStep";

import { FormValues } from "@/types/form-values";
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

const predefinedJobs = [
  "Pelajar / Mahasiswa",
  "Karyawan Swasta",
  "Pegawai Negeri / BUMN",
  "Wirausaha",
];

const FinancialCheckForm = ({
  onSubmitComplete,
  previousValues,
  clientFinanceId,
  fincheckId,
}: FinancialCheckFormProps) => {
  const form = useForm<FormValues>({
    mode: "onChange",
    criteriaMode: "all",
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

  // ✅ Fetch client profile on mount
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const res = await fetch("/api/clients/me");

        if (!res.ok) throw new Error("Gagal memuat data klien");

        const client = await res.json();
        console.log("Data klien:", client);
        if (!client) return;

        const resetData: any = {
          ...form.getValues(), // pertahankan input user
          name: client.name || "",
          email: client.email || "",
          phone: client.phone || "",
          birthday: client.birthday || "",
          married: client.married ?? false,
          hasDependents: !!client.dependents,
          dependents: client.dependents || 0,
          dependents_note: client.dependents_note || "",
          domisili: client.domisili || "",
        };

        // ✅ Hanya set job kalau memang ada
        if (client.job) {
          const isPredefined = predefinedJobs.includes(client.job);
          resetData.job = client.job;
          resetData.jobSelect = isPredefined ? client.job : "lainnya";
          resetData.jobText = isPredefined ? "" : client.job;
        }

        form.reset(resetData);
      } catch (err) {
        console.error("Gagal memuat data klien", err);
      }
    };

    fetchClientData();
  }, [form]);

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

      const calculated = calculateIndicators(dataForCalculation);

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

      await fetch("/api/clients/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          birthday: values.birthday,
          is_married: values.is_married,
          hasDependents: values.hasDependents,
          dependents: values.dependents,
          dependents_note: values.dependents_note,
          job: values.job,
          domisili: values.domisili,
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
            isSubmitDisabled={
              step === TOTAL_STEPS - 1 && !form.formState.isValid
            }
          />
        )}
      </form>
    </FormProvider>
  );
};

export default FinancialCheckForm;
