import express from 'express';
import sequelize from './database/db';
import cors from 'cors';
import { Employee, employeesRouter } from './modules/employees';
import { Process, processesRouter } from './modules/processes';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const api = process.env.API || '/api/v1';

console.log(api);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.use(`${api}/processes`, processesRouter);
    app.use(`${api}/employees`, employeesRouter);
    
    // app.get('/', (req, res) => {
    //   res.send('test');
    // });

    // console.log(`${api}/processes`);

    app.listen(PORT, () => {
      console.log(`Sever has started on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e)
  }
};

start();

