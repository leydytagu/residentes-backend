import { Request, Response } from "express";
import ServicioModel from "../models/servicio.model";
import { CustomRequest } from "../middlewares/validate-jwt";

export const crearServicio = async (req: CustomRequest, res: Response) => {
  const { body } = req;
  const id = req._id;
  console.log("id usuario", id);

  try {
    const newServicio = new ServicioModel({
      usuario: id,
      ...body,
    });

    const servicioCreado = await newServicio.save();

    res.status(200).json({
      ok: true,
      msg: "Servicio creado satisfactoriamente",
      servicio: servicioCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear el servicio, comuniquese con el administrador",
    });
  }
};

export const getServicio = async (req: Request, res: Response) => {
  try {
    const servicios = await ServicioModel.find().populate({
      path: "usuario",
      select: "nombre email",
    });
    res.json({
      ok: true,
      servicios,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los servicios",
    });
  }
};

export const getUnServicio = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const servicio = await ServicioModel.findById({ _id: id });
    res.status(200).json({
      ok: true,
      servicio,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los servicios",
    });
  }
};
export const updateServicio = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const servicioActualizado = await ServicioModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        id,
        body,
      }
    );
    res.status(200).json({
      ok: true,
      msg: "Servicio actualizado",
      usuario: servicioActualizado,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el servicio",
    });
  }
};

export const eliminarServicio = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const servicioEliminado = await ServicioModel.findByIdAndDelete({
      _id: id,
    });
    res.status(200).json({
      ok: true,
      msg: "Servicio eliminado",
      usuario: servicioEliminado,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al eliminar el servicio",
    });
  }
};
