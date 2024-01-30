import { DataTypes } from 'sequelize';

import sequelize from '../../../database/db';
import Employee from '../../../models/employee';

const Process = sequelize.define('Process', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exit_from_process: {
    type: DataTypes.STRING,
  },
  VDlink: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  process_owner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    }
  },
  analyst_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    }
  },
});

Process.belongsTo(Employee, { foreignKey: 'process_owner_id', as: 'processOwner' });
Process.belongsTo(Employee, { foreignKey: 'analyst_id', as: 'analyst' });

export default Process;
