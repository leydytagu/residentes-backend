import { Router } from "express";
import { check } from "express-validator";
import {
  crearResidente,
  eliminarResidente,
  getUnResidente,
  getResidentes,
  updateResidente,
} from "../controllers/residente.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { validateFields } from "../middlewares/validate-fields";

//path /api/v1/residente

const router = Router();

router.post(
  "/",
  // validateJWT,
  [
    (check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validateFields),
  ],
  [
    (check("apellido", "El apellido es obligatorio").not().isEmpty(),
    validateFields),
  ],
  [
    (check("apellido", "El apellido es obligatorio").not().isEmpty(),
    validateFields),
  ],
  [
    (check("identificacion", "La identificación es obligatoria")
      .not()
      .isEmpty(),
    validateFields),
  ],
  [
    (check("celular", "El celular es obligatorio").not().isEmpty(),
    validateFields),
  ],
  [check("correo", "El correo es obligatorio").isEmail(), validateFields],
  [
    check("apartamento", "El apartamento es obligatorio").not().isEmpty(),
    validateFields,
  ],
  crearResidente
);
router.get("/", getResidentes);
router.get("/:id", validateJWT, getUnResidente);
router.put("/:id", validateJWT, updateResidente);
router.delete("/:id", validateJWT, eliminarResidente);

export default router;
