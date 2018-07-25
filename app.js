var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var PORT = process.argv[2] || 3000

var app = express();

var DB_SERVER = 'localhost';
var DB_NAME = 'express-baseline';

mongoose.connect(`mongodb://${DB_SERVER}:27017/${DB_NAME}`, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', function (err) { console.log(err) });
db.once('open', function () { console.log('DB Connected') });

app.use(serveStatic('public'));
app.use(bodyParser.json());

var productRouter = require('./controllers/products');

app.use('/products', productRouter);

app.listen(PORT, function () {
    console.log(`Server is listening to port ${PORT}`);
});