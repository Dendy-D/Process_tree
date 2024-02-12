import { Router } from 'express';

import {
  getAllEmployees,
  getEmployeeById,
} from './employees.controllers';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).send(employees);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await getEmployeeById(id);
    res.status(200).send(employee);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
