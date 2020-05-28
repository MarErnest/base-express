const dotenv = require('dotenv');

// Load env
const env_vars = dotenv.config();
if (env_vars.error) throw env_vars.error;

// Logging
const logging = [];
let synchronize = false;
if (process.env.ENV != 'PRODUCTION' && process.env.ENV != 'TEST') {
  logging.push('query');
  logging.push('error');
}

if (process.env.ENV != 'PRODUCTION') {
  synchronize = true;
}

module.exports = {
  'type': 'mysql',
  'host': process.env.MYSQL_HOST,
  'port': +process.env.MYSQL_PORT,
  'username': process.env.MYSQL_USERNAME,
  'password': process.env.MYSQL_PASSWORD,
  'database': process.env.MYSQL_DB,
  'logging': logging,
  'synchronize': synchronize,
  'entities': [
    'dist/**/*.entity.js',
  ],
  'subscribers': [
    'dist/**/*.subscriber.js',
  ],
  'migrationsTableName': 'sys_migrations',
  'migrations': [
    'dist/data/migrations/*.js'
  ],
  'cli': {
    'entitiesDir': 'src/data/models',
    'migrationsDir': 'src/data/migrations',
    'subscribersDir': 'src/data/subscribers'
  }
}
