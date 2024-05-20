import { Router } from "express";
import {
  crearServicio,
  eliminarServicio,
  getServicio,
  getUnServicio,
  updateServicio,
} from "../controllers/servicio.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";

//path /api/v1/servicio

const router = Router();

router.post(
  "/",
  validateJWT,
  [
    check("nombre", "El nombre del servicio es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion del servicio es obligatorio").not().isEmpty(),
    check("apertura", "El horario de apertura del servicio es obligatorio").not().isEmpty(),
    check("cierre", "El horario de cierre del servicio es obligatorio").not().isEmpty(),
    check("dias", "Los dias del servicio es obligatorio").not().isEmpty(),
    check("encargado", "El encargado del servicio es obligatorio").not().isEmpty(),
    check("estado", "El estado del servicio es obligatorio").not().isEmpty(),
    validateFields,
  ],
  crearServicio
);
router.get("/", getServicio);
router.get("/:id", getUnServicio);
router.put("/:id", updateServicio);
router.delete("/:id", eliminarServicio);

export default router;
