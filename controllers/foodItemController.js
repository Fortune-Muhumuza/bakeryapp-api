const FoodItem = require('../models/foodItemModel.js');
const TransactionRecord = require('../models/transactionHistory.js');

// Create and Save a new food item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.foodItemName || !req.body.foodItemPrice || !req.body.numberOfFoodItems || !req.body.foodItemProfit) {
        return res.status(400).send({
            message: "Please enter a value"
        });
    }

    // Create a record
    const record = new FoodItem({
        foodItemName: req.body.foodItemName,
        foodItemPrice: req.body.foodItemPrice,
        numberOfFoodItems: req.body.numberOfFoodItems,
        foodItemProfit: req.body.foodItemProfit,
        date: new Date()
    });

    // Save Note in the database
    record.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Record."
            });
        });
};



// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    FoodItem.find()
        .then(foodItems => {
            res.send(foodItems);
        }).catch(err => {
            res.status(500).send("Some error occurred while retrieving records."
            );
        });
};

// Retrieve and return all transactions from the database.
exports.findAllSellTransactions = (req, res) => {
  TransactionRecord.find()
      .then(sellTransactions => {
          res.send(sellTransactions);
      }).catch(err => {
          res.status(500).send("Some error occurred while retrieving records."
          );
      });
};

//Sum total money generated from sales, note that this is not profit.
exports.sumMoneyFromSales = (req, res) => {
  TransactionRecord.aggregate(
    [
      {
        $group: {
          _id: null,
          sumOfAllFoodPrices: {
            $sum: "$foodItemPrice",
          },
          sumOfSoldFoodItems:{
            $sum: "$numberOfFoodItemsSold"
          }
        }
      }
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
};

// Retrieve and return all food item names from the database.
exports.findFoodItemNames = (req, res) => {
    FoodItem.aggregate(
        [
          {
            $group: {
              _id: "$foodItemName",
              
            }
          }
        ],
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        })
};

exports.sumOfAllFoodItems = (req, res) => {

    FoodItem.aggregate(
    [
      {
        $group: {
          _id: null,
          total: {
            $sum: "$numberOfFoodItems"
          }
        }
      }
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );

}

//sell food item
exports.sellFoodItem = async (req, res) => {
    const foodItem = await FoodItem.findOne({
        foodItemName: req.body.foodItemName,
    });

    // this checks if there are still items of that brand or model in stock and does the needful

    if (foodItem.numberOfFoodItems <= 0) {
        res.send('Sorry, this item is out of stock');
    }
    if (req.body.numberOfFoodItems > foodItem.numberOfFoodItems) {
        res.send(
            'Sorry, the quantity of the item in stock is less than the quantity you are trying to sell, please enter a lower quantity',
        );
    } else {

        //sell food item
        FoodItem.findOneAndUpdate(
            { foodItemName: req.body.foodItemName },
            { numberOfFoodItems: foodItem.numberOfFoodItems - +req.body.numberOfFoodItems }, { new: true }
        ).then(() => {
            res.status(201)
        }).catch(err => {
            res.status(500)
        });

        //there is need for functionality that returns a statement of item not in stock when user tries to sell an item that is not in store
        
        //save a record of the transaction
        let newTransaction = await TransactionRecord.create({
            foodItemName: req.body.foodItemName,
            foodItemPrice: foodItem.foodItemPrice,
            numberOfFoodItemsSold: req.body.numberOfFoodItems,
            foodItemProfit: foodItem.foodItemProfit,
            date: new Date()
        });

        res.send(newTransaction)
    }
};


// Update a food item identified by the foodItemId in the request
exports.updateFoodItem = (req, res) => {
  // Validate Request
  if (!req.body.foodItemName || !req.body.numberOfFoodItems) {
      return res.status(400).send({
          message: "Please enter both fields"
      });
  }

  // Find fooditem and update it with the request body
  FoodItem.findByIdAndUpdate(req.params.foodItemId, {
    foodItemName: req.body.foodItemName,
    numberOfFoodItems: req.body.numberOfFoodItems
  }, { new: true })
      .then(foodItem => {
          if (!foodItem) {
              return res.status(404).send({
                  message: "Food item not found with id " + req.params.foodItemId
              });
          }
          res.send(foodItem);
      }).catch(err => {
          if (err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "food item not found with id " + req.params.foodItemId
              });
          }
          return res.status(500).send({
              message: "Error updating food item with id " + req.params.foodItemId
          });
      });
};



// Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     FoodItem.findByIdAndRemove(req.params.userId)
//         .then(user => {
//             if (!user) {
//                 return res.status(404).send({
//                     message: "User not found with id " + req.params.userId
//                 });
//             }
//             res.send({ message: "Note deleted successfully!" });
//         }).catch(err => {
//             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//                 return res.status(404).send({
//                     message: "User not found with id " + req.params.userId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Could not delete user with id " + req.params.userId
//             });
//         });
// };