import Router from 'express';

import { 
  getAllProcesses,
  getProcessById,
  createFirstLevelProcess,
  updateProcess,
  deleteProcess,
  deleteAllProcesses,
  getAllProcessDirectChildren,
  createChildProcess,
} from './processes.controllers';

const router = Router();

//TODO: Error handling

router.get('/', async (req, res) => {
  const { firstLevel } = req.query;
  const isFirstLevel = firstLevel === 'true';
  try {
    const processes = await getAllProcesses(isFirstLevel);
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
    console.log(e);
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
      processOwnerId,
      analystId,
    } = req.body;

    await createFirstLevelProcess({ name, exitFromProcess, VDlink, status, processOwnerId, analystId, isFirstLevel: true });
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
      processOwnerId,
      analystId,
    } = req.body;

    const { id } = req.params;

    await updateProcess({ name, exitFromProcess, VDlink, status, processOwnerId, analystId }, id);
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

router.delete('/', async (req, res) => {
  try {
    await deleteAllProcesses();
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id/children', async (req, res) => {
  try {
    const { id } = req.params;

    const childrenOfProcess = await getAllProcessDirectChildren(id);
    res.status(200).send(childrenOfProcess);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/:id/children', async (req, res) => {
  try {
    const { id: parentProcessId } = req.params;

    const {
      name,
      exitFromProcess,
      VDlink,
      status,
      processOwnerId,
      analystId,
    } = req.body;

    await createChildProcess(parentProcessId, { name, exitFromProcess, VDlink, status, processOwnerId, analystId, isFirstLevel: false });
    res.status(201).send('Child process was succsessfully created');
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
