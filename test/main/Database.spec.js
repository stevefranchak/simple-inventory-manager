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

// Test whether an inserted or retrieved document object matches the expected
// properties in a data object. Also tests whether what's passed in for the
// actual parameter is an object and whether some properties inserted from
// the underlying DBMS exist.
const testObjectProperties = (dataObject = {}, actual) => {
  actual.should.be.an('object');

  // Test properties inserted by the underlying DBMS
  actual._id.should.be.a('string');

  // Clone the passed dataObject and actual objects so that we don't mutate them
  const expected = { ...dataObject };
  const clonedActual = { ...actual };

  // nedb implementation exception: remove any properties from expected that are functions or are undefined
  // nedb implementation: nedb's deepCopy sets an unsupported property to undefined instead of
  // removing it, and the actual object will contain these if the actual object
  // is the object returned from nedb's Datastore#insert(). To better match, remove
  // unsupported types from expected and any undefined properties in actual.
  for (let actualOrExpectedObject of [expected, clonedActual]) {
    for (let property in actualOrExpectedObject) {
      let value = actualOrExpectedObject[property];

      if (typeof value === 'undefined' || typeof value === 'function') {
        delete actualOrExpectedObject[property];
      }
    }
  }

  // Any injected properties from the underlying DBMS should be removed as they
  // are not present in the original test data objects.
  let { _id, ...rest } = clonedActual;

  // deep equal
  rest.should.eql(expected);
};

const TEST_OBJECTS = {
  person: {
    name: 'Steve',
    age: 27,
    rating: 4.5,
    isDeveloper: true,
    location: {
      city: 'Odenton',
      state: 'Maryland'
    },
    hobbies: ['daydreaming', 'nightdreaming'],
    lastUpdated: new Date(),
    job: null,
    talents: undefined,
    saySomething: () => {'No.'}
  }
};

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

  // Will only test inserting a single document object even though nedb
  // supports bulk insertions by passing an array. Testing all of nedb's supported
  // insertion overrides is more testing nedb than it is testing my wrapper function.
  // The purpose of writing wrapper functions is to abstract away the underlying DBMS,
  // even though that does slip through the cracks some in this design (e.g. testing
  // properties inserted by the underlying DBMS; switching to another DBMS likely
  // would require changes to the tests).
  describe('#insert()', function() {

    afterEach('Remove created database file for #insert() tests', async function() {
      await removeDatabaseFile(TEST_DATABASE_PATH);
    });

    it('should insert an object into a database', async function() {
      const testData = TEST_OBJECTS.person;
      const db = new Database(TEST_DATABASE_PATH);
      await db.connect();

      const insertedItem = await db.insert(testData).should.be.fulfilled;
      testObjectProperties(testData, insertedItem);

      TEST_DATABASE_PATH.should.be.a.file().and.not.empty;
    });

  });

});
