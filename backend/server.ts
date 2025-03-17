import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors()); // Habilitar CORS para el frontend de Vue
app.use(express.json()); // Para poder recibir JSON en el body de las peticiones

const db = mysql.createConnection({
  host: '192.168.233.199', // O la IP de tu servidor MySQL si no es local
  user: 'dani',
  password: '1234',
  database: 'practice-2-bd'
});

db.connect((err: Error | null) => {
  if (err) {
    console.error('Error de conexión a MySQL: ', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Ruta para obtener datos
app.post('/api/data', async (req: Request, res: Response): Promise<any> => {
  try {
    const { nombre, correo } = req.body;

    // Validar que los datos sean enviados
    if (!nombre || !correo) {
      return res.status(400).json({ error: 'Faltan parámetros: nombre o correo' });
    }

    // Realizar la consulta de inserción con await
    const results = await db.execute(
      'INSERT INTO Cliente (Nombre, Correo) VALUES (?, ?)', 
      [nombre, correo]
    );

    // Respuesta exitosa
    res.status(201).json({
      message: 'Cliente agregado correctamente',
    });
  } catch (err) {
    console.error('Error al ejecutar la consulta: ', err);
    res.status(500).json({ error: 'Error al agregar el cliente' });
  }
});

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM cliente", (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Puerto para el servidor
const port = 3000;
app.listen(port, () => {
  console.log(Servidor corriendo en el puerto ${port});
});