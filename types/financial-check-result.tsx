import { FormValues } from "./form-values";

export type Indicator = {
  label: string;
  value: string;
  inputUsed?: string; // nilai total input yang digunakan
  status: "ideal" | "not-ideal";
  description?: string;
};

export type FinancialCategoryResult = {
  category: string;          // e.g. "Tabungan"
  value: number;             // e.g. 25
  category_level: string;    // "Ideal" | "Kurang optimal" | "Tidak ideal"
  description: string;       // Saran deskriptif
};

export type ResultValues = {
  percent: number;                 // e.g. 70
  condition: string;              // "Ideal", "Kurang optimal", "Tidak ideal"
  details: FinancialCategoryResult[];
};

export type FinancialCondition = "Ideal" | "Kurang Optimal" | "Tidak Ideal";

export type IndicatorDetail = {
  category: string;
  percent: number;
  value: number;
  category_level: FinancialCondition;
  description: string;
};

export type CalculateResult = {
  id?: number;
  percent: number;
  overallCondition: FinancialCondition;
  message: string;
  details: IndicatorDetail[];
  rawInput?: FormValues;
};