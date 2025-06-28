"use client";

import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { IndicatorDetail } from "@/types/financial-check-result";

type FinancialCheckResultDetailsProps = {
  results: IndicatorDetail[];
};

const formatValue = (val: number) => {
  return `Rp ${val.toLocaleString("id-ID")}`;
};

const FinancialCheckResultDetails = ({
  results,
}: FinancialCheckResultDetailsProps) => {
  const ideal = results.filter((item) => item.conditionLevel === 1);
  const notIdeal = results.filter((item) => item.conditionLevel !== 1);

  const renderItem = (
    item: IndicatorDetail,
    color: string,
    borderColor: string,
    icon: React.ReactNode
  ) => (
    <div
      key={item.category}
      className={`p-4 border-l-4 ${borderColor} ${color} rounded-xl shadow-sm transition duration-300`}
    >
      {/* Header: kategori + nilai */}
      <div className="flex justify-between items-center mb-2 border-b pb-2">
        <div className="flex items-center gap-3 text-base font-semibold">
          <div className="bg-white/50 rounded-full p-1 border border-gray-200">
            {icon}
          </div>
          <span>{item.category}</span>
        </div>
        <div className="text-sm font-bold text-gray-800">
          {typeof item.amountInput === "number"
            ? formatValue(item.amountInput)
            : "-"}
        </div>
      </div>

      {/* Posisi */}
      <div className="text-sm text-gray-700 mb-1">
        <span className="font-medium">Kondisi Anda:</span>{" "}
        <span className="font-semibold">{item.position}</span>
      </div>

      {/* Deskripsi */}
      {item.description && (
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Kategori Tidak Ideal */}
      <div>
        <h3 className="text-lg font-semibold text-red-600 mb-4">
          Perlu Diperbaiki
        </h3>
        <div className="space-y-4">
          {notIdeal.map((item) =>
            renderItem(
              item,
              "bg-red-50 text-red-700",
              "border-red-500",
              <AlertTriangle className="w-4 h-4" />
            )
          )}
        </div>
      </div>

      {/* Kategori Ideal */}
      <div>
        <h3 className="text-lg font-semibold text-green-600 mb-4">
          Sudah Cukup Baik
        </h3>
        <div className="space-y-4">
          {ideal.map((item) =>
            renderItem(
              item,
              "bg-green-50 text-green-700",
              "border-green-500",
              <CheckCircle className="w-4 h-4" />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialCheckResultDetails;
