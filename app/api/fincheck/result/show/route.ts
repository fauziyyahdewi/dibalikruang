import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { convertBigIntToString } from "@/utils/BigintToString";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  try {
    const result = await prisma.fincheck_result.findUnique({
      where: { id },
      include: {
        fincheck_result_detail: {
          include: {
            fincheck_result_category: true,
            fincheck_result_type: true,
          },
        },
        client_finance: {
          include: {
            client_finance_summary: {
              include: {
                finance_category: true,
              },
            },
            client_finance_detail: {
              include: {
                finance_category: true,
                finance_type: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            clients: {
              select: {
                phone_number: true,
                birthday: true,
                jobs: true,
                is_married: true,
                dependents: true,
                dependents_note: true,
              },
            },
          },
        },
        financial_advisors: true,
        fincheck_result_type: true,
      },
    });

    if (!result) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(convertBigIntToString(result));
  } catch (error) {
    console.error("[FINCHECK_SHOW_ERROR]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
