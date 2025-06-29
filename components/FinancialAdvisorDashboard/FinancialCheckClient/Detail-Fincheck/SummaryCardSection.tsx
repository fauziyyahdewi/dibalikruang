"use client";

import { Calendar, UserCheck, Info, BadgeCheck } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React from "react";

type SummaryCardProps = {
  data: {
    percent: number;
    description: string;
    created_at: string;
    fincheck_result_type?: { name: string | null };
    financial_advisors?: { name: string | null };
  };
};

export function SummaryCardSection({ data }: SummaryCardProps) {
  return (
    <section>
      <h3 className="font-semibold text-base mb-4 border-b pb-1 text-amber-600">
        Ringkasan Financial Check-Up
      </h3>

      <div className="bg-gradient-to-br from-white to-gray-50 border rounded-xl p-6 shadow-md space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={data.percent}
              text={`${data.percent}%`}
              styles={buildStyles({
                textSize: "20px",
                pathColor: "#16a34a", // green-600
                textColor: "#1f2937", // gray-800
                trailColor: "#e5e7eb", // gray-200
              })}
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Kondisi Keuangan</p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <BadgeCheck className="w-4 h-4" />
              {data.fincheck_result_type?.name || "Tidak Diketahui"}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Item
            icon={<Info className="text-blue-500 w-4 h-4" />}
            label="Deskripsi"
            value={data.description}
            full
          />
          <Item
            icon={<Calendar className="text-orange-500 w-4 h-4" />}
            label="Tanggal Check-Up"
            value={new Date(data.created_at).toLocaleDateString("id-ID")}
          />
          <Item
            icon={<UserCheck className="text-purple-500 w-4 h-4" />}
            label="Ditangani Oleh"
            value={data.financial_advisors?.name || "Belum ditangani"}
          />
        </div>
      </div>
    </section>
  );
}

function Item({
  icon,
  label,
  value,
  full = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  full?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 bg-white rounded-md border p-3 shadow-sm ${
        full ? "sm:col-span-2" : ""
      }`}
    >
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
