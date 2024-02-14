import { makeObservable, observable, action, runInAction } from 'mobx';

import processesStoreService from './processesStore.service';
import { Process, CreateProcess, UpdateProcess } from '../../types';

class ProcessesStore {
  processes: Process[] = [];

  isLoading = true;

  isError = false;

  constructor() {
    makeObservable(this, {
      processes: observable,
      fetchAllProcesses: action.bound,
      setLoading: action.bound,
      fetchProcessById: action.bound,
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

  fetchProcessById = async (processId: number) => {
    this.setLoading();

    try {
      const process = await processesStoreService.getProcessById(processId);
      return process;
    } catch (error) {
      this.isError = true;
      console.error('Error fetching process: ', error);
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

  updateProcess = async (processId: number, body: UpdateProcess) => {
    this.setLoading();

    try {
      await processesStoreService.updateProcess(processId, body);
      const processes = await processesStoreService.getAllProcesses();
      runInAction(() => {
        this.processes = processes;
      })
    } catch (error) {
      this.isError = true;
      console.error('Error updating process: ', error)
    } finally {
      this.isLoading = false;
    }
  }

  deleteProcess = async (processId: number) => {
    this.setLoading();

    try {
      await processesStoreService.deleteProcess(processId);
      const processes = await processesStoreService.getAllProcesses();
      runInAction(() => {
        this.processes = processes;
      })
    } catch (error) {
      this.isError = true;
      console.error('Error deleting process: ', error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default new ProcessesStore();
