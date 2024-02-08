import axiosApi from '../../services/api/axiosApi';
import { EmployeeT } from '../../types';

class EmployeesService {
  getAllEmployees = async (isAnalyst?: boolean): Promise<EmployeeT[]> => {
    const params = isAnalyst ? { isAnalyst: true } : {};
    return axiosApi.get<EmployeeT[]>('/employees', { params })
  };
}

export default new EmployeesService();
