const db = require('./utils/db');
const User = require('./models/users');

/**
 * Set up function that creates new admin user
 */
async function setUp() {
  try {
    const existingAdmin = await User.findOne({ email: 'test@admin123' });
    if (existingAdmin) {
      return 'Admin user already exists';
    }

    const user = new User({
      username: 'admin',
      email: 'test@admin.com',
      password: 'admin123',
      status: 'Admin',
    });
    await user.save();
    return 'Admin user created';
  } catch (err) {
    throw new Error(err.message);
  }
}

// Create admin user when the database is ready
const intervalId = setInterval(async () => {
  if (db.isAlive) {
    try {
      const response = await setUp();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    } finally {
      clearInterval(intervalId);
      await db.disconnect();
      console.log('Setup complete');
    }
  } else {
    console.log('Waiting for connection...');
  }
}, 1000);
