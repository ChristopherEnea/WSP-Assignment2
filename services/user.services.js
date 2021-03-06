const mongoose = require('mongoose');
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

const createUser = async function (body) {
  try {
    const newUser = new User(body);
    // console.log(newUser);
    newUser.save((err, newUser) => {
      if (err) return console.error(err);
      return newUser;
    });
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};

module.exports = {
  getUsers,
  createUser,
};
