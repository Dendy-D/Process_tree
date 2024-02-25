import { Employee } from './Employee';

export type Process = {
  id: number;
  name: string;
  isFirstLevel: boolean;
  exitFromProcess?: string;
  VDlink?: string;
  status?: 'main' | 'supporting' | 'administering';
  processOwner?: Employee;
  analyst?: Employee;
};

export type CreateProcess = {
  name: string;
  exitFromProcess?: string;
  VDlink?: string;
  status?: 'main' | 'supporting' | 'administering';
  processOwner?: number;
  analyst?: number;
};

export type ProcessStatus = 'main' | 'supporting' | 'administering';

export enum ProcessStatusEnum {
  Main = 'main',
  Supporting = 'supporting',
  Administering = 'administering',
}

export type UpdateProcess = Partial<CreateProcess>;
