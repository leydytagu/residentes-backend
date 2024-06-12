//CONTACTO
// 1. Contacto

import { Request, Response } from "express";
import { sendEmail } from "../helpers/email";
import path from "path";
import fs from "fs";
import { config } from "../config/config";

const environment = config[process.env.NODE_ENV || "desarrollo"];

export const contacto = async (req: Request, resp: Response) => {
  const { residente } = req.body;

  try {
    const templatePath = path.join(__dirname, "../templates/contacto.html");

    const emailTemplate = fs.readFileSync(templatePath, "utf8");

    const personalizarEmail = emailTemplate
      .replace("{{name}}", "Tatiana")
      .replace("{{token}}", "");

    sendEmail(
      "leydy.tarazona@gmail.com",
      "Contacto de usuario",
      personalizarEmail
    );

    resp.status(200).json({
      ok: true,
      msg: "Proceso exitoso",
      usuario: residente,
    });
  } catch (error) {
    console.error(error);
    resp.status(400).json({
      ok: false,
      msg: "No se logró validar sus datos",
    });
  }
};
