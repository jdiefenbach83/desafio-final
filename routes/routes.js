const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controllers/transactionController');

transactionRouter.get('/', transactionController.get);

module.exports = transactionRouter;
