const db = require('./utils/db');
const User = require('./models/users');

/**
 * Set up function that creates new admin user
 */
async function setUp() {
  try {
    const existingAdmin = await User.findOne({ email: 'test@admin.com' });
    const existingTestUser = await User.findOne({ email: 'test@user.com' });

    if (!existingAdmin) {
      const admin = new User({
        username: 'admin',
        email: 'test@admin.com',
        password: 'admin123',
        status: 'Admin',
        reputation: 100,
      });
      admin.hashPassword('admin123');
      await admin.save();
    }

    if (!existingTestUser) {
      const user = new User({
        username: 'test',
        email: 'test@user.com',
        password: 'user123',
        reputation: 100,
      });
      user.hashPassword('user123');
      await user.save();
    }

    return 'Admin and test user created';
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
