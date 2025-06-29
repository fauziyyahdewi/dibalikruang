import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"; // Jika perlu otentikasi
import { convertBigIntToString } from "@/utils/BigintToString";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const userRole = session?.user?.role === "financial-advisor";

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!userRole) {
      return NextResponse.json(
        { error: "User bukan financial advisor yang valid." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { fincheckId } = body;

    if (!fincheckId) {
      return NextResponse.json(
        { error: "fincheckId harus disertakan." },
        { status: 400 }
      );
    }

    // Cari advisor ID berdasarkan user login
    const advisor = await prisma.financial_advisors.findFirst({
      where: { user_id: Number(userId) },
    });


    // Update data fincheck_result
    const updated = await prisma.fincheck_result.update({
      where: { id: Number(fincheckId) },
      data: {
        financial_advisor_id: advisor?.id,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: convertBigIntToString(updated) }, { status: 200 });
  } catch (error) {
    console.error("Assign Advisor Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat assign advisor." },
      { status: 500 }
    );
  }
}
