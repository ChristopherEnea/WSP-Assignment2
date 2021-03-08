const express = require('express');
const BodyParser = require('body-parser');
const UserController = require('../controllers/user.controller');

const router = express.Router();
router.use(BodyParser.json());

router.get('', UserController.getUsers);
router.get('/:ssn', UserController.getUser);
router.post('', UserController.createUser);
// router.put('/users/:ssn', UserController.editUser);

module.exports = router;
