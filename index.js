import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet';
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./src/routes/productsRoutes.js";


// Inicializaciones
const app = express();
dotenv.config();

// Detectar entorno
const isProduction = process.env.NODE_ENV === "production";

// Configurar origen permitido según entorno
const allowedOrigin = isProduction
  ? process.env.ALLOWED_ORIGIN_PROD
  : process.env.ALLOWED_ORIGIN_DEV;

// Middleware de CORS dinámico
const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para la seguridad básica de la app en producción
 
if (process.env.NODE_ENV === 'production') {
  app.use(helmet()); 
}

// Obtener ruta absoluta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//endpoint raíz
app.get('/', (req, res) => { 
res.send('Hola, mundo desde Express!'); 
}); 

 // Rutas de la API
app.use("/api", productRoutes);

// Middleware 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada o recurso inválido." });
});

// Middleware global para errores internos
app.use((err, req, res, next) => {
  console.error("Error interno:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor en ${isProduction ? "Producción" : "Desarrollo"} escuchando en http://localhost:${PORT}`);
});
