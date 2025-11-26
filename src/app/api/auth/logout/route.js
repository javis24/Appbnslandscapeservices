import { NextResponse } from "next/server";

export async function POST() {
  try {

    const res = NextResponse.json({ message: "Sesión cerrada correctamente" });
    res.cookies.set("token", "", { path: "/", expires: new Date(0) }); // 🔹 elimina el JWT
    return res;
  } catch (error) {
    console.error("❌ Error al cerrar sesión:", error);
    return NextResponse.json({ error: "Error al cerrar sesión" }, { status: 500 });
  }
}
