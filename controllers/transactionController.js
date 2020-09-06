const transactionService = require('../services/transactionService');

const get = async (req, res) => {
  try {
    const result = await transactionService.get(req.query);
    const { success, message } = result;

    if (!!!success) {
      return res.status(400).send({ message });
    }

    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const result = await transactionService.getById(req.params.id);
    const { success, notFound, message } = result;

    if (!!!success && !!!notFound) {
      return res.status(400).send({ message });
    }

    if (!!notFound) {
      return res.status(404).send({ message });
    }

    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

const add = async (req, res) => {
  try {
    const result = await transactionService.add(req.body);
    const { success, message } = result;

    if (!!!success) {
      return res.status(400).send({ message });
    }

    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const result = await transactionService.update(req.params.id, req.body);
    const { success, notFound, message } = result;

    if (!!!success && !!!notFound) {
      return res.status(400).send({ message });
    }

    if (!!notFound) {
      return res.status(404).send({ message });
    }

    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const result = await transactionService.remove(req.params.id);
    const { success, notFound, message } = result;

    if (!!!success && !!!notFound) {
      return res.status(400).send({ message });
    }

    if (!!notFound) {
      return res.status(404).send({ message });
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { get, getById, add, update, remove };
