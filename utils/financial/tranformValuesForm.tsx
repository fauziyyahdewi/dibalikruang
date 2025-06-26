import { FormValues } from "@/types/form-values";

type FinanceDetail = {
  name: string;
  amount: number;
  finance_category_id: number;
  finance_type_id: number | null;
};

export function transformFormValues(values: FormValues) {
  //   const parseAmount = (value: string) => Number(value) || 0;

  const summary = [
    {
      finance_category_id: 1,
      amount: values.incomesSources.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      ),
    },
    {
      finance_category_id: 2,
      amount: values.expensesSources.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      ),
    },
    {
      finance_category_id: 3,
      amount: values.assetsSources.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      ),
    },
    {
      finance_category_id: 4,
      amount: values.debtsSources.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      ),
    },
    {
      finance_category_id: 5,
      amount: Number(
        values.savingsSources.find((item) => item.type === "menabung")
          ?.amount || 0
      ),
    },
    {
      finance_category_id: 6,
      amount: Number(
        values.savingsSources.find((item) => item.type === "tabungan")
          ?.amount || 0
      ),
    },
    {
      finance_category_id: 7,
      amount: values.investmentSources.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      ),
    },
  ];

  const toDetail = (
    sources: { name: string; amount: number | string }[],
    finance_category_id: number
  ): FinanceDetail[] => {
    return sources.map((item) => ({
      name: item.name,
      amount: Number(item.amount),
      finance_category_id,
      finance_type_id: null,
    }));
  };

  const details = [
    ...toDetail(values.incomesSources, 1),
    ...toDetail(values.expensesSources, 2),
    ...toDetail(values.assetsSources, 3),
    ...toDetail(values.debtsSources, 4),
    ...toDetail(values.investmentSources, 5),
    ...values.savingsSources.map((item) => ({
      name: item.name,
      amount: Number(item.amount),
      finance_category_id: item.type === "tabungan" ? 5 : 6,
      finance_type_id: item.type === "tabungan" ? 1 : null,
    })),
  ];

  const dataForCalculation = {
    pendapatan: summary[0].amount,
    pengeluaran: summary[1].amount,
    aset: summary[2].amount,
    hutang: summary[3].amount,
    menabung: summary[4].amount,
    tabungan: summary[5].amount,
    investasi: summary[6].amount,
    dana_darurat: summary[5].amount,
    asset_liquid: summary[5].amount,
  };

  return { summary, details, dataForCalculation };
}
