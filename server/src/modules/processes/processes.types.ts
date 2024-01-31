import { EmployeeT } from '../employees';

type ProcessT = {
  id: number;
  name: string;
  exitFromProcess?: string;
  VDlink?: string;
  status?: string;
  processOwner?: EmployeeT;
  analyst?: EmployeeT;
};

type CreateProcessT = {
  name?: string;
  exitFromProcess?: string;
  VDlink?: string;
  status?: string;
  processOwnerId: number;
  analystId?: number;
}

type UpdateProcessT = CreateProcessT;

type ProcessRelation = {
  id: number;
  parent: ProcessT;
  child: ProcessT;
}

export {
  ProcessT,
  CreateProcessT,
  UpdateProcessT,
  ProcessRelation,
};
