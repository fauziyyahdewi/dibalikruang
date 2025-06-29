import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Atau next-auth tergantung setup kamu
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Cari advisor berdasarkan user_id
    const advisor = await prisma.financial_advisors.findFirst({
      where: {
        user_id: Number(session.user.id),
      },
    });

    if (!advisor) {
      return NextResponse.json([], { status: 200 });
    }

    const results = await prisma.fincheck_result.findMany({
      where: {
        financial_advisor_id: advisor.id,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        client_finance: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            client_finance_summary: {
              select: {
                id: true,
                finance_category_id: true,
                amount: true,
              },
            },
            client_finance_detail: {
              select: {
                id: true,
                name: true,
                amount: true,
                finance_category_id: true,
                finance_type_id: true,
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
      advisorEmail: item.financial_advisors?.user?.email ?? null,
      clientFinanceId: item.client_finance_id,
      resultType: item.fincheck_result_type?.name ?? null,
      summary:
        item.client_finance?.client_finance_summary.map((s) => ({
          ...s,
          amount: Number(s.amount),
        })) ?? [],
      detail:
        item.client_finance?.client_finance_detail.map((d) => ({
          ...d,
          amount: Number(d.amount),
        })) ?? [],
    }));

    return NextResponse.json(mapped, { status: 200 });
  } catch (error) {
    console.error("Error fetching my fincheck results:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data fincheck advisor." },
      { status: 500 }
    );
  }
}
