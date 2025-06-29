export type FincheckResult = {
  id: number;
  name: string;
  percentage: number;
  status: string;
  createdAt: string;
  advisorName?: string;
};

export type FinanceDetail = {
  name: string;
  amount: number;
  finance_category_id: number;
  finance_type_id: number | null;
};