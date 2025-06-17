"use client";

import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { IndicatorDetail } from "@/types/financial-check-result";

type FinancialCheckResultDetailsProps = {
  results: IndicatorDetail[];
};

const formatValue = (val: number) => {
  const isPercent = val >= 0 && val <= 100;
  return isPercent
    ? `${Math.round(val)}%`
    : `Rp ${val.toLocaleString("id-ID")}`;
};

const FinancialCheckResultDetails = ({
  results,
}: FinancialCheckResultDetailsProps) => {
  const percentHiddenCategories = [
    "Aset terhadap Hutang",
    "Cashflow",
    "Kekayaan Bersih",
  ];

  const ideal = results.filter(
    (item) => item.category_level === "Ideal"
  );
  const notIdeal = results.filter(
    (item) => item.category_level !== "Ideal"
  );

  const renderItem = (
    item: IndicatorDetail,
    color: string,
    borderColor: string,
    icon: React.ReactNode
  ) => (
    <div
      key={item.category}
      className={`p-4 border-l-4 ${borderColor} ${color} rounded-md shadow-sm`}
    >
      <div className="flex items-center gap-2 font-medium mb-1">
        {icon}
        {item.category} -{" "}
        <span className="text-xs italic">{item.category_level}</span>
      </div>
      <div className="text-sm text-gray-700">
        <div>
          Nilai:{" "}
          <span className="font-semibold">{formatValue(item.value)}</span>
        </div>

        {!percentHiddenCategories.includes(item.category) && (
          <div>
            Persentase:{" "}
            <span className="font-semibold">
              {Math.round(item.percent)}%
            </span>
          </div>
        )}

        {item.description && (
          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
        )}
      </div>
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
