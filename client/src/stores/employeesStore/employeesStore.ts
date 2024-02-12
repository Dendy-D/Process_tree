import { makeObservable, observable, action, computed, runInAction } from 'mobx';

import employeesService from './employeesStore.service';
import { Employee } from '../../types';

class EmployeesStore {
  employees: Employee[] = [];

  isLoading = true;

  isError = false;

  constructor() {
    makeObservable(this, {
      employees: observable,
      analystEmployees: computed,
      fetchAllEmployees: action.bound,
      setLoading: action.bound,
    });
  }

  get analystEmployees(): Employee[] {
    return this.employees.filter((employee) => employee.isAnalyst);
  }

  setLoading = () => {
    this.isLoading = true;
    this.isError = false;
  }

  fetchAllEmployees = async () => {
    this.setLoading();

    try {
      if (this.employees.length === 0) {
        const employees = await employeesService.getAllEmployees();
        runInAction(() => {
          this.employees = employees;
        });
      }
    } catch (error) {
      this.isError = true;
      console.error('Error fetching employees: ', error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default new EmployeesStore();
