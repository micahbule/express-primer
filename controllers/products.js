var express = require('express');
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

mongoose.model('Product', productSchema);

var productRouter = express.Router();

productRouter.get('/', function (req, res) {
    var productModel = mongoose.model('Product');

    productModel.find({}, function (err, products) {
        if (err) return res.status(500).send(err);
        res.json(products);
    });
});

productRouter.post('/', function (req, res) {
    var productModel = mongoose.model('Product');

    var newProduct = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    
    newProduct.save(function (err) {
        if (err) return res.status(500).send(err);
        return res.json(newProduct.toObject());
    })
});

productRouter.get('/:id', function (req, res) {
    var productModel = mongoose.model('Product');

    productModel.findOne({ _id: req.params.id }, function (err, product) {
        if (err) return res.status(500).send(err);
        if (!product) return res.status(404).send({ error: 'No product found' });
        return res.json(product.toObject());
    });
});

productRouter.put('/:id', function (req, res) {
    var productModel = mongoose.model('Product');

    productModel.findOne({ _id: req.params.id }, function (err, product) {
        if (err) return res.status(500).send(err);
        if (!product) return res.status(404).send({ error: 'No product found' });

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;

        product.save(function (err) {
            if (err) return res.status(500).send(err);
            return res.json(product.toObject());
        })

    });
});

productRouter.delete('/:id', function (req, res) {
    products = products.filter(function (product) {
        return product.id !== req.params.id;
    });

    return res.json(products);
});

module.exports = productRouter;