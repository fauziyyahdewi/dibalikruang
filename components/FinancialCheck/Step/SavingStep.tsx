"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormValues } from "@/types/form-values";

function SavingStep({ form }: { form: UseFormReturn<FormValues> }) {
  const { control, watch, setValue } = form;

  const { fields } = useFieldArray({
    control,
    name: "savingsSources",
  });

  function formatNumber(value: string) {
    if (!value) return "";
    return parseInt(value).toLocaleString("id-ID");
  }

  return (
    <div className="space-y-4 mb-6">
      {fields.map((field, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm"
        >
          <h4 className="font-medium mb-3">{field.name}</h4>
          <div className="flex items-center gap-2 border-gray-300 focus-within:border-amber-500">
            <span className="text-gray-700 pl-1 font-medium">Rp.</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(
                watch(`savingsSources.${index}.amount`) || ""
              )}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                setValue(`savingsSources.${index}.amount`, numericValue);
              }}
              placeholder="0"
              className="flex-1 py-2 outline-none border-b-1 border-gray-400 focus:ring-0"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavingStep;
