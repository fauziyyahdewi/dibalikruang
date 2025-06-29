import { SectionCards } from "@/components/FinancialAdvisorDashboard/section-cards";
import { SiteHeader } from "@/components/FinancialAdvisorDashboard/site-header";

export default async function FinancialAdvisorPage() {
  return (
    <>
      <SiteHeader title="Financial Advisor Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />{" "}
          </div>
        </div>
      </div>
    </>
  );
}
