import Datastore from 'nedb';
import os from 'os';
import path from 'path';

export const DEFAULT_PATH = path.join(os.tmpdir(), 'my.db');

export class Database {
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

export function init(dbPath) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = new Database(dbPath);
      await db.connect();
    } catch (err) {
      return reject(err);
    }
    resolve(db);
  });
}
