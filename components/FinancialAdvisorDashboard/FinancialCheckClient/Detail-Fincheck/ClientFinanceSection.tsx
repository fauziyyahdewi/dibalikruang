"use client";

import React from "react";

type FinanceItem = {
  name?: string;
  amount: number;
  finance_category?: { name?: string };
  finance_type?: { name?: string };
};

type ClientFinanceSectionProps = {
  data: {
    client_finance?: {
      client_finance_detail?: FinanceItem[];
    };
  };
};

export function ClientFinanceSection({ data }: ClientFinanceSectionProps) {
  const details = data.client_finance?.client_finance_detail ?? [];

  const groupedData = details.reduce((acc: any, item: FinanceItem) => {
    const category = item.finance_category?.name || "Lainnya";
    if (!acc[category]) {
      acc[category] = { total: 0, items: [] };
    }
    acc[category].total += Number(item.amount);
    acc[category].items.push(item);
    return acc;
  }, {});

  return (
    <section>
      <h3 className="font-semibold text-base mb-4 border-b pb-1 text-amber-600">
        Data Keuangan Klien
      </h3>

      {details.length ? (
        <div className="space-y-6 text-sm">
          {Object.entries(groupedData).map(
            (
              [categoryName, { total, items }]: any,
              idx: number
            ) => (
              <div
                key={idx}
                className="bg-white border border-amber-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-amber-700 font-semibold text-base flex items-center gap-2">
                    💰{" "}
                    {categoryName
                      .split(" ")
                      .map(
                        (word: string) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h4>
                  <span className="text-sm font-medium text-gray-700">
                    Total: Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {items.map((item: FinanceItem, i: number) => (
                    <div
                      key={i}
                      className="border rounded-md px-3 py-2 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <p className="font-medium text-gray-800">
                        {item.name ||
                          item.finance_type?.name ||
                          "Tanpa Nama"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Rp {Number(item.amount).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Belum ada data keuangan yang diinputkan.
        </p>
      )}
    </section>
  );
}
