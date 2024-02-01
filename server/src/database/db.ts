import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST_NAME as string;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'postgres',
  host: dbHost,
  define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  query: {
    raw: true,
  },
});

export default sequelize;
