// File: app/api/fincheck/list/all/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const results = await prisma.fincheck_result.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        client_finance: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        financial_advisors: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        fincheck_result_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const mapped = results.map((item) => ({
      id: item.id,
      name: item.client_finance?.user?.name ?? "-",
      percentage: item.percent,
      status: item.fincheck_result_type?.name ?? null,
      createdAt: item.created_at,
      advisorName: item.financial_advisors?.user?.name ?? null,
      clientFinanceId: item.client_finance_id,
      resultType: item.fincheck_result_type?.name ?? null,
    }));

    return NextResponse.json(mapped, { status: 200 });
  } catch (error) {
    console.error("Error fetching all fincheck results:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data fincheck." },
      { status: 500 }
    );
  }
}
