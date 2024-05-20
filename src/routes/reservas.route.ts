import { Router } from "express";
import {
  crearReserva,
  eliminarReserva,
  getReservas,
  getUnaReserva,
  updateReserva,
} from "../controllers/reserva.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { check } from "express-validator";

const router = Router();

router.post(
  "/",
  validateJWT,
  [check("residente", "El residente es obligatoria").not().isEmpty()],
  [check("servicio", "El servicio es obligatoria").not().isEmpty()],
  [check("hora", "La ra es obligatoria").not().isEmpty()],
  crearReserva
);
router.get("/", getReservas);
router.get("/:id", getUnaReserva);
router.put("/:id", updateReserva);
router.delete("/:id", eliminarReserva);

export default router;
