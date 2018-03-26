import { connect as camoConnect } from 'camo';
import DatabaseConnection from './DatabaseConnection';

export default class NedbDatabaseConnection extends DatabaseConnection {
  constructor(path) {
    super(path);

    this.scheme = 'nedb://';
    this.handle = null;
  }

  async connect() {
    this.handle = await camoConnect(`${this.scheme}${this.path}`);
  }
}
