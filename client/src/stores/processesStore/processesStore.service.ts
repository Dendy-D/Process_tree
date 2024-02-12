import axiosApi from '../../services/api/axiosApi';
import { Process, CreateProcess } from '../../types';

class ProcessesService {
  getAllProcesses = async (): Promise<Process[]> => {
    return axiosApi.get<Process[]>('/processes');
  }

  createFirstLevelProcess = async (body: CreateProcess): Promise<Process> => {
    return axiosApi.post<Process, CreateProcess>('/processes', body);
  }
}

export default new ProcessesService();
