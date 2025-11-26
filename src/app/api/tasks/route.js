import { NextResponse } from "next/server";
import { Task } from "@/lib/models/Task";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { Service } from "@/lib/models/Service";
import "@/lib/models/associations";

// 🔹 GET: obtener todas las tareas
export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.findAll({
      include: [
        { model: User, as: "assignedTo", attributes: ["id", "name", "email", "role"] },
        { model: Service, as: "service", attributes: ["id", "serviceName", "estimatedTime"] },
      ],
      order: [["id", "DESC"]],
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("❌ Error GET /tasks:", error);
    return NextResponse.json({ error: "Error al obtener tareas" }, { status: 500 });
  }
}

// 🔹 POST: crear nueva tarea
export async function POST(req) {
  try {
    await connectDB();
    const { title, description, dueTime, status, userId, serviceId, clientId  } = await req.json();

    if (!title || !dueTime || !userId) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const newTask = await Task.create({
      title,
      description,
      dueTime,
      status: status || "pendiente",
      userId,
      serviceId: serviceId || null,
      clientId: clientId || null,
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("❌ Error POST /tasks:", error);
    return NextResponse.json({ error: "Error al crear tarea" }, { status: 500 });
  }
}
