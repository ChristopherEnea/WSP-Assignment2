const UserService = require('../services/user.services');

const getUsers = async function (req, res, next) {
  try {
    console.log(req.method, req.path, '\nBody:', req.body);
    const users = await UserService.getUsers();
    return res.status(200).json({ status: 200, data: users, message: 'Successfully Retrieved Users' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const createUser = async function (req, res, next) {
  try {
    console.log(req.method, req.path, '\nBody:', req.body);
    // const parsedBody = JSON.parse(req.body);
    const users = await UserService.createUser(req.body);
    return res.status(201).json({ status: 200, data: req.body, message: 'User Created' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};
