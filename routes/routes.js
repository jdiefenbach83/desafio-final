const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controllers/transactionController');

transactionRouter.get('/', transactionController.get);
transactionRouter.get('/:id', transactionController.getById);

module.exports = transactionRouter;
