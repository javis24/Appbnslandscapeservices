import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Task } from "@/lib/models/Task";
import { User } from "@/lib/models/User";
import "@/lib/models/associations";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const task = await Task.findByPk(params.id, {
      include: [{ model: User, as: "assignedTo", attributes: ["id", "name", "email", "role"] }],
    });

    if (!task) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener la tarea" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    const task = await Task.findByPk(id);
    if (!task) {
      return NextResponse.json({ error: "Task no encontrada" }, { status: 404 });
    }

    const updatable = {};
    ["title","description","dueTime","status","userId","clientId","serviceId"].forEach(k=>{
      if (body[k] !== undefined) updatable[k] = body[k];
    });
    // GPS
    if (body.latitude !== undefined && body.longitude !== undefined) {
      updatable.latitude = body.latitude;
      updatable.longitude = body.longitude;
      updatable.locationUpdatedAt = new Date();
    }

    await task.update(updatable);
    return NextResponse.json(task);
  } catch (e) {
    console.error("PUT /tasks/[id] error:", e);
    return NextResponse.json({ error: "Error al actualizar tarea" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const task = await Task.findByPk(params.id);
    if (!task) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
    }

    await task.destroy();
    return NextResponse.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar la tarea" }, { status: 500 });
  }
}
