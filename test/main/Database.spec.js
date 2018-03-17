const chai = require('chai');
const should = chai.should();

import { Database, DEFAULT_PATH } from './../../src/js/main/Database';

chai.use(require('chai-fs'));

const fs = require('fs');
const path = require('path');
const os = require('os');

const TEST_DATABASE_PATH = path.join(os.tmpdir(), 'sim_test.db');

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
    let db = new Database();
    db.should.be.an.instanceof(Database);
    should.not.exist(db.connection);
    db.path.should.equal(DEFAULT_PATH);
    db.isReady.should.be.false;
  });

  it('should have correct defaults with a provided path', function() {
    const dbPath = TEST_DATABASE_PATH;
    let db = new Database(dbPath);
    db.should.be.an.instanceof(Database);
    should.not.exist(db.connection);
    db.path.should.equal(TEST_DATABASE_PATH);
    db.isReady.should.be.false;
  });

  describe('#connect()', function() {

    afterEach('Remove created database file for #connect() tests', function(done) {
      fs.unlink(TEST_DATABASE_PATH, (err) => {
        if (err) {
          // Not considering this a critical error since there may be tests that
          // are expected to not create a database file (e.g. testing thrown errors).
          console.error(err.message);
        }
        done();
      });
    });

    it('should create a database file and set isReady to true', function(done) {
      let db = new Database(TEST_DATABASE_PATH);
      db.connect().then(() => {
        db.isReady.should.be.true;
        TEST_DATABASE_PATH.should.be.a.file().and.empty;
        done();
      });
    });
  });

});
