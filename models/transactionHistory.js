const mongoose = require('mongoose');

//add option of saving sold by who
const transactionRecord = mongoose.Schema({
    foodItemName: {
      type: String
    },
    foodItemPrice: {
      type: Number,
    },
    foodItemProfit:{
        type: Number
      },
    numberOfFoodItemsSold: {
      type: Number,
    },
    date:{
      type: String,
    }
  });

module.exports = mongoose.model('TransactionRecord', transactionRecord);