import { EmployeeType } from '../employees';

type Process = {
  id: number;
  name: string;
  isFirstLevel: boolean;
  exitFromProcess?: string;
  VDlink?: string;
  status?: string;
  processOwner?: EmployeeType;
  analyst?: EmployeeType;
};

type CreateProcess = {
  name: string;
  isFirstLevel: boolean;
  exitFromProcess?: string;
  VDlink?: string;
  status?: string;
  processOwnerId?: number;
  analystId?: number;
}

type UpdateProcess = {
  name?: string;
  exitFromProcess?: string;
  VDlink?: string;
  status?: string;
  processOwnerId?: number;
  analystId?: number;
};

type ProcessRelation = {
  id: number;
  parent: Process;
  child: Process;
}

export {
  Process,
  CreateProcess,
  UpdateProcess,
  ProcessRelation,
};
