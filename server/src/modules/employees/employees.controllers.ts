import Employee from './models/employee';

const getAllEmployees = async () => {

  return await Employee.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    order: [['name', 'ASC']],
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
