import axiosApi from '../../services/api/axiosApi';
import { Process, CreateProcess, UpdateProcess } from '../../types';

class ProcessesService {
  getAllProcesses = async (): Promise<Process[]> => {
    return axiosApi.get<Process[]>('/processes');
  }

  getProcessById = async (processId: number): Promise<Process> => {
    return axiosApi.get<Process>(`/processes/${processId}`);
  }

  createFirstLevelProcess = async (body: CreateProcess): Promise<void> => {
    return axiosApi.post<void, CreateProcess>('/processes', body);
  }

  updateProcess = async (processId: number, body: UpdateProcess): Promise<void> => {
    return axiosApi.put<void, UpdateProcess>(`/processes/${processId}`, body);
  }

  deleteProcess = async (processId: number): Promise<void> => {
    return axiosApi.delete<void>(`/processes/${processId}`);
  }
}

export default new ProcessesService();
