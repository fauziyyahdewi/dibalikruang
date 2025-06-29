"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { useRef, useState } from "react";
import ClientProfileSection from "./ClientProfileSection";
import { SummaryCardSection } from "./SummaryCardSection";
import { ClientFinanceSection } from "./ClientFinanceSection";
import { CategoryAnalysisSection } from "./ClientAnalysisSection";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FincheckPdf from "../../PDF/FincheckPDF";

type Props = {
  clientId: number;
};

export function FinancialDetailDialog({ clientId }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fincheck/result/show?id=${clientId}`);
      const json = await res.json();
      console.log("Data diambil:", json);
      setData(json);
    } catch (err) {
      console.error("Gagal ambil data detail:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && fetchDetail()}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Financial Check-Up</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-brand-orange" />
          </div>
        ) : !data ? (
          <p>Data tidak tersedia.</p>
        ) : (
          <>
            <div ref={contentRef} className="space-y-6 text-sm p-4 bg-white">
              {/* Bagian 1: Data Klien */}
              <ClientProfileSection data={data} />

              {/* Bagian 2: Finansial Result */}
              <SummaryCardSection data={data} />

              {/* Bagian 3: Data Keuangan Klien */}
              <ClientFinanceSection data={data} />

              {/* Bagian 4: Detail Finansial Result */}
              <CategoryAnalysisSection data={data} />
            </div>

            {/* Footer tombol */}
            <div className="flex justify-end gap-2 pt-4">
              <DialogTrigger asChild>
                <Button variant="secondary">Tutup</Button>
              </DialogTrigger>
              {data && (
                <PDFDownloadLink
                  document={<FincheckPdf data={data} />}
                  fileName={`Financial_Checkup_Client_${clientId}.pdf`}
                >
                  {({ loading }) => (
                    <Button variant="outline" disabled={loading}>
                      <Download className="w-4 h-4 mr-1" />
                      {loading ? "Menyiapkan..." : "Download PDF"}
                    </Button>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
