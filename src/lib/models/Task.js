import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
  clientId: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: "Clients",
    key: "id",
  },
},

});
