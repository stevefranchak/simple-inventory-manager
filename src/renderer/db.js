import NedbDatabaseConnection from './classes/NedbDatabaseConnection';
import { getAppDataDirectory } from './utils';

let database = null;

export default async function connect() {
  if (database instanceof NedbDatabaseConnection) {
    return database;
  }

  const path = getAppDataDirectory();
  database = new NedbDatabaseConnection(path);
  await database.connect();
  return database;
}
