import Router from 'express';

import { 
  getAllProcesses,
  getProcessById,
  createNewProcess,
  updateProcess,
  deleteProcess,
  getAllProcessDirectChildren,
} from './processes.controllers';

const router = Router();

//TODO: Error handling

router.get('/', async (req, res) => {
  try {
    const processes = await getAllProcesses();
    res.status(200).send(processes);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const process = await getProcessById(id);
    res.status(200).send(process);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      name,
      exitFromProcess,
      VDlink,
      status,
      processOwnerId: process_owner_id,
      analystId: analyst_id,
    } = req.body;

    await createNewProcess({ name, exitFromProcess, VDlink, status, processOwnerId, analystId });
    res.status(201).send('Process was successfully created');
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      exitFromProcess,
      VDlink,
      status,
      processOwner,
      analyst,
    } = req.body;

    const { id } = req.params;

    await updateProcess({ name, exitFromProcess, VDlink, status, processOwner, analyst }, id);
    // const idOfUpdatedProcess = await updateProcess({ name, exitFromProcess, VDlink, status, processOwner, analyst }, id);
    // const process = await getProcessById(String(idOfUpdatedProcess));
    // res.status(200).json(process);
    res.status(200).send('Process was successfully updated');
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProcess(id);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id/children', async (req, res) => {
  try {
    const { id } = req.params;

    const lol = await getAllProcessDirectChildren(id);
    console.log(lol);

  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
