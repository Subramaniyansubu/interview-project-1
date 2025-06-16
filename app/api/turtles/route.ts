import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  const name = data.name;

  if (name.trim() == "" || name.length < 2 || name.length > 20) {
    return NextResponse.json(
      { error: "Kaplumbağa ismi 2-20 karakter arasında olmalıdır." },
      { status: 400 },
    );
  }

  try {
    await prisma.turtle.create({
      data: { name },
    });
    return NextResponse.json(
      { message: "Kaplumbağa başarıyla oluşturuldu." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Kaplumbağa oluşturulurken bir hata oluştu." },
      { status: 400 },
    );
  }
};

export const GET = async () => {
  try {
    const turtles = await prisma.turtle.findMany();
    return NextResponse.json(turtles, { status: 200 });
  } catch {
    return NextResponse.json([], { status: 404 });
  }
};
