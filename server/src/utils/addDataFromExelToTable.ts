import xlsx from 'xlsx';
import Employee from '../models/employee';

import * as path from 'path';

async function addEmployeesFromXlsx(): Promise<void> {
  const workbook = xlsx.readFile(path.resolve(__dirname, '../../files/employees.xlsx'));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const employees: Record<string, string>[] = xlsx.utils.sheet_to_json(worksheet);

  for (let employee of employees) {
    try {
      const name = employee['Абенов Адильхан Абзалович'];
      const position = employee['Директор по развитию корпоративного университета по продажам'];
      const department = employee['Блок Коммерции и Маркетинга'];
      const isAnalyst = employee['false'];

      const newEmployee: any = {
        name,
        position,
        department,
        isAnalyst,
      };
      
      await Employee.create(newEmployee);

    } catch (e) {
      console.error(`Error adding employee: ${e}`);
    }
  }
};

export default addEmployeesFromXlsx;
