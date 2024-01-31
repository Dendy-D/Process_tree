import Process from './models/process';
import ProcessRelation from './models/processRelation';
import { CreateProcessT, UpdateProcessT } from './processes.types';

const getAllProcesses = async () => {
  return await Process.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
  });
};

const getProcessById = async (id: string) => {
  return await Process.findAll({
    where: {
      id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
  });
};

const createNewProcess = async (process: CreateProcessT) => {
  return await Process.create(process);
};

const updateProcess = async (process: UpdateProcessT, id: string): Promise<number> => {
  const [idOfUpdatedProcess] = await Process.update(process, {
    where: {
      id,
    },
  });
  return idOfUpdatedProcess;
};

const deleteProcess = async (id: string): Promise<number> => {
  return await Process.destroy({
    where: {
      id,
    },
  });
};

const getAllProcessDirectChildren = async (id: string) => {
  return await Process.findAll({
    where: {
      parent: id
    }
  })
};

export {
  getAllProcesses,
  getProcessById,
  createNewProcess,
  updateProcess,
  deleteProcess,
  getAllProcessDirectChildren,
};
