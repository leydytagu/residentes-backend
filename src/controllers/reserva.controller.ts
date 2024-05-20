import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/validate-jwt";
import { ReservaModel } from "../models/reserva.model";
import ResidenteModel from "../models/residente.model";
import ServicioModel from "../models/servicio.model";

export const crearReserva = async (req: CustomRequest, res: Response) => {
  const id = req._id;
  const body = req.body;

  const { residente, servicio } = body;

  try {
    const existResidente = await ResidenteModel.findOne({ _id: residente });

    if (!existResidente) {
      return res.status(400).json({
        ok: false,
        msg: `No existe un residente con ese identificador: ${residente}`,
      });
    }
  } catch (error) {}

  try {
    const existServicio = await ServicioModel.findOne({ _id: servicio });

    if (!existServicio) {
      return res.status(400).json({
        ok: false,
        msg: `No existe un servicio con ese identificador: ${servicio}`,
      });
    }
  } catch (error) {}

  try {
    const reserva = new ReservaModel({
      usuario: id,
      ...body,
    });
    const newReserva = await reserva.save();

    res.status(200).json({
      ok: true,
      msg: "Reserva creada",
      reserva: newReserva,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear la reserva, comuníquese con el administrador",
    });
  }
};

export const getReservas = async (req: Request, res: Response) => {
  try {
    const reservas = await ReservaModel.find().populate({
      path: "usuario",
      select: "nombre email",
    });
    res.json({
      ok: true,
      reservas,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar las reservas",
    });
  }
};

export const getUnaReserva = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const usuario = await ReservaModel.findById({ _id: id });
    res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los reservas",
    });
  }
};
export const updateReserva = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const reservaActualizada = await ReservaModel.findByIdAndUpdate(id, body, {
      new: true,
      id,
      body,
    });
    res.status(200).json({
      ok: true,
      msg: "reserva actualizada",
      usuario: reservaActualizada,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el reserva",
    });
  }
};

export const eliminarReserva = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const reservaEliminada = await ReservaModel.findByIdAndDelete({
      _id: id,
    });
    res.status(200).json({
      ok: true,
      msg: "reserva eliminado",
      usuario: reservaEliminada,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al eliminar la reserva",
    });
  }
};
