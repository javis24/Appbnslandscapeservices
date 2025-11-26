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
    const { title, description, dueTime, status, userId } = await req.json();

    const task = await Task.findByPk(params.id);
    if (!task) {
      return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueTime = dueTime || task.dueTime;
    task.status = status || task.status;
    task.userId = userId || task.userId;

    await task.save();

    return NextResponse.json({ message: "Tarea actualizada correctamente", task });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar la tarea" }, { status: 500 });
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
