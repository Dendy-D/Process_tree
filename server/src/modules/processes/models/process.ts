import { DataTypes } from 'sequelize';

import sequelize from '../../../database/db';
import { Employee } from '../../employees';

const Process = sequelize.define('Process', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  exitFromProcess: {
    type: DataTypes.STRING,
  },
  VDlink: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  processOwnerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    }
  },
  analystId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    }
  },
});

Process.belongsTo(Employee, { foreignKey: 'processOwnerId', as: 'processOwner' });
Process.belongsTo(Employee, { foreignKey: 'analystId', as: 'analyst' });

export default Process;
