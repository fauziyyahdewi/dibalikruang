"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
import ResultDetail from "./ResultDetail";
import { CalculateResult } from "@/types/financial-check-result";
import FooterResult from "./FooterResult";

type ResultProps = {
  data: CalculateResult;
};

const Result = ({ data }: ResultProps) => {
  const { percent: score, details: indicators } = data;

  const getStatus = (score: number) => {
    if (score === 100)
      return {
        text: "Kondisi keuanganmu saat ini sehat.",
        color: "bg-yellow-600",
      };
    if (score >= 90)
      return {
        text: "Kondisi keuanganmu cukup sehat. Namun masih ada bagian yang perlu dioptimalkan. ",
        color: "bg-yellow-500",
      };
    if (score >= 41)
      return {
        text: "Kondisi keuanganmu belum optimal. Masih ada yang perlu diperbaiki.",
        color: "bg-yellow-600",
      };
    return {
      text: "Kondisi keuanganmu tidak sehat.",
      color: "bg-yellow-600",
    };
  };

  const { text, color } = getStatus(score);

  return (
    <div className="mt-6 bg-white rounded-md shadow-md p-6 flex flex-col items-strecth">
      {/* Donut Chart Container */}
      <div className="flex justify-center">
        <div className="relative w-[200px] h-[200px] mb-3 ">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: score, color: "#d97706" },
                  { id: 1, value: 100 - score, color: "#e5e7eb" },
                ],
                innerRadius: 50,
                outerRadius: 90,
                cornerRadius: 4,
                highlightScope: {
                  fade: "none",
                  highlight: "none",
                },
              },
            ]}
            slotProps={{
              tooltip: { trigger: "none" },
            }}
            width={200}
            height={200}
          />

          {/* Centered Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-gray-800">{score}%</span>
          </div>
        </div>
      </div>

      {/* Result Message Box */}
      <div
        className={`relative mt-2 px-6 py-3 text-center text-white rounded-md ${color} w-full max-w-xl mx-auto`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-inherit" />
        <p className="text-sm font-semibold">{text}</p>
      </div>

      {/* Result Detail */}
      <ResultDetail results={indicators} />

      {/* Footer */}
      <FooterResult />
    </div>
  );
};

export default Result;
