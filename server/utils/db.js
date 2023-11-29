const mongoose = require('mongoose');

class DB {
  #MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fake_so';
  isAlive = false;
  connection;

  constructor() {
    this.connect();
  }

  /**
   * Connect to the database
   */
  async connect() {
    try {
      this.connection = await mongoose.connect(this.#MONGODB_URI);
      this.isAlive = true;
    } catch (err) {
      console.error(err.message);
    }
  }

  /**
   * Disconnect from the database
   */
  async disconnect() {
    await this.connection?.disconnect();
  }
}

module.exports = new DB();
