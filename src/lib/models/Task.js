// lib/models/Task.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Task = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  dueTime: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM(
      "pendiente",
      "en espera",
      "en progreso",
      "en revisión",
      "completada",
      "cancelada"
    ),
    defaultValue: "pendiente",
  },
  clientId: { type: DataTypes.INTEGER, allowNull: true },
  serviceId: { type: DataTypes.INTEGER, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: true },
  latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
  longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
  locationUpdatedAt: { type: DataTypes.DATE, allowNull: true },
});
