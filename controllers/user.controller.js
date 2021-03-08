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
    console.log(req.method, req.path);
    await UserService.createUser(req.body);
    res.sendStatus(201);
  });
};

const replaceUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    console.log(req.method, req.path, req.body);
    // if (req.body == null) { return res.sendStatus(204); }
    await UserService.replaceUser(req.params.ssn, req.body);
    return res.sendStatus(200);
  });
};

const modifyUser = async (req, res) => {
  console.log(req.method, req.path, req.params.ssn, req.body);
  // const { id } = req.params;
  // const user = req.body;
  // delete user.sku;
  await doActionThatMightFailValidation(req, res, async () => {
    const patchResult = await UserService.modifyUser(req.params.ssn, req.body);
    if (patchResult != null) {
      res.json(patchResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    console.log(req.method, req.path, req.params.ssn);
    const getResult = await UserService.deleteUser(req.params.ssn);
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteUsers = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    console.log(req.method, req.path);
    res.json(await UserService.deleteUsers());
  });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  replaceUser,
  modifyUser,
  deleteUser,
  deleteUsers,
};
