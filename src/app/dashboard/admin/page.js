"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";

const STATUS_COLUMNS = [
  { key: "pendiente", label: "Pendiente", color: "border-blue-500" },
  { key: "en espera", label: "En Espera", color: "border-red-500" },
  { key: "en progreso", label: "En Progreso", color: "border-yellow-500" },
  { key: "en revisión", label: "En Revisión", color: "border-orange-500" },
  { key: "completada", label: "Completado", color: "border-green-500" },
];

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [services, setServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueTime: "",
    status: "pendiente",
    userId: "",
    clientId: "",
  });

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLEADO",
  });

  const [clientForm, setClientForm] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleTaskEdit = (field, value) => {
  setSelectedTask({ ...selectedTask, [field]: value });
};


  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchServices();
    fetchClients();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

const fetchServices = async () => {
  try {
    const res = await fetch("/api/services");
    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Error al obtener servicios:", text);
      setServices([]); // Evita que rompa el map
      return;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      setServices(data);
    } else {
      console.warn("⚠ /api/services no devolvió un array:", data);
      setServices([]);
    }
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    setServices([]);
  }
};


  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      if (!res.ok) throw new Error("Error al obtener clientes");
      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      setClients([]);
    }
  };

const [serviceForm, setServiceForm] = useState({
  serviceName: "",
  description: "",
  estimatedTime: "",
  status: "pendiente",
});


const handleUpdateTask = async (task) => {
  try {
    if (task.status === "completada") {
      const confetti = document.createElement("div");
      confetti.innerHTML = "🎉";
      confetti.className = "fixed top-10 right-10 text-4xl animate-bounce";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 2000);
    }
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Error al actualizar tarea");
    fetchTasks();
    setSelectedTask(null);
  } catch (err) {
    console.error(err);
  }
};


const handleDeleteTask = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;
  try {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
    setSelectedTask(null);
  } catch (err) {
    console.error(err);
  }
};




const handleServiceChange = (e) =>
  setServiceForm({ ...serviceForm, [e.target.name]: e.target.value });


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleUserChange = (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value });
  const handleClientChange = (e) =>
  setClientForm({ ...clientForm, [e.target.name]: e.target.value });

  // Crear tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

     if (!res.ok) {
  const text = await res.text();
  console.error("❌ Error en /api/tasks:", text);
  throw new Error(`Error ${res.status}`);
}

const data = await res.json();
      setShowTaskModal(false);
      fetchTasks();
      setForm({ title: "", description: "", dueTime: "", status: "pendiente", userId: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // Crear colaborador
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      });

      if (!res.ok) throw new Error("Error al crear empleado");
      setShowUserModal(false);
      fetchUsers();
      setUserForm({ name: "", email: "", password: "", role: "EMPLEADO" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleServiceSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceForm),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Error al crear servicio:", text);
      return;
    }

    const data = await res.json();
    console.log("✅ Servicio creado:", data);
    fetchServices(); // refresca la lista
    setShowServiceModal(false);
    setServiceForm({ serviceName: "", description: "", estimatedTime: "", status: "pendiente" });
  } catch (error) {
    console.error("Error al guardar servicio:", error);
  }
};

