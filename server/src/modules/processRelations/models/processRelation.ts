import { DataTypes } from 'sequelize';

import sequelize from '../../../database/db';
import { Process } from '../../processes';

const ProcessRelation = sequelize.define('Process_relation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: Process,
      key: 'id',
    },
  },
  child_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Process,
      key: 'id',
    },
  },
});

ProcessRelation.belongsTo(Process, { foreignKey: 'parent_id', as: 'parentId' });
ProcessRelation.belongsTo(Process, { foreignKey: 'child_id', as: 'childId' });

export default ProcessRelation;
