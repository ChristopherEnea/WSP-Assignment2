const UserService = require('../services/user.services');

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

const getUsers = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    console.log(req.method, req.path);
    res.json(await UserService.getUsers());
  });
};

const createUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    console.log(req.method, req.path);
    await UserService.createUser(req.body);
    res.sendStatus(201);
  });
};

const getUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    console.log(req.method, req.path, req.params);
    const getResult = await UserService.getUser(req.params.sku);
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
