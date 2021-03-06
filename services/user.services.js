const User = require('../models/user');

const getUsers = async function () {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};

const createUser = async function () {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};

module.exports = {
  getUsers,
  createUser,
};
