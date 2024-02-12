import axiosApi from '../../services/api/axiosApi';
import { Employee } from '../../types';

class EmployeesService {
  getAllEmployees = async (): Promise<Employee[]> => {
    return axiosApi.get<Employee[]>('/employees')
  };
}

export default new EmployeesService();
