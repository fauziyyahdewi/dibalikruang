export type ClientFinance = {
    id: string;
    type: string;
    name: string;
    amount: string;
};

// 1. Pemasukan
export const BASE_INCOME_RECOMMENDATIONS: ClientFinance[] = [
    { id: "1", type: "incomes", name: "Bonus", amount: "" },
    { id: "2", type: "incomes", name: "Lainnya", amount: "" },
];

// 2. Pengeluaran
export const BASE_EXPENSES_RECOMMENDATIONS: ClientFinance[] = [
    { id: "1", type: "expenses", name: "Transportasi", amount: "" },
    { id: "2", type: "expenses", name: "Gaya Hidup", amount: "" },
    { id: "3", type: "expenses", name: "Lainnya", amount: "" },
];

// 3. Tabungan
export const BASE_SAVINGS_RECOMMENDATIONS: ClientFinance[] = [
    { id: "1", type: "savings", name: "Tabungan Reguler", amount: "" },
    { id: "2", type: "savings", name: "Investasi", amount: "" },
    { id: "3", type: "savings", name: "Lainnya", amount: "" },
];

// 4. Investasi
export const BASE_INVESTMENTS_RECOMMENDATIONS: ClientFinance[] = [
    { id: "1", type: "investment", name: "Saham", amount: "" },
    { id: "2", type: "investment", name: "Obligasi", amount: "" },
    { id: "3", type: "investment", name: "Logam Mulia", amount: "" },
    { id: "4", type: "investment", name: "Lainnya", amount: "" },
];

// 5. Dana Darurat
export const BASE_EMERGENCY_FUNDS_RECOMMENDATIONS: ClientFinance[] = [
    { id: "1", type: "emergency_fund", name: "Lainnya", amount: "" },
];

// 6. Aset Pribadi
export const BASE_ASSETS_RECOMMENDATIONS: ClientFinance[] = [
    { id: "1", type: "assets", name: "Rumah", amount: "" },
    { id: "2", type: "assets", name: "Motor", amount: "" },
    { id: "3", type: "assets", name: "Mobil", amount: "" },
    { id: "4", type: "assets", name: "Lainnya", amount: "" },
];

// 7. Hutang
export const BASE_LIABILITIES_RECOMMENDATIONS: ClientFinance[] = [
    { id: "1", type: "liabilities", name: "Kartu Kredit", amount: "" },
    { id: "2", type: "liabilities", name: "Paylater", amount: "" },
    { id: "3", type: "liabilities", name: "Lainnya", amount: "" },
];
