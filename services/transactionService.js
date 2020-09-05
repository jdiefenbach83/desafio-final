const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const transactionModel = require('../models/transactionModel');

const assembleMessage = (success, message) => {
  return {
    success,
    message,
  };
};

const get = async (periodToGet) => {
  try {
    const { period } = periodToGet;

    if (!!!period) {
      return assembleMessage(
        false,
        "É necessário informar o parâmetro 'period' cujo o valor deve estar no formato yyyy-mm "
      );
    }

    const transactionDB = await transactionModel.find({
      yearMonth: period,
    });

    return assembleMessage(true, {
      length: transactionDB.length,
      transactions: transactionDB,
    });
  } catch (error) {
    return assembleMessage(false, error);
  }
};

const getById = async (id) => {
  try {
    if (!!!id) {
      return assembleMessage(
        false,
        "É necessário informar o 'id' para buscar uma transação "
      );
    }

    const transactionDB = await transactionModel.findOne({
      _id: id,
    });

    return assembleMessage(true, transactionDB);
  } catch (error) {
    return assembleMessage(false, error);
  }
};

const add = async (transactionToAdd) => {
  try {
    if (!!!transactionToAdd) {
      return assembleMessage(
        false,
        'É necessário os campos para inserir uma transação.'
      );
    }

    const transactionDB = new transactionModel(transactionToAdd);
    await transactionDB.save();

    return assembleMessage(true, transactionDB);
  } catch (error) {
    return assembleMessage(false, error);
  }
};

const update = async (id, transactionToUpdate) => {
  try {
    if (!!!id || !!!transactionToUpdate) {
      return assembleMessage(
        false,
        'É necessário o id e os campos para atualizadr uma transação.'
      );
    }

    const transactionDB = await transactionModel.findOneAndUpdate(
      { _id: id },
      transactionToUpdate,
      { new: true, runValidators: true, context: 'query' }
    );

    return assembleMessage(true, transactionDB);
  } catch (error) {
    return assembleMessage(false, error);
  }
};

module.exports = { get, getById, add, update };
