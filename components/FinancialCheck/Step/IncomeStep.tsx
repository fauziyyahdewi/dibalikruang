"use client";

import React, { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Trash2, HelpCircle, Plus } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { PiPencilSimpleLine } from "react-icons/pi";
import { FormValues } from "@/types/form-values";

const recommendedIncomes = [
  { name: "Gaji" },
  { name: "Pendapatan Pasif" },
  { name: "Freelance" },
  { name: "Bisnis" },
];

function IncomeStep({ form }: { form: UseFormReturn<FormValues> }) {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "incomesSources",
  });

  const [customName, setCustomName] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleAddRecommendation = (name: string) => {
    const alreadyExists = fields.some((field) => field.name === name);
    if (!alreadyExists) {
      append({ name, amount: 0, type: "pemasukan" });
    }
    setShowCustomInput(false);
    setCustomName("");
  };

  const handleAddCustom = () => {
    if (customName.trim()) {
      append({ name: customName.trim(), amount: 0, type: "pemasukan" });
      setCustomName("");
      setShowCustomInput(false);
    }
  };

  function formatNumber(value: string) {
    if (!value) return "";
    return parseInt(value).toLocaleString("id-ID");
  }

  return (
    <>
      <div className="space-y-4 mb-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{field.name}</h4>
                {field.name === "Gaji" && (
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 border-gray-300 focus-within:border-amber-500">
              <span className="text-gray-700 pl-1 font-medium">Rp.</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatNumber(
                  `${form.watch(`incomesSources.${index}.amount`)}` || ""
                )}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, ""); // hanya angka
                  form.setValue(
                    `incomesSources.${index}.amount`,
                    Number(numericValue)
                  );
                }}
                placeholder="0"
                className="flex-1 py-2 outline-none border-b-1 border-gray-400 focus:ring-0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 rounded-lg p-4 mb-8">
        {fields.length > 0 && (
          <h3 className="text-lg font-medium mb-4">
            Punya penghasilan lainnya?
          </h3>
        )}
        <div className="flex flex-wrap gap-3 mb-4">
          {recommendedIncomes
            .filter((rec) => !fields.some((f) => f.name === rec.name))
            .map((rec) => (
              <Button
                key={rec.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white border-gray-300 text-gray-700 cursor-pointer hover:bg-brand-white"
                onClick={() => handleAddRecommendation(rec.name)}
              >
                <span>{rec.name}</span>
                <div className="w-5 h-5 flex items-center justify-center bg-amber-500 rounded-full text-white">
                  <Plus className="w-3 h-3" />
                </div>
              </Button>
            ))}
          <Button
            type="button"
            onClick={() => setShowCustomInput(true)}
            className="text-sm bg-amber-600 hover:bg-amber-500"
          >
            <div className="w-5 h-5 flex items-center justify-center font-bold text-white">
              <PiPencilSimpleLine className="w-3 h-3" />
            </div>
            Tambah lainnya
          </Button>
        </div>

        {showCustomInput && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-amber-200">
            <label className="block text-sm text-gray-600 mb-2">
              Masukkan jenis penghasilan lainnya:
            </label>
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full md:flex-1"
                placeholder="Contoh: Komisi, Royalti, dll."
              />

              <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:gap-2 w-full md:w-auto">
                <Button
                  type="button"
                  onClick={handleAddCustom}
                  disabled={!customName.trim()}
                  className="w-full md:w-auto"
                >
                  Tambah
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomName("");
                  }}
                  className="w-full md:w-auto"
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default IncomeStep;
