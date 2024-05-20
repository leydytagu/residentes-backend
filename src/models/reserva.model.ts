import { Model, Schema, model } from "mongoose";

const ReservaSchema = new Schema({
  residente: {
    type: String,
    required: true,
  },
  servicio: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  comentarios: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  usuario: { type: Schema.Types.ObjectId, ref: "residente", required: true },
});

export const ReservaModel: Model<any> = model("reserva", ReservaSchema);
