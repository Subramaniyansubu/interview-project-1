import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Geçersiz kaplumbağa ID'si." },
      { status: 400 },
    );
  }

  const turtle = await prisma.turtle.findUnique({
    where: { id: Number(id) },
  });

  if (!turtle) {
    return NextResponse.json(
      { error: "Kaplumbağa bulunamadı." },
      { status: 404 },
    );
  }

  return NextResponse.json(turtle, { status: 200 });
};
