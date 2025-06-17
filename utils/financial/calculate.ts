import {
  CalculateResult,
  FinancialCondition,
  IndicatorDetail,
} from "@/types/financial-check-result";

type Data = {
  pendapatan: number;
  pengeluaran: number;
  aset: number;
  hutang: number;
  menabung: number;
  tabungan: number;
  investasi: number;
  dana_darurat: number;
  asset_liquid: number;
};

export function calculateIndicators(data: Data): CalculateResult {
  const {
    pendapatan,
    pengeluaran,
    aset,
    hutang,
    menabung,
    tabungan,
    investasi,
    dana_darurat,
    asset_liquid,
  } = data;

  const networth = tabungan + aset + investasi - hutang;
  const totalAsset = aset;
  const results: IndicatorDetail[] = [];
  let score = 0;
  let totalKategori = 0;

  const kategori = (
    ideal: boolean,
    kurangOptimal = false
  ): FinancialCondition => {
    if (ideal) return "Ideal";
    if (kurangOptimal) return "Kurang Optimal";
    return "Tidak Ideal";
  };

  // Rumus Ideal Financial
  const saran = (category: string, value: number): string => {
    switch (category) {
      case "Tabungan":
        if (value >= 20 && value <= 70)
          return "Tabungan Anda sudah berada di kisaran ideal. Pertahankan kebiasaan menabung yang baik ini.";
        if (value >= 10)
          return "Tabungan Anda cukup, tapi belum ideal. Coba tingkatkan secara bertahap agar lebih aman di masa depan.";
        return "Saat ini tabungan Anda sangat minim. Mulailah menyisihkan sebagian pendapatan secara rutin untuk tabungan.";
      case "Dana Darurat":
        if (value >= 6 && value <= 12)
          return "Dana darurat Anda sudah aman. Ini bisa menjadi bantalan keuangan yang kuat di saat darurat.";
        if (value >= 3)
          return "Dana darurat Anda cukup, tapi masih bisa ditingkatkan untuk perlindungan yang lebih baik.";
        return "Dana darurat sangat rendah. Sebaiknya mulai membangun dana ini untuk mengantisipasi kejadian tak terduga.";
      case "Aset Liquid":
        if (value <= 15)
          return "Aset liquid Anda dalam jumlah yang sehat. Tetap jaga keseimbangan antara likuiditas dan produktivitas aset.";
        if (value <= 30)
          return "Aset liquid Anda agak berlebih. Pertimbangkan mengalihkannya ke aset yang lebih produktif seperti investasi.";
        return "Terlalu banyak aset liquid bisa membuat uang Anda kurang berkembang. Coba pertimbangkan instrumen investasi yang aman.";
      case "Hutang terhadap Aset":
        if (value < 50)
          return "Rasio hutang terhadap aset Anda masih cukup aman. Terus jaga agar aset tumbuh lebih cepat dari hutang.";
        if (value <= 70)
          return "Rasio hutang Anda cukup tinggi. Usahakan untuk tidak menambah hutang dan fokus memperkuat aset.";
        return "Hutang Anda terlalu besar dibanding aset. Segera rencanakan pelunasan bertahap dan bangun aset bersih.";
      case "Cicilan Hutang":
        if (value < 35)
          return "Porsi cicilan Anda masih tergolong sehat. Tetap perhatikan agar tidak menambah cicilan yang membebani.";
        if (value <= 50)
          return "Cicilan Anda mulai terasa berat. Perlu lebih bijak dalam mengatur pengeluaran bulanan.";
        return "Cicilan Anda terlalu besar dan berisiko. Segera evaluasi keuangan dan cari cara untuk mengurangi beban tersebut.";
      case "Investasi":
        if (value > 50)
          return "Investasi Anda sudah sangat baik. Terus kelola dan evaluasi untuk hasil yang lebih optimal.";
        if (value >= 30)
          return "Investasi Anda cukup baik, tapi masih bisa ditingkatkan agar lebih seimbang dengan kekayaan bersih.";
        return "Investasi Anda masih rendah. Cobalah mulai berinvestasi, meski dari nominal kecil, untuk masa depan yang lebih stabil.";
      case "Aset terhadap Hutang":
        if (value >= 50)
          return "Aset Anda jauh lebih besar dibanding hutang. Ini menunjukkan kondisi keuangan yang sehat.";
        if (value >= 30)
          return "Aset Anda masih lebih besar dari hutang, namun ada ruang untuk perbaikan. Tingkatkan aset bersih secara bertahap.";
        return "Aset Anda terlalu kecil jika dibandingkan hutang. Prioritaskan pembangunan aset dan kurangi beban utang.";
      case "Cashflow":
        if (value > 0)
          return "Cashflow Anda positif. Ini pertanda keuangan sehat. Tetap kontrol pengeluaran dan manfaatkan kelebihan dengan bijak.";
        if (value === 0)
          return "Cashflow Anda seimbang. Usahakan sedikit penghematan agar ada ruang untuk menabung atau berinvestasi.";
        return "Cashflow Anda negatif. Segera evaluasi pengeluaran dan coba atur ulang prioritas keuangan.";
      case "Kekayaan Bersih":
        if (value >= hutang)
          return "Kekayaan bersih Anda cukup baik. Ini menunjukkan kondisi keuangan yang sehat.";
        if (investasi === 0)
          return "Kekayaan bersih Anda cukup baik, namun investasi anda masih rendah. Mulailah menyisihkan sebagian untuk investasi";
        return "Kekayaan bersih Anda terlalu rendah jika dibandingkan hutang. Prioritaskan pembangunan aset dan kurangi beban utang.";
      default:
        return "Belum ada saran khusus untuk kategori ini.";
    }
  };

  const addResult = (
    name: string,
    percent: number,
    rawValue: number,
    isIdeal: boolean,
    isKurang: boolean
  ) => {
    const level = kategori(isIdeal, isKurang);
    results.push({
      category: name,
      percent: Math.round(percent), // Untuk UI progress bar atau chart
      value: rawValue, // Nilai asli, misal 800000
      category_level: level,
      description: saran(name, rawValue),
    });
    score += isIdeal ? 1 : isKurang ? 0.5 : 0;
    totalKategori++;
  };

  // Perhitungan
  const persenTabungan = pendapatan > 0 ? (menabung / pendapatan) * 100 : 0;
  addResult(
    "Tabungan",
    persenTabungan,
    menabung,
    persenTabungan >= 20 && persenTabungan <= 70,
    persenTabungan >= 10 && persenTabungan < 20
  );

  const daruratValue = pengeluaran > 0 ? dana_darurat / pengeluaran : 0;
  addResult(
    "Dana Darurat",
    daruratValue,
    dana_darurat,
    daruratValue >= 6 && daruratValue <= 12,
    daruratValue >= 3 && daruratValue < 6
  );

  const persenLiquid = totalAsset > 0 ? (asset_liquid / totalAsset) * 100 : 0;
  addResult(
    "Aset Liquid",
    persenLiquid,
    asset_liquid,
    persenLiquid <= 15,
    persenLiquid > 15 && persenLiquid <= 30
  );

  const persenHutangAset = networth > 0 ? (hutang / networth) * 100 : 100;
  addResult(
    "Hutang terhadap Aset",
    persenHutangAset,
    hutang,
    persenHutangAset < 50,
    persenHutangAset >= 50 && persenHutangAset <= 70
  );

  const persenCicilan = pendapatan > 0 ? (hutang / pendapatan) * 100 : 100;
  addResult(
    "Cicilan Hutang",
    persenCicilan,
    (hutang / pendapatan) * pendapatan,
    persenCicilan < 35,
    persenCicilan >= 35 && persenCicilan <= 50
  );

  const persenInvestasi = networth > 0 ? (investasi / networth) * 100 : 0;
  addResult(
    "Investasi",
    persenInvestasi,
    investasi,
    persenInvestasi > 50,
    persenInvestasi >= 30 && persenInvestasi <= 50
  );

  const persenAsetHutang = hutang > 0 ? (networth / hutang) * 100 : 100;
  addResult(
    "Aset terhadap Hutang",
    persenAsetHutang,
    aset,
    persenAsetHutang >= 50,
    persenAsetHutang >= 30 && persenAsetHutang < 50
  );

  const selisih = pendapatan - pengeluaran;
  addResult("Cashflow", selisih, selisih, selisih > 0, selisih === 0);

  addResult(
    "Kekayaan Bersih",
    networth,
    networth,
    networth >= hutang,
    networth >= investasi
  );

  const percent =
    totalKategori > 0
      ? Math.round(((score / totalKategori) * 100) / 10) * 10
      : 0;

  const overallCondition: FinancialCondition =
    percent >= 99 ? "Ideal" : percent >= 50 ? "Kurang Optimal" : "Tidak Ideal";

  // Fungsi tambahan untuk menentukan message dari skor
  const getMessageFromScore = (score: number) => {
    if (score === 100) return "Kondisi keuanganmu saat ini sehat.";
    if (score >= 90)
      return "Kondisi keuanganmu cukup sehat. Namun masih ada bagian yang perlu dioptimalkan.";
    if (score >= 41)
      return "Kondisi keuanganmu belum optimal. Masih ada yang perlu diperbaiki.";
    return "Kondisi keuanganmu tidak sehat.";
  };

  return {
    percent,
    overallCondition,
    details: results,
    message: getMessageFromScore(percent), // <- ini tambahan penting
  };
}
