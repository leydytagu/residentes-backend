import { Model, Schema, model } from "mongoose";

// crear los esquemas
const ResidenteSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  identificacion: {
    type: String,
    required: true,
  },
  celular: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  apartamento: {
    type: String,
    required: true,
  },

  password: { type: String, default: "12345" },
  rol: { type: String, default: "USER" },
  token: { type: String, require: false },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ResidenteModel: Model<any> = model("residente", ResidenteSchema);
export default ResidenteModel;
