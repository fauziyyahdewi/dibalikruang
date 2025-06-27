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
  const formatValue = (val: number) => {
    return `${val.toLocaleString("id-ID")}`;
  };

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
  // const totalAsset = aset;
  const results: IndicatorDetail[] = [];
  let score = 0;
  let totalKategori = 0;

  const kategoriHasilId = (nama: string): number => {
    switch (nama) {
      case "Tabungan":
        return 1;
      case "Dana Darurat":
        return 2;
      case "Aset Liquid":
        return 3;
      case "Hutang terhadap Aset":
        return 4;
      case "Cicilan Hutang":
        return 5;
      case "Investasi":
        return 6;
      case "Aset terhadap Hutang":
        return 7;
      case "Cashflow":
        return 8;
      case "Kekayaan Bersih":
        return 9;
      default:
        return 0;
    }
  };

  const kategori = (ideal: boolean): number => (ideal ? 1 : 2);

  const posisi = (category: string, value: number): string => {
    switch (category) {
      // 1. Tabungan
      case "Tabungan":
        if (value >= 20 && value <= 70)
          return "Anda telah berhasil menyisihkan 20% dari pendapatan bulanan Anda";
        if (value > 70)
          return "Anda menyisihkan cukup banyak, idealnya tidak lebih 70% dari pendapatan Anda.";
        if (value > 0)
          return "Tabungan Anda cukup minim, idealnya 20% dari pendapatan Anda.";
        return "Tabungan Anda sangat minim, idealnya 20% dari pendapatan Anda.";

      // 2. Dana Darurat
      case "Dana Darurat":
        if (value >= 6 && value <= 12)
          return "Dana darurat Anda telah dikisaran 6-12 kali pengeluaran bulanan Anda";
        if (value >= 12)
          return "Dana darurat melebihi batas ideal, cukup 6-12 kali pengeluaran bulanan.";
        if (value >= 3)
          return "Dana darurat Anda cukup minim, idealnya 6-12 kali dari pengeluaran bulanan Anda.";
        return "Dana darurat Anda sangat rendah, idealnya 6-12 kali dari pengeluaran bulanan Anda.";

      // 3. Aset Liquid
      case "Aset Liquid":
        if (value <= 15) return "Aset liquid Anda sudah dibatas aman.";
        return "Aset liquid Anda terlalu banyak, idealnya tidak lebih dari 15% dari keseluruhan aset Anda.";

      // 4. Hutang terhadap Aset
      case "Hutang terhadap Aset":
        if (value < 50) return "Rasio hutang Anda masih dibatas aman.";
        return "Rasio hutang cukup tinggi, maksimal 50% dari aset Anda.";

      // 5. Cicilan Hutang
      case "Cicilan Hutang":
        if (value < 35) return "Porsi cicilan Anda masih dibatas ideal.";
        if (value <= 50)
          return "Cicilan mulai berat, batasi maksimal 35% dari pendapatan bulanan";
        return "Cicilan terlalu besar dan berisiko, batasi maksimal 35% dari pendapatan bulanan.";

      // 6. Investasi
      case "Investasi":
        if (networth < 0)
          return "Investasi rendah, tapi kekayaan bersih Anda negatif.";
        if (value >= 50) return "Investasi Anda sudah ideal.";
        if (value >= 30)
          return "Investasi Anda belum menyentuh batas ideal, minimal 50% dari kekayaan bersih.";
        return "Investasi Anda sangat rendah, idealnya 50% dari kekayaan bersih.";

      // 7. Aset terhadap Hutang
      case "Aset terhadap Hutang":
        if (hutang === 0) return "Aset Anda sudah cukup aman.";
        if (value >= 200)
          return "Aset Anda sudah 2 kali lebih banyak dari hutang.";
        return "Aset Anda terlalu kecil dibandingkan hutang.";

      // 8. Cashflow
      case "Cashflow":
        if (value < 100) return "Arus kas Anda cukup baik.";
        if (value === 100)
          return "Pengeluaran Anda seimbang dengan pendapatan.";
        return "Cashflow Anda tidak baik, idealnya pengeluaran tidak melebihi pendapatan.";

      // 9. Kekayaan Bersih
      case "Kekayaan Bersih":
        if (value < 0)
          return "Kekayaan bersih negatif, aset belum cukup untuk menutup hutang.";
        if (value < 36)
          return "Kekayaan bersih masih rendah, idealnya setara 36 bulan pengeluaran.";
        if (value === 36)
          return "Kekayaan bersih Anda sudah ideal, setara 36 bulan pengeluaran.";
        return "Kekayaan bersih sangat baik, setara 36 bulan lebih pengeluaran.";

      default:
        return "Belum ada saran khusus untuk kategori ini.";
    }
  };

  const saran = (
    category: string,
    value: number,
    idealAmount: number
  ): string => {
    switch (category) {
      // 1. Tabungan
      case "Tabungan":
        if (value >= 20 && value <= 70)
          return "Pertahankan porsi tabungan Anda.";
        if (value > 70)
          return `Anda menabung terlalu banyak, coba untuk menyisihkan ${formatValue(
            menabung - idealAmount
          )} untuk investasi.`;
        if (value > 0)
          return `Tambahkan sebanyak ${formatValue(
            idealAmount - menabung
          )} dari pendapatan Anda.`;
        return `Mulai sisihkan minimal sebanyak ${formatValue(
          idealAmount - menabung
        )} dari pendapatan Anda.`;

      // 2. Dana Darurat
      case "Dana Darurat":
        if (value >= 6 && value <= 12)
          return "Pertahankan porsi dana darurat Anda.";
        if (value >= 12)
          return `Coba alihkan sebagian untuk investasi sebanyak ${formatValue(
            dana_darurat - idealAmount
          )}.`;
        if (value > 0 && pengeluaran > 0)
          return `Tambahkan hingga ${formatValue(
            idealAmount - dana_darurat
          )} untuk mencapai batas ideal.`;
        return "Mulailah menyisihkan sebagian pendapatan untuk mengantisipasi keadaan darurat.";

      // 3. Aset Liquid
      case "Aset Liquid":
        if (value <= 15) return "Pertahankan kondisi aset liquid Anda.";
        return `Pertimbangkan mengalihkan sebanyak ${formatValue(
          asset_liquid - idealAmount
        )} untuk investasi jangka panjang.`;

      // 4. Hutang terhadap Aset
      case "Hutang terhadap Aset":
        if (value < 50)
          return "Terus jaga aset Anda tumbuh lebih cepat dari hutang.";
        return `Kurangi beban hutang Anda, maksimal ${formatValue(
          Math.abs(idealAmount)
        )}`;

      // 5. Cicilan Hutang
      case "Cicilan Hutang":
        if (value < 35)
          return "Pertahankan dan hindari tambahan utang konsumtif.";
        if (value <= 50)
          return `Cicilan mulai membebani. Usahakan menurunkannya hingga maksimal ${formatValue(
            idealAmount
          )} per bulan.`;
        return `Beban cicilan terlalu besar dan berisiko. Kurangi hingga maksimal ${formatValue(
          idealAmount
        )} per bulan.`;

      // 6. Investasi
      case "Investasi":
        if (networth < 0)
          return "Kekayaan bersih Anda negatif. Tunda dulu investasi, dan fokuskan pada pelunasan utang serta membangun aset.";
        if (value > 50)
          return "Pertahankan dan sesuaikan dengan tujuan keuangan Anda.";
        if (value > 0 && investasi > 0)
          return `Tambahkan sekitar ${formatValue(
            idealAmount
          )} agar mencapai target 50% dari kekayaan bersih.`;
        return `Mulailah berinvestasi dan targetkan minimal ${formatValue(
          idealAmount
        )} untuk mencapai batas ideal.`;

      // 7. Aset terhadap Hutang
      case "Aset terhadap Hutang":
        if (hutang === 0)
          return "Fokuskan langkah untuk membangun nilai aset secara bertahap.";
        if (value >= 200) return "Pertahankan dan kembangkan nilai aset Anda.";
        return `Usahakan agar aset minimal dua kali lipat dari total hutang.`;

      // 8. Cashflow
      case "Cashflow":
        if (value === 100)
          return "Arus kas Anda seimbang. Usahakan sedikit penghematan agar ada ruang untuk menabung atau berinvestasi.";
        if (value < 100)
          return "Tetap kontrol pengeluaran dan manfaatkan kelebihan dengan bijak.";
        return "Segera evaluasi pengeluaran dan coba atur ulang prioritas keuangan.";

      // 9. Kekayaan Bersih
      case "Kekayaan Bersih":
        if (value < 0) return "Segera kurangi hutang dan tingkatkan aset.";
        if (value < 12)
          return "Fokus kembangkan nominal aset dan hindari beban hutang.";
        if (value < 36)
          return "Tingkatkan tabungan, aset, atau investasi untuk mencapai target 3 tahun pengeluaran.";
        if (value >= pengeluaran * 36 && investasi === 0)
          return "Nilai kekayaan bersih Anda cukup baik, namun investasi anda masih rendah. Mulailah menyisihkan sebagian untuk investasi";
        return "Pertahankan aset Anda, dan fokus untuk kembangkan nilainya.";

      default:
        return "Belum ada saran khusus untuk kategori ini.";
    }
  };

  const addResult = (
    name: string,
    percent: number,
    amountInput: number,
    idealValue: number,
    isIdeal: boolean
  ) => {
    const level = kategori(isIdeal);
    results.push({
      categoryId: kategoriHasilId(name),
      category: name,
      percent: Math.round(percent),
      amountInput: amountInput,
      conditionLevel: level,
      description: saran(name, percent, idealValue),
      position: posisi(name, percent),
    });
    score += isIdeal ? 1 : 0;
    totalKategori++;
  };

  //---Perhitungan Tiap Kategori Hasil Financial Check Up ---//
  // 1. Tabungan
  const persenTabungan = pendapatan > 0 ? (menabung / pendapatan) * 100 : 0;
  const idealTabungan = pendapatan * 0.2;
  addResult(
    "Tabungan",
    persenTabungan,
    menabung,
    idealTabungan,
    persenTabungan >= 20
  );

  // 2. Dana Darurat
  const persenDanaDarurat = pengeluaran > 0 ? dana_darurat / pengeluaran : 0;
  const idealDarurat = pengeluaran * 6;
  addResult(
    "Dana Darurat",
    persenDanaDarurat,
    dana_darurat,
    idealDarurat,
    persenDanaDarurat >= 6 && persenDanaDarurat <= 12
  );

  // 3. Aset Liquid
  const persenLiquid = networth > 0 ? (asset_liquid / networth) * 100 : 0;
  const idealLiquid = networth * 0.15;
  addResult(
    "Aset Liquid",
    persenLiquid,
    asset_liquid,
    idealLiquid,
    persenLiquid <= 15
  );

  // 4. Hutang terhadap Aset
  const persenHutangAset = networth > 0 ? (hutang / networth) * 100 : 100;
  const idealHutangAset = networth * 0.5;
  addResult(
    "Hutang terhadap Aset",
    persenHutangAset,
    hutang,
    idealHutangAset,
    persenHutangAset < 50
  );

  // 5. Cicilan Hutang
  const persenCicilan = pendapatan > 0 ? (hutang / pendapatan) * 100 : 100;
  const idealCicilan = pendapatan * 0.35;
  addResult(
    "Cicilan Hutang",
    persenCicilan,
    hutang,
    idealCicilan,
    persenCicilan < 35
  );

  // 6. Investasi
  const persenInvestasi = networth > 0 ? (investasi / networth) * 100 : 0;
  const idealInvestasi = networth * 0.5;
  addResult(
    "Investasi",
    persenInvestasi,
    investasi,
    idealInvestasi,
    persenInvestasi > 50
  );

  // 7. Aset terhadap Hutang
  const persenAsetHutang = hutang > 0 ? (networth / hutang) * 100 : 100;
  const idealAsetHutang = hutang / 0.5;
  const isIdealAsetHutang = hutang === 0 || persenAsetHutang >= 200;
  addResult(
    "Aset terhadap Hutang",
    persenAsetHutang,
    aset,
    idealAsetHutang,
    isIdealAsetHutang
  );

  // 8. Cashflow
  const percentCashflow = pendapatan > 0 ? (pengeluaran / pendapatan) * 100 : 0;
  const selisih = pendapatan - pengeluaran;
  const idealSelisih = pendapatan * 0.5;
  addResult(
    "Cashflow",
    percentCashflow,
    pengeluaran,
    idealSelisih,
    selisih >= 0
  );

  // 9. Kekayaan Bersih
  const percentKekayaan = networth > 0 ? Math.round(networth / pengeluaran) : 0;
  const idealKekayaan = pengeluaran * 36;
  addResult(
    "Kekayaan Bersih",
    percentKekayaan,
    networth,
    idealKekayaan,
    networth >= pengeluaran * 36 // setara 3 tahun pengeluaran
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
    message: getMessageFromScore(percent),
    details: results,
  };
}
