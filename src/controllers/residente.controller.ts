import { Request, Response } from "express";
import ResidenteModel from "../models/residente.model";
import bcrypt from "bcryptjs";

export const crearResidente = async (req: Request, res: Response) => {
  const { body } = req;
  const {
    nombre,
    apellido,
    contrasena,
    identificacion,
    celular,
    correo,
    apartamento,
  } = body;

  try {
    const existEmail = await ResidenteModel.findOne({ correo: correo });

    if (existEmail) {
      return res.status(409).json({
        ok: false,
        msg: `Ya existe el email: ${correo}`,
      });
    }
  } catch (error) {}

  try {
    const newResidente = new ResidenteModel({
      ...body,
    });
    //Encriptar contrasena
    const salt = bcrypt.genSaltSync(10);
    newResidente.password = bcrypt.hashSync(contrasena, salt);

    const residenteCreado = await newResidente.save();

    res.status(200).json({
      ok: true,
      msg: "Residente creado satisfactoriamente",
      residente: residenteCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear el residente, comuniquese con el administrador",
    });
  }
};

export const getResidentes = async (req: Request, res: Response) => {
  try {
    const residentes = await ResidenteModel.find();
    res.json({
      ok: true,
      residentes,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los usurios",
    });
  }
};

export const getUnResidente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const residente = await ResidenteModel.findById({ _id: id });
    res.json({
      ok: true,
      residente,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los usurios",
    });
  }
};
export const updateResidente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const residenteActualizado = await ResidenteModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        id,
        body,
      }
    );
    res.json({
      ok: true,
      msg: "Residente actualizado",
      residente: residenteActualizado,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el residente",
    });
  }
};

export const eliminarResidente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const residenteEliminado = await ResidenteModel.findByIdAndDelete({
      _id: id,
    });
    res.json({
      ok: true,
      msg: "Residente eliminado",
      residente: residenteEliminado,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al eliminar el residente",
    });
  }
};
