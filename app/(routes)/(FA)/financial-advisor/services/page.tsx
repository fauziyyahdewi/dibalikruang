"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/FinancialAdvisorDashboard/site-header";
import { DataFincheckHandledTable } from "@/components/FinancialAdvisorDashboard/Services/DataFincheckHandledTable";
import { FincheckResult } from "@/types/fincheck-client";

export default function ServicesPage() {
  const [data, setData] = useState<FincheckResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHandledData() {
      try {
        const res = await fetch("/api/fincheck/list/me");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching handled fincheck data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHandledData();
  }, []);

  return (
    <>
      <SiteHeader title="Daftar Klien Saya" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="p-4">
              <DataFincheckHandledTable
                data={data}
                advisorName={data[0]?.advisorName ?? "-"}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
