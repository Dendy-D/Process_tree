import { FindOptions } from 'sequelize';

import Process from './models/process';
import ProcessRelation from './models/processRelation';
import { CreateProcessT, UpdateProcessT } from './processes.types';
import { Employee } from '../employees';
import sequelize from '../../database/db';

const getAllProcesses = async () => {
  return await Process.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
  });
};

const getProcessById = async (id: string, options?: FindOptions) => {
  return await Process.findAll({
    where: {
      id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'processOwnerId', 'analystId']
    },
    include: [
      {
        model: Employee,
        as: 'processOwner',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
      },
      {
        model: Employee,
        as: 'analyst',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }, 
      },
    ],
    ...options,
  });
};

const createFirstLevelProcess = async (process: CreateProcessT) => {
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

const getAllProcessDirectChildren = async (id: string) => {
  return await ProcessRelation.findAll({
    where: {
      parentId: id,
    },
  });
};

const createChildProcess = async (parentProcessId: string, process: CreateProcessT) => {
  const childProcess = await createFirstLevelProcess(process);
  const { id: childProcessId } = await childProcess.get();

  await ProcessRelation.create({ parentId: parentProcessId, childId: childProcessId });  
};

const deleteProcess = async (id: string): Promise<number> => {
  const lol = await getAllProcessDirectChildren(id);

  console.log(lol);

  return await Process.destroy({
    where: {
      id,
    },
  });
};

// Exclusively for development
const deleteAllProcesses = async (): Promise<void> => {
  await sequelize.query('TRUNCATE TABLE "Process" CASCADE;');
};

export {
  getAllProcesses,
  getProcessById,
  createFirstLevelProcess,
  updateProcess,
  deleteProcess,
  getAllProcessDirectChildren,
  createChildProcess,
  deleteAllProcesses,
};
