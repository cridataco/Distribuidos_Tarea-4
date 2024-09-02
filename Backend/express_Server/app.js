const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

const IP_ADDRESS = "localhost";

app.use(express.json()); 
app.use(cors());

let transmilenio = [];

app.post('/transmilenio', (req, res) => {
    const { license_plate } = req.body;
    const timestamp = new Date().toLocaleString();
    let editing = 0;

    const index = transmilenio.findIndex(car => car.license_plate === license_plate);
    if (index !== -1) {
        editing = transmilenio[index].editing
        transmilenio[index].timestamp = timestamp;
        transmilenio[index].editing = editing + 1;
        res.send('Car registered successfully');
      } else {
        transmilenio.push({ license_plate, timestamp, editing });
        res.send('Car registered successfully');
    }
});

app.post('/transmilenio', (req, res) => {
    res.status(405).send('Method Not Allowed');
  });

app.get('/transmilenio', (req, res) => {
  res.json(transmilenio);
});

app.get('/transmilenio/:license_plate', (req, res) => {
  const { license_plate } = req.params;
  const car = transmilenio.find(car => car.license_plate === license_plate);
  if (car) {
      res.json(car);
  } else {
      res.status(404).send('Car not found');
  }
});

app.patch('/transmilenio', (req, res) => {
  const { license_plate } = req.body;

  transmilenio = transmilenio.filter(car => car.license_plate !== license_plate);
  res.send('Car removed successfully');
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Servidor escuchando en http://${IP_ADDRESS}:3000`);
});

const logStream = fs.createWriteStream('server.log', { flags: 'a' });
app.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url} - ${new Date().toLocaleString()}\n`;
  logStream.write(logMessage);
  next();
});