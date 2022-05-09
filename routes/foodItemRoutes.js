module.exports = (app) => {
    const foodItem = require('../controllers/foodItemController.js');
    const expenses = require('../controllers/expensesController')

    // Create a new record
    app.post('/addFoodItem', foodItem.create);

    //sell food item
    app.post('/sellFoodItem', foodItem.sellFoodItem);

    //add new expense
    app.post('/addExpense', expenses.addExpense);

    // Retrieve all Notes
    app.get('/getFoodItems', foodItem.findAll);

    // Retrieve all expenses
    app.get('/expenses', expenses.findAll);

//retrieve group members
    //app.get('/group/:groupName', group.findGroupMembers);
}