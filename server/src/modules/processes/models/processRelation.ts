import { DataTypes } from 'sequelize';

import sequelize from '../../../database/db';
import Process from './process';

const ProcessRelation = sequelize.define('Process_relation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Process,
      key: 'id',
    },
  },
  childId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Process,
      key: 'id',
    },
  },
});

ProcessRelation.belongsTo(Process, { foreignKey: 'parentId', as: 'parentProcess' });
ProcessRelation.belongsTo(Process, { foreignKey: 'childId', as: 'childProcess' });

export default ProcessRelation;
