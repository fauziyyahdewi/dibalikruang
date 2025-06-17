export type FormValues = {
  incomesSources: { name: string; amount: number; type?: "pemasukan" }[];
  expensesSources: { name: string; amount: number; type?: "pengeluaran" }[];
  savingsSources: { name: string; amount: number; type?: string }[];
  investmentSources: { name: string; amount: number; type?: "investasi" }[];
  assetsSources: { name: string; amount: number; type?: "aset" }[];
  debtsSources: { name: string; amount: number; type?: "hutang" }[];
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
