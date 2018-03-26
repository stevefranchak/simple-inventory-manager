/* eslint class-methods-use-this: ["error", { "exceptMethods": ["connect"] }] */

export default class DatabaseConnection {
  constructor(path = '') {
    this.path = path;
  }

  connect() {
    throw new TypeError('You must override connect.');
  }
}
