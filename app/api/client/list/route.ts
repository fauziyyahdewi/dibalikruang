import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { convertBigIntToString } from "@/utils/BigintToString";

export async function GET() {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: "user", 
      },
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
        created_at: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(convertBigIntToString(clients));
  } catch (error) {
    console.error("Error fetching users with role user:", error);
    return NextResponse.json(
      { error: "Failed to fetch client list" },
      { status: 500 }
    );
  }
}
