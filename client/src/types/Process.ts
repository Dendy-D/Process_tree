import { Employee } from './Employee';

export type Process = {
  id: number;
  name: string;
  isFirstLevel: boolean;
  exitFromProcess?: string;
  VDlink?: string;
  status?: string;
  processOwner?: Employee;
  analyst?: Employee;
};

export type CreateProcess = {
  name: string;
  exitFromProcess?: string;
  VDlink?: string;
  status?: string;
  processOwner?: number;
  analyst?: number;
};
