import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Poppins",
  fonts: [
    { src: "/fonts/Poppins-Regular.ttf" },
    { src: "/fonts/Poppins-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Poppins-Medium.ttf", fontWeight: "medium" },
  ],
});

type Props = {
  data: any;
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Poppins",
    lineHeight: 1.6,
    backgroundColor: "#ffffff",
  },
  section: {
    marginBottom: 28,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#D97706",
    textTransform: "uppercase",
    borderBottom: "1 solid #FCD34D",
    paddingBottom: 4,
  },
  label: {
    color: "#6B7280",
  },
  value: {
    fontWeight: "bold",
    color: "#111827",
  },
  box: {
    border: "1 solid #E5E7EB",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  boxRed: {
    border: "1 solid #FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  boxGreen: {
    border: "1 solid #86EFAC",
    backgroundColor: "#F0FDF4",
  },
  smallText: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "medium",
    marginBottom: 24,
    textAlign: "center",
    color: "#1F2937",
  },
  subheading: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 6,
  },
  highlight: {
    backgroundColor: "#FEF3C7",
    padding: 6,
    borderRadius: 4,
    marginVertical: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 10,
  },
  infoBox: {
    width: "48%",
    marginBottom: 10,
    padding: 8,
    border: "1 solid #E5E7EB",
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
});

export default function FincheckPdf({ data }: Props) {
  const profile = data?.user?.clients || {};
  const result = data;
  const finance = data.client_finance?.client_finance_detail || [];
  const details = data.fincheck_result_detail || [];

  const groupedFinance = finance.reduce((acc: any, item: any) => {
    const category = item.finance_category?.name || "Lainnya";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const ideal = details.filter(
    (d: any) => d.fincheck_result_type?.name === "Ideal"
  );
  const nonIdeal = details.filter(
    (d: any) => d.fincheck_result_type?.name !== "Ideal"
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatRupiah = (val: number) =>
    `Rp ${Number(val || 0).toLocaleString("id-ID")}`;

  const idealMap: Record<string, string> = {
    Tabungan: "≥ 20% dari pendapatan",
    "Dana Darurat": "6–12× pengeluaran",
    "Aset Liquid": "≤ 15% dari aset",
    "Hutang Terhadap Aset": "< 50% dari kekayaan",
    "Cicilan Hutang": "< 35% dari pendapatan",
    Investasi: "> 50% dari kekayaan",
    "Aset Terhadap Hutang": "≥ 200% dari hutang",
    "Arus Kas": "Pendapatan > Pengeluaran",
    "Kekayaan Bersih": "≥ 3 tahun pengeluaran",
  };

  const getDisplayValue = (category: string, value: number): string => {
    const intVal = Math.round(value);
    if (category === "Dana Darurat" || category === "Kekayaan Bersih")
      return `${intVal} bulan`;
    if (category === "Arus Kas") return intVal >= 0 ? "Surplus" : "Defisit";
    return `${intVal}%`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Detail Financial Check-Up</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Data Klien</Text>
          <View style={styles.grid}>
            {[
              ["Nama", data.user?.name],
              ["Email", data.user?.email],
              ["Nomor Telepon", profile.phone_number],
              [
                "Tanggal Lahir",
                profile.birthday && formatDate(profile.birthday),
              ],
              ["Pekerjaan", profile.jobs],
              [
                "Status Menikah",
                profile.is_married ? "Menikah" : "Belum menikah",
              ],
              ["Tanggungan", profile.dependents_note || "Tidak Ada Tanggungan"],
              ["Jumlah Tanggungan", profile.dependents ?? 0],
            ].map(([label, val], idx) => (
              <View key={idx} style={styles.gridItem}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{val || "-"}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Ringkasan Check-Up</Text>

          {/* Persentase dan Kondisi */}
          <View
            style={{
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                border: "5 solid #16a34a",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#1F2937" }}
              >
                {result.percent}%
              </Text>
            </View>
            <Text style={{ fontSize: 10, color: "#6B7280", marginTop: 6 }}>
              Kondisi Keuangan
            </Text>
            <View
              style={{
                backgroundColor: "#DCFCE7",
                color: "#15803D",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 999,
                marginTop: 4,
              }}
            >
              <Text
                style={{ fontSize: 10, fontWeight: "bold", color: "#15803D" }}
              >
                {result.fincheck_result_type?.name || "Tidak Diketahui"}
              </Text>
            </View>
          </View>

          {/* Grid 2 Kolom */}
          <View style={styles.infoBox}>
            <Text style={styles.label}>Deskripsi</Text>
            <Text style={styles.value}>{result.description || "-"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.infoBox}>
              <Text style={styles.label}>Tanggal Check-Up</Text>
              <Text style={styles.value}>
                {result.created_at ? formatDate(result.created_at) : "-"}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Ditangani Oleh</Text>
              <Text style={styles.value}>
                {result.financial_advisors?.name || "Belum ditangani"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Data Keuangan Klien</Text>
          {Object.entries(groupedFinance).map(([category, items]: any, i) => (
            <View key={i} style={styles.box}>
              <Text style={styles.subheading}>{category}</Text>
              {items.map((item: any, idx: number) => (
                <Text key={idx} style={styles.smallText}>
                  • {item.name || item.finance_type?.name || "Tanpa Nama"}:{" "}
                  {formatRupiah(item.amount)}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Hasil Analisis per Kategori</Text>

          {[
            {
              list: nonIdeal,
              label: "\u26A0\uFE0F Perlu Diperbaiki",
              color: styles.boxRed,
            },
            { list: ideal, label: "\u2705 Sudah Baik", color: styles.boxGreen },
          ].map(
            (group, gIdx) =>
              group.list.length > 0 && (
                <View key={gIdx}>
                  <Text style={[styles.subheading, { marginBottom: 8 }]}>
                    {" "}
                    {group.label}{" "}
                  </Text>
                  {group.list.map((item: any, idx: number) => (
                    <View key={idx} style={[styles.box, group.color]}>
                      <Text style={styles.value}>
                        {item.fincheck_result_category?.name}
                      </Text>
                      <Text style={styles.smallText}>
                        Nilai:{" "}
                        {getDisplayValue(
                          item.fincheck_result_category?.name,
                          item.value
                        )}
                      </Text>
                      <Text style={styles.smallText}>
                        Ideal:{" "}
                        {idealMap[item.fincheck_result_category?.name] || "-"}
                      </Text>
                      {item.position_detail && (
                        <Text style={styles.smallText}>
                          Catatan: {item.position_detail}
                        </Text>
                      )}
                      <Text style={styles.smallText}>
                        Rekomendasi: {item.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )
          )}
        </View>
      </Page>
    </Document>
  );
}
