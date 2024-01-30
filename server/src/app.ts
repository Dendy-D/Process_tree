import express from 'express';
import sequelize from './database/db';
import cors from 'cors';
import Employee from './models/employee';
import Process from './models/process';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.get('/', (req, res) => {
      res.send('test');
    });

    app.listen(PORT, () => {
      console.log(`Sever has started on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e)
  }
};

start();

