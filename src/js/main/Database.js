import Datastore from 'nedb';
import os from 'os';
import path from 'path';

export const DEFAULT_PATH = path.join(os.tmpdir(), 'my.db');

export default class Database {
  constructor(dbPath = DEFAULT_PATH) {
    this.connection = undefined;
    this.path = dbPath;
    this.isReady = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection = new Datastore({filename: this.path});
      this.connection.loadDatabase((err) => {
        if (err) {
          return reject(err);
        }
        this.isReady = true;
        resolve();
      });
    });
  }

  insert(toInsert) {
    return new Promise((resolve, reject) => {
      if (!this.isReady) {
        return reject(Error('Database is not ready to use.'));
      }

      // insertedItems could be an object or an array depending if toInsert
      // is an object or an array.
      this.connection.insert(toInsert, (err, insertedItems) => {
        if (err) {
          return reject(err);
        }

        resolve(insertedItems);
      });
    });
  }
}
