const Datastore = require('nedb');
const path = require('path');

const DATABASE_FILENAME = 'inventory.db';

class Database {
  constructor(app) {
    this.app = app;
    this.path = path.join(app.getPath('userData'), DATABASE_FILENAME);
  }

  connect() {
    return new Promise((resolve, reject) => {
      new Datastore({
        filename: this.path
      }).loadDatabase((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

export default function init(app) {
  return new Promise(async (resolve, reject) => {
    try {
      await new Database(app).connect();
    } catch (err) {
      return reject(err);
    }
    resolve();
  });
}
