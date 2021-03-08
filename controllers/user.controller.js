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

const getUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    console.log(req.method, req.path, req.params.ssn);
    const getResult = await UserService.getUser(req.params.ssn);
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const createUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    console.log(req.method, req.path, req.body);
    res.sendStatus(201);
  });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
};
