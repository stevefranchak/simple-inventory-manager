const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');

import { Database, DEFAULT_PATH } from './../../src/js/main/Database';

chai.use(require('chai-fs'));
chai.use(require('chai-as-promised'));

const fs = require('fs');
const path = require('path');
const os = require('os');

const TEST_DATABASE_PATH = path.join(os.tmpdir(), 'sim_test.db');

const removeDatabaseFile = (dbPath) => {
  return new Promise((resolve) => {
    fs.unlink(dbPath, (err) => {
      if (err) {
        // Not considering this a critical error since there may be tests that
        // are expected to not create a database file (e.g. testing thrown errors).
        // Also considering whether this should be logged at all.
        console.error(err.message);
      }
      resolve();
    });
  });
};

// These tests are currently tightly coupled to the underlying DBMS
describe('Database', function() {
  // We don't want to accidentally delete somebody's db even if it's in tmpdir
  before('Check if TEST_DATABASE_PATH already exists', function(done) {
    console.log('test');
    fs.access(TEST_DATABASE_PATH, (err) => {
      // err is defined if the file does not exist, so check for the inverse
      if (!err) {
        throw new Error(`${TEST_DATABASE_PATH} already exists.
          Please remove or move it to another directory before trying again.`);
      }
      done();
    })
  });

  it('should have correct defaults with no provided path', function() {
    const db = new Database();
    db.should.be.an.instanceof(Database);
    should.not.exist(db.connection);
    db.path.should.equal(DEFAULT_PATH);
    db.isReady.should.be.false;
  });

  it('should have correct defaults with a provided path', function() {
    const dbPath = TEST_DATABASE_PATH;
    const db = new Database(dbPath);
    db.should.be.an.instanceof(Database);
    should.not.exist(db.connection);
    db.path.should.equal(TEST_DATABASE_PATH);
    db.isReady.should.be.false;
  });

  describe('#connect()', function() {

    afterEach('Remove created database file for #connect() tests', async function() {
      await removeDatabaseFile(TEST_DATABASE_PATH);
    });

    it('should create a database file and set isReady to true', async function() {
      const db = new Database(TEST_DATABASE_PATH);
      await db.connect();
      db.isReady.should.be.true;
      TEST_DATABASE_PATH.should.be.a.file().and.empty;
    });

    it('should throw an error if Datastore#loadDatabase() fails', async function() {
      const loadDatabase = sinon.stub(require('nedb').prototype, 'loadDatabase');
      loadDatabase.yields([new Error()]);

      const db = new Database(TEST_DATABASE_PATH);
      await db.connect().should.be.rejected;
      db.isReady.should.be.false;

      loadDatabase.restore();
    });

  });

});
