const transactionService = require('../services/transactionService');

const get = async (req, res) => {
  try {
    const result = await transactionService.get(req.query);

    if (!!result.error) {
      return res.status(400).send(result);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const result = await transactionService.getById(req.params.id);

    if (!!result.error) {
      return res.status(400).send(result);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { get, getById };
