"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ResultDetail = {
  value: number;
  percent?: number;
  description: string;
  position_detail?: string;
  fincheck_result_type?: { name?: string };
  fincheck_result_category?: { name?: string };
};

type CategoryAnalysisSectionProps = {
  data: {
    fincheck_result_detail?: ResultDetail[];
  };
};

const IDEAL_LIMITS: Record<string, string> = {
  "Tabungan": "≥ 20%",
  "Dana Darurat": "6-12x",
  "Aset Liquid": "≤ 15%",
  "Hutang Terhadap Aset": "< 50%",
  "Cicilan Hutang": "< 35%",
  "Investasi": "> 50%",
  "Aset Terhadap Hutang": "≥ 200%",
  "Arus Kas": "Pendapatan > Pengeluaran",
  "Kekayaan Bersih": "≥ 36x",
};

function getIdealText(category: string) {
  return IDEAL_LIMITS[category] || "-";
}

export function CategoryAnalysisSection({
  data,
}: CategoryAnalysisSectionProps) {
  const details = data.fincheck_result_detail || [];

  const orderedDetails = [
    ...details.filter((item) => item.fincheck_result_type?.name !== "Ideal"),
    ...details.filter((item) => item.fincheck_result_type?.name === "Ideal"),
  ];

  function getDisplayValue(category: string, value: number): string {
    const intVal = Math.round(value); // dibulatkan ke integer

    if (category === "Dana Darurat") return `${intVal} bulan`;
    if (category === "Kekayaan Bersih") return `${intVal} bulan`;
    if (category === "Arus Kas") return intVal >= 0 ? "Surplus" : "Defisit";
    return `${intVal}%`;
  }

  return (
    <section>
      <h3 className="font-semibold text-base mb-4 border-b pb-1 text-amber-600">
        Hasil Analisis per Kategori
      </h3>

      {orderedDetails.length ? (
        <div className="space-y-8">
          {orderedDetails.map((item, index) => {
            const category =
              item.fincheck_result_category?.name || "Tidak Diketahui";
            const status =
              item.fincheck_result_type?.name === "Ideal"
                ? "ideal"
                : "perlu diperbaiki";
            const color = status === "ideal" ? "green" : "red";
            const badgeText =
              status === "ideal"
                ? "Ideal"
                : item.fincheck_result_type?.name || "Perlu Diperbaiki";

            return (
              <div
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-xl border shadow transition hover:shadow-md",
                  `bg-${color}-50 border-${color}-200`
                )}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={cn("text-base font-semibold text-gray-800")}>
                      {category}
                    </h4>
                    <Badge
                      className={`bg-${color}-100 text-${color}-700 text-xs`}
                    >
                      {badgeText}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-gray-600">Nilai:</span>{" "}
                      <span className="font-semibold text-gray-900">
                        {getDisplayValue(category, item.value)}
                      </span>
                    </p>

                    <p>
                      <span className="font-medium text-gray-600">Ideal:</span>{" "}
                      <span className="text-gray-800">
                        {getIdealText(category)}
                      </span>
                    </p>
                    {item.position_detail && (
                      <p>
                        <span className="font-medium text-gray-600">
                          Catatan:
                        </span>{" "}
                        {item.position_detail}
                      </p>
                    )}
                    <p>
                      <span className="font-medium text-gray-600">
                        Rekomendasi:
                      </span>{" "}
                      {item.description}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "absolute top-0 left-0 h-full w-1",
                    `bg-${color}-400`
                  )}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Belum ada data hasil analisis kategori.
        </p>
      )}
    </section>
  );
}
