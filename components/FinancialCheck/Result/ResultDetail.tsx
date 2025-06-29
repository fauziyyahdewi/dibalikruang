"use client";

import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { IndicatorDetail } from "@/types/financial-check-result";
import { IDEAL_LIMITS } from "@/lib/constants/idealValue";

type FinancialCheckResultDetailsProps = {
  results: IndicatorDetail[];
};

// Format ke rupiah
const formatCurrency = (val: number) => `Rp ${val.toLocaleString("id-ID")}`;

// Cek apakah kategori menggunakan format persen tanpa tanda '%'
const isPercentOnly = (category: string) =>
  ["Dana Darurat", "Kekayaan Bersih"].includes(category);

const FinancialCheckResultDetails = ({
  results,
}: FinancialCheckResultDetailsProps) => {
  const idealItems = results.filter((item) => item.conditionLevel === 1);
  const notIdealItems = results.filter((item) => item.conditionLevel !== 1);

  const IndicatorCard = ({
    item,
    icon,
    bgColor,
    textColor,
    borderColor,
  }: {
    item: IndicatorDetail;
    icon: React.ReactElement;
    bgColor: string;
    textColor: string;
    borderColor: string;
  }) => {
    const isCashflow = item.category === "Cashflow";

    const percentText = isCashflow
      ? {
          [-1]: "Defisit (pengeluaran lebih besar)",
          0: "Seimbang",
          1: "Surplus (penghasilan lebih besar)",
        }[item.percent as number] ?? "-"
      : typeof item.percent === "number"
      ? isPercentOnly(item.category)
        ? `${Math.round(item.percent)}`
        : `${Math.round(item.percent)}%`
      : "-";

    return (
      <div
        key={item.category}
        className={`p-4 border-l-4 ${borderColor} ${bgColor} ${textColor} rounded-xl shadow-sm`}
      >
        {/* Header kategori */}
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <div className="flex items-start gap-3">
            <div className="bg-white/70 rounded-full p-3 border border-gray-200">
              {React.cloneElement(icon, {
                className: "w-5 h-5",
              })}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base">{item.category}</span>
              <span className="text-xs text-gray-600 font-medium">
                Idealnya {IDEAL_LIMITS[item.category] ?? "-"} 
              </span>
            </div>
          </div>
          <div className="text-base font-semibold text-gray-800 text-right">
            {typeof item.amountInput === "number"
              ? formatCurrency(item.amountInput)
              : "-"}
          </div>
        </div>

        {/* Batas ideal */}

        {/* Analisa Singkat sebagai Bubble Chat */}
        <div className="relative mb-2 w-full bg-white rounded-md p-3 text-[10px] text-gray-700 leading-snug text-center">
          <div className="text-xs text-gray-800 font-medium mb-2 border-b-1">
            Nilai Anda: {percentText}
          </div>
          {/* Ekor bubble */}
          {item.positionDescription}
        </div>

        {/* Edukasi cashflow */}
        {item.category === "Cashflow" && (
          <div className="text-xs text-blue-500 italic mb-2">
            💡{" "}
            {item.percent === 1
              ? "Cashflow surplus berarti penghasilan kamu lebih besar dari pengeluaran. Ini sangat bagus!"
              : item.percent === 0
              ? "Cashflow kamu seimbang. Artinya, seluruh penghasilan habis untuk pengeluaran. Perlu mulai menabung!"
              : "Cashflow defisit! Pengeluaran kamu melebihi penghasilan. Waspadai kondisi ini."}
          </div>
        )}

        {/* Saran perbaikan */}
        {item.suggestion && (
          <div className="text-xs text-gray-800 mt-4 leading-relaxed">
            <span className="font-semibold">Apa selanjutnya?</span>
            <br />
            {item.suggestion}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Kategori perlu perhatian */}
      <div>
        <h3 className="text-lg font-semibold text-red-600 mb-4">
          Perlu Diperbaiki
        </h3>
        <div className="space-y-4">
          {notIdealItems.map((item) => (
            <IndicatorCard
              key={item.category}
              item={item}
              icon={<AlertTriangle className="w-4 h-4" />}
              bgColor="bg-[#fff3f3]"
              textColor="text-red-700"
              borderColor="border-red-500"
            />
          ))}
        </div>
      </div>

      {/* Kategori ideal */}
      <div>
        <h3 className="text-lg font-semibold text-green-600 mb-4">
          Pertahankan
        </h3>
        <div className="space-y-4">
          {idealItems.map((item) => (
            <IndicatorCard
              key={item.category}
              item={item}
              icon={<CheckCircle className="w-4 h-4" />}
              bgColor="bg-[#f0fdf4]"
              textColor="text-green-700"
              borderColor="border-green-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialCheckResultDetails;
