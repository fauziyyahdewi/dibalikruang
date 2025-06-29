import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { convertBigIntToString } from "@/utils/BigintToString";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.user.id);
  const data = await req.json();

  try {
    // cek apakah client sudah ada
    const existingClient = await prisma.clients.findUnique({
      where: { user_id: userId },
    });

    let result;

    if (existingClient) {
      // 🔁 UPDATE
      result = await prisma.clients.update({
        where: { user_id: userId },
        data: {
          phone_number: data.phone_number,
          birthday: data.birthday ? new Date(data.birthday) : null,
          is_married: data.is_married,
          dependents: data.hasDependents ? data.dependents : 0,
          dependents_note: data.hasDependents ? data.dependents_note : "",
          jobs: data.job || "",
          domisili: data.domisili || "",
          updated_at: new Date(),
        },
      });
    } else {
      // 🆕 CREATE
      result = await prisma.clients.create({
        data: {
          user_id: userId,
          phone_number: data.phone_number,
          birthday: data.birthday ? new Date(data.birthday) : null,
          is_married: data.is_married,
          dependents: data.hasDependents ? data.dependents : 0,
          dependents_note: data.hasDependents ? data.dependents_note : "",
          jobs: data.job || "",
          domisili: data.domisili || "",
        },
      });
    }

    return NextResponse.json({ message: "Data klien berhasil disimpan", data: convertBigIntToString(result) });
  } catch (error) {
    console.error("[CLIENT_SAVE_ERROR]", error);
    return NextResponse.json({ error: "Gagal menyimpan data klien" }, { status: 500 });
  }
}

