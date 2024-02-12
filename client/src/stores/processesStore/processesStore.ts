import { makeObservable, observable, action, runInAction } from 'mobx';

import processesStoreService from './processesStore.service';
import { Process, CreateProcess } from '../../types';

class ProcessesStore {
  processes: Process[] = [];

  isLoading = true;

  isError = false;

  constructor() {
    makeObservable(this, {
      processes: observable,
      fetchAllProcesses: action.bound,
      setLoading: action.bound,
      createFirstLevelProcess: action.bound,
    });
  }

  setLoading = () => {
    this.isLoading = true;
    this.isError = false;
  }

  get firstLevelProcesses(): Process[] {
    return this.processes.filter((process: Process) => process.isFirstLevel)
  }

  fetchAllProcesses = async () => {
    this.setLoading();

    try {
      const processes = await processesStoreService.getAllProcesses();
      runInAction(() => {
        this.processes = processes;
      })
    } catch (error) {
      this.isError = true;
      console.error('Error fetching processes: ', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  createFirstLevelProcess = async (body: CreateProcess) => {
    this.setLoading();

    try {
      await processesStoreService.createFirstLevelProcess(body);
      const processes = await processesStoreService.getAllProcesses();
      runInAction(() => {
        this.processes = processes;
      });
    } catch (error) {
      this.isError = true;
      console.error('Error creating first level process: ', error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default new ProcessesStore();
