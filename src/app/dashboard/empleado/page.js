"use client";

import { useEffect, useState, useMemo } from "react";
import { useTaskTracking } from "@/hooks/useTaskTracking";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function EmpleadoDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState("");
  const [activeTask, setActiveTask] = useState(null); // tarea que está en progreso

  // Tracking GPS cuando hay tarea activa en progreso
  const trackingEnabled =
    !!activeTask && activeTask.status === "en progreso";
  useTaskTracking(activeTask, trackingEnabled, {
    intervalMs: 120000, // cada 2 minutos
    useWatch: false,
  });

  // -------- Fetch usuario logueado --------
  const fetchCurrentUser = async () => {
    try {
      setLoadingUser(true);
      setError("");
      const res = await fetch("/api/auth/me"); 
      if (!res.ok) throw new Error("No se pudo obtener el usuario actual");
      const data = await res.json();
      setCurrentUser(data);
    } catch (err) {
      console.error(err);
      setError("Error al obtener tu sesión, vuelve a iniciar sesión.");
    } finally {
      setLoadingUser(false);
    }
  };

  // -------- Fetch tareas --------
  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      setError("");
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Error al obtener tareas");
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar tus tareas.");
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser]);

  // -------- Filtrar tareas del empleado --------
  const myTasks = useMemo(() => {
    if (!currentUser) return [];
    return tasks.filter((t) => {
      // puede venir como t.assignedTo.id o como t.userId
      const assignedId =
        t.assignedTo?.id ?? t.userId ?? null;
      return assignedId === currentUser.id;
    });
  }, [tasks, currentUser]);

  // Tareas de hoy (por fecha de creación)
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(
    () => today.toDateString(),
    [today]
  );

  const todaysTasks = useMemo(
    () =>
      myTasks.filter((t) => {
        if (!t.createdAt) return false;
        const d = new Date(t.createdAt);
        return d.toDateString() === todayStr;
      }),
    [myTasks, todayStr]
  );

  // Resumen
  const total = myTasks.length;
  const pendientes = myTasks.filter(
    (t) => t.status === "pendiente"
  ).length;
  const enProgreso = myTasks.filter(
    (t) => t.status === "en progreso"
  ).length;
  const completadas = myTasks.filter(
    (t) => t.status === "completada"
  ).length;

  // -------- Cambiar estado de tarea --------
  const updateTaskStatus = async (task, newStatus) => {
    try {
      const payload = {
        ...task,
        status: newStatus,
        userId: task.userId ?? task.assignedTo?.id ?? currentUser?.id ?? null,
        clientId: task.clientId ?? null,
        serviceId: task.serviceId ?? task.service?.id ?? null,
      };

      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("No se pudo actualizar la tarea");

      // Refrescar tareas en memoria
      const updated = await res.json().catch(() => null);

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id
            ? { ...t, ...payload, ...(updated || {}) }
            : t
        )
      );

      // Controlar tracking GPS
      if (newStatus === "en progreso") {
        setActiveTask({ ...task, status: "en progreso" });
      } else if (
        newStatus === "completada" ||
        newStatus === "cancelada"
      ) {
        setActiveTask(null);
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado de la tarea.");
    }
  };

  // -------- Render --------
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        Cargando tu panel...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
        <p className="mb-4">
          No se pudo identificar tu sesión. Vuelve a iniciar sesión.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
        >
          Ir al login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-6">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-400">
            Panel del Empleado
          </h1>
          <p className="text-gray-300">
            Hola, <span className="font-semibold">{currentUser.name}</span>.{" "}
            Aquí puedes ver las tareas que te asignaron hoy y actualizar su
            progreso.
          </p>
        </div>
        <div className="mt-3 md:mt-0 bg-[#0f172a] border border-green-700/40 rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-gray-400">
            Rol:
          </span>
          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300 border border-green-500/40">
            {currentUser.role}
          </span>
        </div>
      </header>

      {error && (
        <div className="mb-4 bg-red-900/40 border border-red-500/70 text-red-100 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Tarjetas de resumen */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#0f172a] rounded-xl p-4 border border-white/5">
          <p className="text-xs text-gray-400">Total de tareas</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-[#0f172a] rounded-xl p-4 border border-blue-500/40">
          <p className="text-xs text-gray-400">Pendientes</p>
          <p className="text-2xl font-bold text-blue-400">
            {pendientes}
          </p>
        </div>
        <div className="bg-[#0f172a] rounded-xl p-4 border border-yellow-500/40">
          <p className="text-xs text-gray-400">En progreso</p>
          <p className="text-2xl font-bold text-yellow-400">
            {enProgreso}
          </p>
        </div>
        <div className="bg-[#0f172a] rounded-xl p-4 border border-green-500/40">
          <p className="text-xs text-gray-400">Completadas</p>
          <p className="text-2xl font-bold text-green-400">
            {completadas}
          </p>
        </div>
      </section>

      {/* Tareas de hoy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          Tareas asignadas hoy
        </h2>

        {loadingTasks ? (
          <p className="text-gray-300 text-sm">
            Cargando tus tareas...
          </p>
        ) : todaysTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Hoy no tienes tareas nuevas asignadas.
          </p>
        ) : (
          <div className="space-y-3">
            {todaysTasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onChangeStatus={updateTaskStatus}
                isActive={activeTask?.id === t.id}
              />
            ))}
          </div>
        )}
      </section>

      {/* Todas las tareas */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          Todas tus tareas
        </h2>
        {loadingTasks ? (
          <p className="text-gray-300 text-sm">
            Cargando tus tareas...
          </p>
        ) : myTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Aún no tienes tareas asignadas.
          </p>
        ) : (
          <div className="space-y-3">
            {myTasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onChangeStatus={updateTaskStatus}
                isActive={activeTask?.id === t.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/**
 * Card de una tarea para el empleado
 */
function TaskCard({ task, onChangeStatus, isActive }) {
  const statusColors = {
    pendiente: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "en espera": "bg-red-500/20 text-red-300 border-red-500/40",
    "en progreso":
      "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    "en revisión":
      "bg-orange-500/20 text-orange-300 border-orange-500/40",
    completada:
      "bg-green-500/20 text-green-300 border-green-500/40",
    cancelada: "bg-gray-500/20 text-gray-300 border-gray-500/40",
  };

  const humanStatus = {
    pendiente: "Pendiente",
    "en espera": "En espera",
    "en progreso": "En progreso",
    "en revisión": "En revisión",
    completada: "Completada",
    cancelada: "Cancelada",
  };

  const createdLabel = task.createdAt
    ? new Date(task.createdAt).toLocaleString()
    : "";
  const clientName = task.client?.fullName || "";
  const serviceName = task.service?.serviceName || "";

  return (
    <article className="bg-[#020617] border border-white/10 rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold text-lg">
            {task.title || "Tarea sin título"}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-300 mt-1">
              {task.description}
            </p>
          )}
          <div className="mt-2 text-xs text-gray-400 space-y-1">
            {serviceName && (
              <p>
                <span className="font-semibold text-gray-300">
                  Servicio:
                </span>{" "}
                {serviceName}
              </p>
            )}
            {clientName && (
              <p>
                <span className="font-semibold text-gray-300">
                  Cliente:
                </span>{" "}
                {clientName}
              </p>
            )}
            {task.dueTime && (
              <p>
                <span className="font-semibold text-gray-300">
                  Hora programada:
                </span>{" "}
                {task.dueTime}
              </p>
            )}
            {createdLabel && (
              <p>
                <span className="font-semibold text-gray-300">
                  Fecha asignación:
                </span>{" "}
                {createdLabel}
              </p>
            )}
          </div>
        </div>

        <div
          className={`text-xs px-3 py-1 rounded-full border ${statusColors[task.status] || "bg-gray-500/20 text-gray-200 border-gray-500/40"}`}
        >
          {humanStatus[task.status] || task.status}
        </div>
      </div>

      {/* GPS */}
      {task.latitude && task.longitude && (
        <div className="mt-3 flex items-center gap-2 text-xs text-blue-300">
          <FaMapMarkerAlt className="text-blue-400" />
          <a
            href={`https://www.google.com/maps?q=${task.latitude},${task.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Ver última ubicación registrada
          </a>
        </div>
      )}

      {/* Botones de acción */}
      <div className="mt-4 flex flex-wrap gap-2">
        {task.status !== "en progreso" &&
          task.status !== "completada" && (
            <button
              onClick={() => onChangeStatus(task, "en progreso")}
              className="px-3 py-1 text-xs rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              ▶️ Iniciar
            </button>
          )}

        {task.status === "en progreso" && (
          <button
            onClick={() => onChangeStatus(task, "en revisión")}
            className="px-3 py-1 text-xs rounded-full bg-orange-500 hover:bg-orange-600 text-black font-semibold"
          >
            📤 Enviar a revisión
          </button>
        )}

        {task.status !== "completada" && (
          <button
            onClick={() => onChangeStatus(task, "completada")}
            className="px-3 py-1 text-xs rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold"
          >
            ✅ Marcar como completada
          </button>
        )}

        {isActive && (
          <span className="ml-auto text-[11px] px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
            📡 Enviando ubicación mientras está en progreso
          </span>
        )}
      </div>
    </article>
  );
}