const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm),
      });
      if (!res.ok) throw new Error("Error al crear cliente");
      fetchClients();
      setShowClientModal(false);
      setClientForm({ fullName: "", address: "", phone: "", email: "" });
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };




  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">👋 Panel del Administrador</h1>
          <p className="text-gray-400">Organiza y asigna tareas a tu equipo fácilmente.</p>
        </div>
        <FaUserCircle
        size={40}
        className="text-red-400 cursor-pointer hover:text-red-600 transition"
        title="Cerrar sesión"
        onClick={async () => {
          if (confirm("¿Deseas cerrar sesión?")) {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/login"; // 🔹 Redirige al login o página de inicio
          }
        }}
      />

      </div>

      {/* Botones */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowTaskModal(true)}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
        >
          Agregar Tarea
        </button>
        <button
          onClick={() => setShowUserModal(true)}
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg font-semibold"
        >
          Colaboradores
        </button>
        <button
            onClick={() => setShowServiceModal(true)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
          >
            Nuevo Servicio
          </button>
             <button onClick={() => setShowClientModal(true)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold">
          Agregar Cliente
        </button>

        
      </div>

      {/* Tablero de tareas */}
      <h2 className="text-2xl font-bold mb-4">Tareas</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {STATUS_COLUMNS.map((col) => (
          <div key={col.key} className="bg-[#1e293b] p-3 rounded-xl shadow-md">
            <h3 className={`text-center font-semibold mb-3 border-b-4 ${col.color} pb-1`}>
              {col.label}
            </h3>

            <div className="min-h-[120px] border border-dashed border-gray-600 p-2 rounded-md text-center text-gray-400 text-sm mb-3">
              Soltar tarea aquí
            </div>

            {tasks
  .filter((task) => task.status === col.key)
  .map((task) => (
    <div
      key={task.id}
      onClick={() => setSelectedTask(task)}
      className="bg-purple-700/50 p-3 rounded-lg hover:scale-[1.02] transition-transform cursor-pointer relative group mb-2"
    >
      <h4 className="font-bold text-white text-sm">{task.title}</h4>
      <p className="text-gray-300 text-xs mb-2">{task.description}</p>
      <p className="text-gray-400 text-xs">
        ⏰ {task.dueTime} <br /> 👤 {task.assignedTo?.name || "Sin asignar"}
      </p>
      {/* Indicador visual */}
      <div
        className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
          task.status === "completada"
            ? "bg-green-400"
            : task.status === "en progreso"
            ? "bg-yellow-400"
            : "bg-gray-400"
        }`}
      ></div>
    </div>
))}


          </div>
        ))}
      </div>

      {/* Modal Agregar Tarea */}
      {showTaskModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-center">Asignar nueva tarea</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="title" placeholder="Título" value={form.title} onChange={handleChange} className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white" required />
              <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white" />
              <input type="time" name="dueTime" value={form.dueTime} onChange={handleChange} className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white" required />
              <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white">
                {STATUS_COLUMNS.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
               <select
                    name="serviceId"
                    value={form.serviceId}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
                  >
                    <option value="">Seleccionar tipo de servicio</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.serviceName} — {s.estimatedTime}
                      </option>
                    ))}
                  </select>
              <select name="userId" value={form.userId} onChange={handleChange} className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white" required>
                <option value="">Seleccionar empleado</option>
                {users.filter((u) => u.role === "EMPLEADO").map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
              <select
                  name="clientId"
                  value={form.clientId}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
                >
                  <option value="">Seleccionar cliente</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} — {c.phone}
                    </option>
                  ))}
                </select>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowTaskModal(false)} className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white">Cancelar</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Agregar Colaborador */}
      {showUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">

            <h2 className="text-xl font-bold mb-4 text-center">Agregar Colaborador</h2>
            <form onSubmit={handleUserSubmit} className="space-y-3">
              <input type="text" name="name" placeholder="Nombre completo" value={userForm.name} onChange={handleUserChange} className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white" required />
              <input type="email" name="email" placeholder="Correo electrónico" value={userForm.email} onChange={handleUserChange} className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white" required />
              <input type="password" name="password" placeholder="Contraseña" value={userForm.password} onChange={handleUserChange} className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white" required />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowUserModal(false)} className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white">Cancelar</button>
                <button type="submit" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-white">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showServiceModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">

      <h2 className="text-xl font-bold mb-4 text-center">Registrar nuevo servicio</h2>
      <form
        onSubmit={handleServiceSubmit}
        className="space-y-3"
      >
        <input
          type="text"
          name="serviceName"
          placeholder="Nombre del servicio"
          value={serviceForm.serviceName}
          onChange={handleServiceChange}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={serviceForm.description}
          onChange={handleServiceChange}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
        />
        <input
          type="text"
          name="estimatedTime"
          placeholder="Tiempo estimado (ej: 2 horas)"
          value={serviceForm.estimatedTime}
          onChange={handleServiceChange}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
          required
        />
        <select
          name="status"
          value={serviceForm.status}
          onChange={handleServiceChange}
          className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => setShowServiceModal(false)}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
)}
  {/* Modal Cliente */}
      {showClientModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">

            <h2 className="text-xl font-bold mb-4 text-center">Registrar nuevo cliente</h2>
            <form onSubmit={handleClientSubmit} className="space-y-3">
              <input
                type="text"
                name="fullName"
                placeholder="Nombre completo"
                value={clientForm.fullName}
                onChange={handleClientChange}
                className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Domicilio completo"
                value={clientForm.address}
                onChange={handleClientChange}
                className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Número de teléfono"
                value={clientForm.phone}
                onChange={handleClientChange}
                className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={clientForm.email}
                onChange={handleClientChange}
                className="w-full p-2 rounded bg-[#0f172a] border border-gray-600 text-white"
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowClientModal(false)} className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white">
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedTask && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-2xl shadow-lg w-full max-w-md relative animate-fadeIn">
      <button
        onClick={() => setSelectedTask(null)}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        ✖
      </button>
      <h2 className="text-xl font-bold mb-4 text-center">
        🧾 Editar tarea
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          value={selectedTask.title}
          onChange={(e) => handleTaskEdit("title", e.target.value)}
          className="w-full bg-[#0f172a] border border-gray-600 rounded p-2 text-white"
        />
        <textarea
          value={selectedTask.description || ""}
          onChange={(e) => handleTaskEdit("description", e.target.value)}
          className="w-full bg-[#0f172a] border border-gray-600 rounded p-2 text-white"
        />
        <input
          type="time"
          value={selectedTask.dueTime}
          onChange={(e) => handleTaskEdit("dueTime", e.target.value)}
          className="w-full bg-[#0f172a] border border-gray-600 rounded p-2 text-white"
        />

        {/* Barra de progreso */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full ${
              selectedTask.status === "completada"
                ? "bg-green-500 w-full"
                : selectedTask.status === "en progreso"
                ? "bg-yellow-500 w-2/3"
                : "bg-blue-500 w-1/3"
            }`}
          ></div>
        </div>

        <select
          value={selectedTask.status}
          onChange={(e) => handleTaskEdit("status", e.target.value)}
          className="w-full bg-[#0f172a] border border-gray-600 rounded p-2 text-white"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleDeleteTask(selectedTask.id)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            🗑 Eliminar
          </button>
          <div className="flex justify-around my-3">
            {["pendiente", "en progreso", "completada"].map((st) => (
              <button
                key={st}
                onClick={() => handleTaskEdit("status", st)}
                className={`px-3 py-1 rounded-full text-xs ${
                  selectedTask.status === st
                    ? "bg-green-500 text-white"
                    : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleUpdateTask(selectedTask)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            💾 Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
