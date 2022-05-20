module.exports = (app) => {
    const foodItem = require('../controllers/foodItemController.js');
    const expenses = require('../controllers/expensesController')

    // add a new food item
    app.post('/addFoodItem', foodItem.create);

    // update food item
    app.put('/foodItem/:foodItemId', foodItem.updateFoodItem);

    //sell food item
    app.post('/sellFoodItem', foodItem.sellFoodItem);

    //add new expense
    app.post('/addExpense', expenses.addExpense);

    // Retrieve all Notes
    app.get('/getFoodItems', foodItem.findAll);

    // Retrieve all food item names
    app.get('/getFoodItemNamesList', foodItem.findFoodItemNames);

    // Sum number of food items
    app.get('/sumOfFoodItems', foodItem.sumOfAllFoodItems);

    // Sum number of food items
    app.get('/sumMoneyFromSales', foodItem.sumMoneyFromSales);

    // get all selling transactions
    app.get('/getSellingTransactions', foodItem.findAllSellTransactions);

    // Retrieve all expenses
    app.get('/expenses', expenses.findAll);

    //retrieve group members
    //app.get('/group/:groupName', group.findGroupMembers);
}