const User = require('../models/user');

const getUsers = async () => User.find().select('-_id -__v');
const createUser = async (body) => new User(body).save();
const getUser = async (id) => User.findOne({ id });

module.exports = {
  getUsers,
  createUser,
  getUser,
};
