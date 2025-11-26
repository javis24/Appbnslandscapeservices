import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Service = sequelize.define("service", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  estimatedTime: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pendiente", "en progreso", "completado", "cancelado"),
    defaultValue: "pendiente",
  },
});
