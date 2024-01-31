import { DataTypes } from 'sequelize';

import sequelize from '../../../database/db';

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAnalyst: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Employee;
