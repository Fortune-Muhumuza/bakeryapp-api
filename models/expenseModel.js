const mongoose = require('mongoose');

const expenseRecord = mongoose.Schema({
    expenseName: {
        type: String
    },
    expensePrice: {
        type: Number,
    },
    unitOfMeasurement: {
        type: String,
    },
    numberOfItemsBought: {
        type: Number,
    },
    moneyUsed: {
        type: Number
    },
    date: {
        type: String,
    }
});

module.exports = mongoose.model('ExpenseRecord', expenseRecord);