import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import { User } from "@/lib/models/User";
import { Task } from "@/lib/models/Task";
import "@/lib/models/associations"; 

// ✅ GET: obtener todos los servicios
export async function GET() {
  try {
    await connectDB();

    const services = await Service.findAll({
      include: [
        { model: User, as: "employee", attributes: ["id", "name", "email", "role"] },
        { model: Task, as: "tasks", attributes: ["id", "title", "status", "dueTime"] },
      ],
      order: [["id", "DESC"]],
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("❌ Error GET /services:", error);
    return NextResponse.json({ error: "Error al obtener servicios" }, { status: 500 });
  }
}

// ✅ POST: crear nuevo servicio
export async function POST(req) {
  try {
    await connectDB();
    const { serviceName, description, estimatedTime, userId, taskId, status } = await req.json();

    if (!serviceName || !estimatedTime) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const newService = await Service.create({
      serviceName,
      description,
      estimatedTime,
      status: status || "pendiente",
      userId: userId || null,
      taskId: taskId || null,
    });

    return NextResponse.json(newService);
  } catch (error) {
    console.error("❌ Error POST /services:", error);
    return NextResponse.json({ error: "Error al crear servicio" }, { status: 500 });
  }
}
