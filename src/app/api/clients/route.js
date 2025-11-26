import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Client } from "@/lib/models/Client";

// ✅ Obtener todos los clientes
export async function GET() {
  try {
    await connectDB();
    const clients = await Client.findAll({ order: [["id", "DESC"]] });
    return NextResponse.json(clients);
  } catch (error) {
    console.error("❌ Error al obtener clientes:", error);
    return NextResponse.json({ error: "Error al obtener clientes" }, { status: 500 });
  }
}

// ✅ Crear nuevo cliente
export async function POST(req) {
  try {
    await connectDB();
    const { fullName, address, phone, email } = await req.json();

    if (!fullName || !address || !phone || !email) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const newClient = await Client.create({ fullName, address, phone, email });
    return NextResponse.json(newClient);
  } catch (error) {
    console.error("❌ Error al crear cliente:", error);
    return NextResponse.json({ error: "Error al crear cliente" }, { status: 500 });
  }
}
