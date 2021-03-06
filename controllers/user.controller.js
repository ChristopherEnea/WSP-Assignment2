const UserService = require('../models/user');

const getUsers = async function (req, res, next) {
  try {
    console.log(req.method, req.path, '\nBody:', req.body);
    const users = await UserService.getUsers();
    return res.status(200).json({ status: 200, data: users, message: 'Succesfully Users Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const createUser = async function (req, res, next) {
  try {
    console.log(req.method, req.path, '\nBody:', req.body, '\nParams:', req.params);
    const users = await UserService.getUsers();
    return res.status(200).json({ status: 200, data: users, message: 'Succesfully Users Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};
