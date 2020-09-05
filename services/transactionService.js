const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const transactionModel = require('../models/transactionModel');

const get = async (periodToGet) => {
  try {
    const { period } = periodToGet;

    if (!!!period) {
      return {
        error:
          "É necessário informar o parâmetro 'period' cujo o valor deve estar no formato yyyy-mm ",
      };
    }

    const transactionDB = await transactionModel.find({
      yearMonth: period,
    });

    return {
      length: transactionDB.length,
      transactions: transactionDB,
    };
  } catch (error) {
    return { error };
  }
};

const getById = async (id) => {
  try {
    if (!!!id) {
      return {
        error: "É necessário informar o 'id' para buscar uma transação ",
      };
    }

    const transactionDB = await transactionModel.findOne({
      _id: id,
    });

    return {
      transactionDB,
    };
  } catch (error) {
    return { error };
  }
};

module.exports = { get, getById };
