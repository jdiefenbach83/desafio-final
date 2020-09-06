const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controllers/transactionController');

transactionRouter.get('/', transactionController.get);
transactionRouter.get('/:id', transactionController.getById);
transactionRouter.post('/', transactionController.add);
transactionRouter.put('/:id', transactionController.update);
transactionRouter.delete('/:id', transactionController.remove);

module.exports = transactionRouter;
