import { Router } from "express";
import {
  crearResidente,
  eliminarResidente,
  getUnResidente,
  getResidentes,
  updateResidente,
} from "../controllers/residente.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import {
  cambioContrasena,
  login,
  olvidoContrasena,
  renewToken,
} from "../controllers/auth.controller";
import { validateJWT, validateJWTPass } from "../middlewares/validate-jwt";

//path /api/v1/usuario2

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "El password de documento es obligatorio")
      .not()
      .isEmpty(),
    check("email", "El email no es válido").isEmail(),
    validateFields,
  ],
  login
);

router.post(
  "/olvidocontrasena",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("numeroDocumento", "El número de documento es obligatorio")
      .not()
      .isEmpty(),
    validateFields,
  ],
  olvidoContrasena
);

router.put(
  "/cambiocontrasena",
  validateJWTPass,
  [check("password", "El password es obligatorio").not().isEmpty()],
  validateFields,
  cambioContrasena
);

router.get("/", validateJWT, renewToken);

export default router;
