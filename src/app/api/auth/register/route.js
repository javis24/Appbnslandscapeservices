

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    // 🔹 Conexión a la BD
    await connectDB();

    // 🔹 Leer datos del body
    const { name, email, password, role } = await req.json();

    // 🔹 Validar campos requeridos
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    // 🔹 Verificar si el usuario ya existe
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: "El email ya está registrado." },
        { status: 409 }
      );
    }

    // 🔹 Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Crear usuario nuevo
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "ADMIN" ? "ADMIN" : "EMPLEADO", // Seguridad extra
    });

    // 🔹 Respuesta sin incluir la contraseña
    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    return NextResponse.json(
      {
        message: "✅ Usuario registrado exitosamente",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error en register:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
