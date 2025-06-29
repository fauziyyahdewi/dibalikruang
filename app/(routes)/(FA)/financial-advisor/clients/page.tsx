"use client";

import { DataClientTable } from "@/components/FinancialAdvisorDashboard/Client/DataClientTable";
import { SiteHeader } from "@/components/FinancialAdvisorDashboard/site-header";
import { Client } from "@/types/client";
import { useEffect, useState } from "react";

export default function ClientsPage() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/client/list");
      const json = await res.json();
      console.log("Data client:", json);
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
      <SiteHeader title="Daftar Klien" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="p-4">
              <DataClientTable data={data} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
