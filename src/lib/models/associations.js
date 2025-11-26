import { User } from "./User.js";
import { Task } from "./Task.js";
import { Service } from "./Service.js";
import { Client } from "./Client.js";


User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "userId", as: "assignedTo" });


User.hasMany(Service, { foreignKey: "userId", as: "services" });
Service.belongsTo(User, { foreignKey: "userId", as: "employee" });


Service.hasMany(Task, { foreignKey: "serviceId", as: "tasks" });
Task.belongsTo(Service, { foreignKey: "serviceId", as: "service" });


Client.hasMany(Task, { foreignKey: "clientId", as: "tasks" });
Task.belongsTo(Client, { foreignKey: "clientId", as: "client" });

