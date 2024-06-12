import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { check } from "express-validator";
import { contacto } from "../controllers/contacto.controller";

const router = Router();

router.post(
  "/",
  validateJWT,
  [check("residente", "El residente es obligatoria").not().isEmpty()],
  [check("asunto", "El asunto es obligatoria").not().isEmpty()],
  [check("mensaje", "El mensaje es obligatoria").not().isEmpty()],
  contacto
);

export default router;
