import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const result = await prisma.technician.findFirst({
      where: { email: email, pass: password },
    });
    if (result != null) {
      console.log(result);
      return NextResponse.json(
        { message: "Login realizado com sucesso!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
