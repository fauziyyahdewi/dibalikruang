"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import FincheckPdf from "./PDF/FincheckPDF";

type Props = {
  clientId: number;
};

export function DownloadButton({ clientId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fincheck/result/show?id=${clientId}`);
      const json = await res.json();

      if (json.error) throw new Error(json.error);

      const blob = await pdf(<FincheckPdf data={json} />).toBlob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Financial_Checkup_Client_${clientId}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal download PDF:", err);
      alert("Terjadi kesalahan saat mengunduh PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleDownload}
      disabled={loading}
      title="Unduh PDF"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      ) : (
        <Download className="w-4 h-4" />
      )}
    </Button>
  );
}
