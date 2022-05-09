const express = require('express')

// create express app
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


require('./routes/foodItemRoutes.js')(app)



// Configuring the database
const dbConfig = require('./config/dbConfig.js');
const mongoose = require('mongoose');






mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "online" });
});
const port = process.env.PORT || 4000

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 4000");
});