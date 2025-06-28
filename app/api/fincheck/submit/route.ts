// File: app/api/fincheck/submit/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    // Mendapatkan sesi pengguna yang sedang login
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mengambil data dari body request
    const body = await req.json();
    const {
      clientFinanceId,
      fincheckId,
      financeSummary,
      financeDetails,
      calculated,
    } = body;

    let clientFinance;
    let fincheckResult;

    // 1. Menyimpan data financial klien ke tabel client_finance
    if (clientFinanceId) {
      // Update timestamp & hapus data anak
      clientFinance = await prisma.client_finance.update({
        where: { id: clientFinanceId },
        data: { updated_at: new Date() },
      });

      await prisma.client_finance_summary.deleteMany({
        where: { client_finance_id: clientFinanceId },
      });

      await prisma.client_finance_detail.deleteMany({
        where: { client_finance_id: clientFinanceId },
      });
    } else {
      clientFinance = await prisma.client_finance.create({
        data: { user_id: Number(userId) },
      });
    }

    // 2. Menyimpan data ringkasan keuangan ke tabel client_finance_summary
    if (financeSummary?.length) {
      await prisma.client_finance_summary.createMany({
        data: financeSummary.map((item: any) => ({
          user_id: Number(userId),
          client_finance_id: clientFinance.id,
          finance_category_id: item.finance_category_id,
          amount: BigInt(item.amount || 0),
        })),
      });
    }

    // 3. Menyimpan detail keuangan ke tabel client_finance_detail (banyak data)
    if (financeDetails?.length) {
      await prisma.client_finance_detail.createMany({
        data: financeDetails.map((item: any) => ({
          user_id: Number(userId),
          client_finance_id: clientFinance.id,
          finance_category_id: item.finance_category_id,
          finance_type_id: item.finance_type_id,
          name: item.name,
          amount: BigInt(item.amount),
        })),
      });
    }

    const fincheckResultType = (nama: string): number => {
      switch (nama) {
        case "Ideal":
          return 1;
        case "Tidak Ideal":
          return 2;
        case "Kurang Optimal":
          return 3;
        default:
          return 0;
      }
    };

    // 4. Menyimpan hasil fincheck ke tabel fincheck_result
    if (fincheckId) {
      fincheckResult = await prisma.fincheck_result.update({
        where: { id: fincheckId },
        data: {
          percent: Math.round(calculated.percent),
          description: calculated.message,
          client_finance_id: clientFinance.id,
          updated_at: new Date(),
        },
      });

      await prisma.fincheck_result_detail.deleteMany({
        where: { fincheck_result_id: fincheckId },
      });
    } else {
      fincheckResult = await prisma.fincheck_result.create({
        data: {
          user_id: Number(userId),
          client_finance_id: clientFinance.id,
          percent: Math.round(calculated.percent),
          description: calculated.message,
          fincheck_result_type_id: fincheckResultType(
            calculated.overallCondition
          ),
        },
      });
    }

    // 5. Menyimpan detail indikator fincheck ke tabel fincheck_result_detail
    if (calculated.details?.length) {
      await prisma.fincheck_result_detail.createMany({
        data: calculated.details.map((item: any) => ({
          fincheck_result_id: fincheckResult.id,
          fincheck_result_category_id: item.categoryId,
          fincheck_result_type_id: item.conditionLevel,
          value: Math.round(item.amountInput), // Nilai indikator dibulatkan
          description: item.description, // Deskripsi indikator
          position_detail: item.position,
        })),
      });
    }

    // Response berhasil
    return NextResponse.json(
      {
        success: true,
        client_finance_id: clientFinance.id,
        fincheck_id: fincheckResult.id,
      },
      { status: 200 }
    );
  } catch (error) {
    // Menangani error dan memberikan response gagal
    console.error("FinCheck Submit Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan data." },
      { status: 500 }
    );
  }
}
