import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    await connectDB();
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
  }
}
