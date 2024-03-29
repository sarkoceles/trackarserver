import express from "express";
// import { pool } from './db.js'
import { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "./config.js";

import mysql from 'mysql2';

const app = express();

// Configurar el middleware para manejar solicitudes POST
app.use(express.text());

// const conexion = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });
//  console.log(conexion);
// conexion.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     return;
//   }
//   console.log('Conexión a la base de datos MySQL establecida correctamente');
// });



app.post("/", async (req, res) => {
  // Guardar los datos recibidos en la base de datos
  const datos = req.query;
  // Convertir el timestamp a una fecha legible en UTC para Ciudad de México
  const fecha = new Date(parseInt(datos.timestamp) * 1000).toLocaleString(
    "en-US",
    { timeZone: "America/Mexico_City", timeZoneName: "short" }
  );

  // Formatear la fecha en el formato deseado: AAAA:MM:DD:HH:MM:SS
  const partesFecha = fecha.split(/[ ,]+/);
  const [mes, dia, año] = partesFecha[0].split("/");
  const [hora, minutos, segundos] = partesFecha[1].split(":");
  const dateUTC = `${año.padStart(4, "0")}:${mes.padStart(
    2,
    "0"
  )}:${dia.padStart(2, "0")}:${hora.padStart(2, "0")}:${minutos.padStart(
    2,
    "0"
  )}:${segundos.padStart(2, "0")}`;

  // console.log(fecha);
  // console.log(dateUTC);

    // const result = await pool.query(`
    // INSERT INTO tabla_datos_trackar 
    //   (timestamp, dateUTC, lat, lon, speed, bearing, altitude, accuracy, batt, id_trackar) 
    // VALUES 
    //   (datos,timestamp, dateUTC, datos.lat, datos.lon, datos.speed, datos.bearing, datos.altitude, datos.accuracy, datos.batt, datos.id)
    // `) 

// DB_HOST 
// DB_USER 
// DB_PASSWORD
// DB_NAME
// DB_PORT



const values = {
  id :datos.id,
  timestamp:datos.timestamp,
  dateUTC:dateUTC,
  lat:datos.lat,
  lon:datos.lon,
  speed:datos.speed,
  bearing:datos.bearing,
  altitude: datos.altitude,
  accuracy:datos.accuracy,
  batt:datos.batt
};



  console.log(values);
// console.log(result);

  


  res.status(200).send('Datos recibidos y guardados por el servidor');

});

// app.get('/ping', async (req, res) => {
//   const [result] = await pool.query(`SELECT "hello world" as RESULT`);
//   res.json(result[0])
// })
// Iniciar el servidor para que escuche en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});

// app.listen(PORT)
// console.log("Server on port", PORT);
// console.log("DB_HOST: ",process.env.DB_HOST);
// console.log("DB_USER: ",process.env.DB_USER);
// console.log("DB_PASSWORD: ",process.env.DB_PASSWORD);
// console.log("DB_NAME: ",process.env.DB_NAME);
// console.log("DB_PORT: ",process.env.DB_PORT);


