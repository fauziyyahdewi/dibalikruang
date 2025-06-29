// app/(dashboard)/fincheck/list/page.tsx

"use client";

import { useEffect, useState } from "react";
import { DataFincheckTable } from "@/components/FinancialAdvisorDashboard/FinancialCheckClient/DataFincheckTable";
import { FincheckResult } from "@/types/fincheck-client"; // Pastikan tipe ini sesuai dengan bentuk `mapped` dari API
import { SiteHeader } from "@/components/FinancialAdvisorDashboard/site-header";

export default function FinancialCheckListPage() {
  const [data, setData] = useState<FincheckResult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/fincheck/list/all");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Gagal memuat data fincheck:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SiteHeader title="Daftar Financial Check-Up Client" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="p-4">
              <DataFincheckTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
