import { Model, Schema, model, Types } from "mongoose";

interface ServicioInterface {
  nombre: string;
  descripcion: string;
  apertura: string;
  cierre: string;
  dias: string;
  encargado: string;
  estado: boolean;

  createdAt: Date;
  usuario: Types.ObjectId;
}

// Crear los esquemas
const ServicioSchema = new Schema<ServicioInterface>({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  apertura: {
    type: String,
    required: true,
  },
  cierre: {
    type: String,
    required: true,
  },
  dias: {
    type: String,
    required: true,
  },
  encargado: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  usuario: { type: Schema.Types.ObjectId, ref: "residente", required: true },
});

const ServicioModel: Model<ServicioInterface> = model<ServicioInterface>(
  "servicio",
  ServicioSchema
);

export default ServicioModel;
