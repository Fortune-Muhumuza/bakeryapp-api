const mongoose = require('mongoose');

const foodItem = mongoose.Schema({
    foodItemName: {
      type: String
    },
    foodItemPrice: {
      type: Number,
    },
    foodItemProfit:{
      type: Number
    },
    numberOfFoodItems: {
      type: Number,
    },
    date:{
      type: String,
    }
  });

module.exports = mongoose.model('FoodItem', foodItem);