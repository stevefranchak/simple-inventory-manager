const Datastore = require('nedb');
const os = require('os');

class Database {
  constructor(dbPath = os.tmpdir()) {
    this.db = undefined;
    this.path = dbPath;
    this.isReady = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.db = new Datastore({filename: this.path});
      this.db.loadDatabase((err) => {
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
      this.db.insert(toInsert, (err, insertedItems) => {
        if (err) {
          return reject(err);
        }

        resolve(insertedItems);
      });
    });
  }
}

export default function init(dbPath) {
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
