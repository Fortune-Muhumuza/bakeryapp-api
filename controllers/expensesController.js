const Expense = require("../models/expenseModel");

// Expenses
exports.addExpense = (req, res) => {
  // Validate request
  if (
    !req.body.expenseName ||
    !req.body.expensePrice ||
    !req.body.numberOfItemsBought ||
    !req.body.unitOfMeasurement
  ) {
    return res.status(400).send({
      message: "Please enter a value",
    });
  }

  // Create an expenserecord
  const record = new Expense({
    expenseName: req.body.expenseName,
    expensePrice: req.body.expensePrice,
    unitOfMeasurement: req.body.unitOfMeasurement,
    numberOfItemsBought: req.body.numberOfItemsBought,
    moneyUsed: req.body.expensePrice * req.body.numberOfItemsBought,
    date: new Date(),
  });

  // Save Note in the database
  record
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Record.",
      });
    });
};

// Retrieve and return all expenses from the database.
exports.findAll = (req, res) => {
  Expense.find()
    .then((expenses) => {
      res.send(expenses);
    })
    .catch((err) => {
      res.status(500).send("Some error occurred while retrieving expenses.");
    });
};

exports.sumExpensesPrice = (req, res) => {
    Expense.aggregate(
        [
          {
            $group: {
              _id: null,
              total: {
                $sum: "$moneyUsed"
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
