import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import error from "./middlewares/error.js";
import rAuth from "./routes/rAuth.js";
import rBooking from "./routes/rBooking.js";
import rSpaces from "./routes/rSpaces.js";
import rAdmin from "./routes/rAdmin.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
import { limiter } from "./middlewares/rateLimiter.js";
app.use(limiter);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

import { connectRedis } from "./config/redis.js";
console.log('Current NODE_ENV:', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'test') {
    connectRedis();
}

import { swaggerDocs } from "./config/swagger.js";
swaggerDocs(app, port);

app.use(rAuth); //Manejador de Rutas de Autenticacion
app.use(rSpaces); //Manejador de Rutas de Espacios
app.use(rBooking); //Manejador de Rutas de Reservas
app.use(rAdmin); //Manejador de Rutas de Admin
app.use(error.e404); //Manejador de Errores

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Servidor Encendido en: http://localhost:${port}`);
    })
}

export default app;