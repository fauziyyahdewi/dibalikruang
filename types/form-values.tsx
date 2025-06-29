export type FormValues = {
  // 🔢 Data Keuangan
  incomesSources: { name: string; amount: number; type?: "pemasukan" }[];
  expensesSources: { name: string; amount: number; type?: "pengeluaran" }[];
  savingsSources: { name: string; amount: number; type?: string }[];
  investmentSources: { name: string; amount: number; type?: "investasi" }[];
  assetsSources: { name: string; amount: number; type?: "aset" }[];
  debtsSources: { name: string; amount: number; type?: "hutang" }[];

  // 🧍 Data Klien (untuk step terakhir)
  name?: string;
  email?: string;
  phone_number?: string;
  birthday?: string; // format: "yyyy-MM-dd"
  job?: string;
  jobSelect?: string;
  jobText?: string;
  is_married?: boolean;
  hasDependents?: boolean;
  dependents_note?: string;
  dependents?: number;
  domisili?: string;
};

export type FormDataRegist = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormDataLogin = {
  email: string;
  password: string;
};
