import express from 'express'
import {PORT} from './config.js'


const app = express()

// Configurar el middleware para manejar solicitudes POST
app.use(express.text());
app.post('/', (req, res) => {
    // Guardar los datos recibidos en la base de datos
    const datos = req.query;
     // Convertir el timestamp a una fecha legible en UTC para Ciudad de México
     const fecha = new Date(parseInt(datos.timestamp) * 1000).toLocaleString('en-US', { timeZone: 'America/Mexico_City', timeZoneName: 'short' });
  
     // Formatear la fecha en el formato deseado: AAAA:MM:DD:HH:MM:SS
     const partesFecha = fecha.split(/[ ,]+/);
     const [mes, dia, año] = partesFecha[0].split('/');
     const [hora, minutos, segundos] = partesFecha[1].split(':');
     const dateUTC = `${año.padStart(4, '0')}:${mes.padStart(2, '0')}:${dia.padStart(2, '0')}:${hora.padStart(2, '0')}:${minutos.padStart(2, '0')}:${segundos.padStart(2, '0')}`;
   
  
  // console.log(fecha);
  console.log(dateUTC);
  // console.log(req.query);
  
  const query = `
  INSERT INTO tabla_datos 
    (id, timestamp, dateUTC, lat, lon, speed, bearing, altitude, accuracy, batt) 
  VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
   
  const values = [
      datos.id,
      datos.timestamp,
      dateUTC,
      datos.lat,
      datos.lon,
      datos.speed,
      datos.bearing,
      datos.altitude,
      datos.accuracy,
      datos.batt
    ];
  
    conexion.query(query, values, (error, resultados) => {
      if (error) {
        console.error('Error al guardar datos en la base de datos:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }
      // console.log('Datos guardados en la base de datos:', resultados);
      // Enviar una respuesta al cliente
      res.send('Datos recibidos y guardados por el servidor');
    });
  });
  
  // Iniciar el servidor para que escuche en el puerto especificado
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
  });



// app.listen(PORT)
console.log('Server on port', PORT)