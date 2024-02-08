import Employee from './models/employee';

const getAllEmployees = async (isAnalyst: boolean) => {
  const whereClause = isAnalyst ? { isAnalyst: true } : {};

  return await Employee.findAll({
    where: whereClause,
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    }
  });
};

const getEmployeeById = async (id: string) => {
  return await Employee.findAll({
    where: {
      id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    }
  });
};

export {
  getAllEmployees,
  getEmployeeById,
};
