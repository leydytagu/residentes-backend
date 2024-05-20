import { Model, Schema, model } from "mongoose";

const ReservaSchema = new Schema({
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

  residente: { type: Schema.Types.ObjectId, ref: "residente", required: true },
  servicio: { type: Schema.Types.ObjectId, ref: "servicio", required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "residente", required: true },
});

export const ReservaModel: Model<any> = model("reserva", ReservaSchema);
