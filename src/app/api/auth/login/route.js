import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/db";
import { signJwt } from "@/lib/jwt";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ where: { email } });
    if (!user)
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });

    const token = signJwt({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    const res = NextResponse.json({
      message: "Login exitoso",
      role: user.role,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
