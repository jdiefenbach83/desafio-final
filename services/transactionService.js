const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const transactionModel = require('../models/transactionModel');

const assembleMessage = (success, notFound, message) => {
  return {
    success,
    notFound,
    message,
  };
};

const get = async (periodToGet) => {
  try {
    const { period } = periodToGet;

    if (!!!period) {
      return assembleMessage(
        false,
        false,
        "É necessário informar o parâmetro 'period' cujo o valor deve estar no formato yyyy-mm "
      );
    }

    const transactionDB = await transactionModel.find({
      yearMonth: period,
    });

    return assembleMessage(true, false, {
      length: transactionDB.length,
      transactions: transactionDB,
    });
  } catch (error) {
    return assembleMessage(false, false, error);
  }
};

const getById = async (id) => {
  try {
    if (!!!id) {
      return assembleMessage(
        false,
        false,
        "É necessário informar o 'id' para buscar uma transação "
      );
    }

    const transactionDB = await transactionModel.findOne({
      _id: id,
    });

    if (!!!transactionDB) {
      return assembleMessage(false, true, 'Documento não encontrado.');
    }

    return assembleMessage(true, false, transactionDB);
  } catch (error) {
    return assembleMessage(false, false, error);
  }
};

const add = async (transactionToAdd) => {
  try {
    if (!!!transactionToAdd) {
      return assembleMessage(
        false,
        false,
        'É necessário os campos para inserir uma transação.'
      );
    }

    const transactionDB = new transactionModel(transactionToAdd);
    await transactionDB.save();

    return assembleMessage(true, false, transactionDB);
  } catch (error) {
    return assembleMessage(false, false, error);
  }
};

const update = async (id, transactionToUpdate) => {
  try {
    if (!!!id || !!!transactionToUpdate) {
      return assembleMessage(
        false,
        false,
        'É necessário o id e os campos para atualizar uma transação.'
      );
    }
    const transactionToValidateDB = await transactionModel.findOne({ _id: id });

    if (!!!transactionToValidateDB) {
      return assembleMessage(false, true, 'Documento não encontrado.');
    }

    const transactionToUpdateDB = await transactionModel.updateOne(
      { _id: id },
      transactionToUpdate,
      { new: true }
    );

    if (transactionToUpdateDB.nModified === 0) {
      return assembleMessage(false, true, 'Documento não encontrado.');
    }

    return assembleMessage(true, false, transactionToUpdateDB);
  } catch (error) {
    return assembleMessage(false, false, error);
  }
};

const remove = async (id) => {
  try {
    if (!!!id) {
      return assembleMessage(
        false,
        false,
        'É necessário o id para excluir uma transação.'
      );
    }

    const transactionDB = await transactionModel.deleteOne({ _id: id });

    if (transactionDB.deletedCount === 0) {
      return assembleMessage(false, true, 'Documento não encontrado.');
    }

    return assembleMessage(true, false, transactionDB);
  } catch (error) {
    return assembleMessage(false, false, error);
  }
};

module.exports = { get, getById, add, update, remove };
