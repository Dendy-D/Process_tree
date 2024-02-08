import { makeObservable, observable, action } from 'mobx';

import employeesService from './employeesStore.service';
import { EmployeeT } from '../../types';

class EmployeesStore {
  employees: EmployeeT[] = [];

  constructor() {
    makeObservable(this, {
      employees: observable,
      fetchAllEmployees: action,
    });
  }

  fetchAllEmployees = async () => {
    try {
      if (this.employees.length === 0) {
        const employees = await employeesService.getAllEmployees();
        this.employees = employees;
      }
    } catch (error) {
      console.error('Error fetching employees:', error)      
    }
  }
}

export default new EmployeesStore();
