// File: app/api/fincheck/submit/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    // Mendapatkan sesi pengguna yang sedang login
    const session = await auth();
    const userId = session?.user?.id;

    // Jika tidak ada userId, kembalikan error unauthorized
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mengambil data dari body request
    const body = await req.json();
    const { financeSummary, financeDetails, calculated } = body;
    console.log("Body:", body);
    console.log("financeSummary:", financeSummary);

    // 1. Menyimpan data ringkasan keuangan ke tabel client_finance
    if (financeSummary?.length) {
      await prisma.client_finance.createMany({
        data: financeSummary.map((item: any) => ({
          user_id: Number(userId),
          finance_category_id: item.finance_category_id,
          amount: BigInt(item.amount || 0),
        })),
      });
    }

    // 2. Menyimpan detail keuangan ke tabel client_finance_detail (banyak data)
    if (financeDetails?.length) {
      await prisma.client_finance_detail.createMany({
        data: financeDetails.map((item: any) => ({
          user_id: Number(userId),
          finance_type_id: item.typeId,
          finance_subtype_id: item.subtypeId,
          name: item.name,
          amount: BigInt(item.amount),
        })),
      });
    }

    // 3. Menyimpan hasil fincheck ke tabel fincheck_result
    const fincheckResult = await prisma.fincheck_result.create({
      data: {
        user_id: Number(userId),
        percent: Math.round(calculated.percent), // Persentase dibulatkan
        description: calculated.message, // Deskripsi kondisi keuangan
      },
    });

    // 4. Menyimpan detail indikator fincheck ke tabel fincheck_result_detail
    if (calculated.details?.length) {
      await prisma.fincheck_result_detail.createMany({
        data: calculated.details.map((item: any) => ({
          fincheck_result_id: fincheckResult.id,
          fincheck_result_type_id: item.typeId,
          result_category_id: item.categoryId,
          value: Math.round(item.value), // Nilai indikator dibulatkan
          description: item.description, // Deskripsi indikator
        })),
      });
    }

    // Response berhasil
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Menangani error dan memberikan response gagal
    console.error("FinCheck Submit Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan data." },
      { status: 500 }
    );
  }
}
