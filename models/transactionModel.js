const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: { type: String, required: true },
  value: { type: Number, required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  yearMonth: { type: String, required: true },
  yearMonthDay: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['-', '+'],
  },
});

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

const transactionModel = mongoose.model('transaction', schema);

module.exports = transactionModel;
