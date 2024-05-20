import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import cors from "cors";
import residenteRoutes from "./routes/residente.route";
import servicioRoutes from "./routes/servicio.route";
import reservasRoutes from "./routes/reservas.route";
import authRoutes from "./routes/auth.route";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    residente: "/api/v1/residente",
    servicio: "/api/v1/servicio",
    reserva: "/api/v1/reserva",
    login: "/api/v1/login",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000"; //Traer las variables de entorno

    //llamar a la base de datos
    dbConnection();

    //Metodos iniciales
    this.middlewares();

    //Rutas
    this.routes();
  }

  miPrimerApi() {
    this.app.get("/", (req: Request, res: Response) =>
      res.status(200).json({ msg: "Api funcionando" })
    );
  }

  middlewares() {
    this.app.use(cors());

    // Lectura de Body ()
    this.app.use(express.json());

    this.miPrimerApi();
  }

  routes(): void {
    this.app.use(this.apiPaths.residente, residenteRoutes);
    this.app.use(this.apiPaths.servicio, servicioRoutes);
    this.app.use(this.apiPaths.reserva, reservasRoutes);
    this.app.use(this.apiPaths.login, authRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo por el puerto", this.port);
    });
  }
}

export default Server;
