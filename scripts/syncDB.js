import { connectDB } from "../src/lib/db.js";
import { Client } from "../src/lib/models/Client.js";

await connectDB();
await Client.sync({ alter: true });
console.log("✅ Tabla 'clients' sincronizada correctamente");
process.exit();
