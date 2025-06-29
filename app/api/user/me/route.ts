import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = Number(session.user.id);

    const client = await prisma.clients.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      name: client?.user?.name || session.user.name || "",
      email: client?.user?.email || session.user.email || "",
      phone_number: client?.phone_number || "",
      birthday: client?.birthday?.toISOString().split("T")[0] || "",
      is_married: client?.is_married || false,
      hasDependents: !!client?.dependents,
      dependents: client?.dependents || 0,
      dependents_note: client?.dependents_note || "",
      job: client?.jobs || "",
      domisili: client?.domisili || "",
    });
  } catch (error) {
    console.error("[GET_CLIENT_ME]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};