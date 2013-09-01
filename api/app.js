var express = require('express');
var _ = require('underscore');
var app = express();
var stash_products = require('stash')('products');

// Add middlewares
app.use(express.bodyParser());

app.get('/', function(req, res){
    res.send(401);
});

app.get('/products', function(req, res){
    return res.send('products');
});

app.get('/products/:id', function(req, res){
    data = stash_products.get(req.params.id);
    if (data) {
        return res.send(data);
    } else {
        return res.send(404);
    }
});

app.post('/products', function(req, res){
    var id = req.body.id
    if (!id) {
        console.log('Missing id')
        return res.send(400, {error: 'Missing id'});
    }
    // Prevent overwriting existing models
    if (stash_products.get(id)) {
        console.log('Conflict - already existing model', id);
        return res.send(409);
    }

    delete req.body.id
    stash_products.set(id, req.body, function(err){
        if (err) {
            console.log('error:', err);
            return res.json(500, {error: err});
        }
        console.log('successfully added', id);
        return res.json({message: 'success'});
    });
});

app.put('/products/:id', function(req, res){
    if (!stash_products.get(req.params.id)) {
        console.log('Missing model', req.params.id);
        return res.send(404);
    }
    if (req.body.id) delete req.body.id
    stash_products.set(req.params.id, req.body, function(err){
        if (err) {
            console.log('error:', err);
            return res.json(500, {error: err});
        }
        console.log('successfully updated', req.params.id);
        return res.json({message: 'success'});
    });
});

app.del('/products/:id', function(req, res){
    if (!stash_products.get(req.params.id)) {
        console.log('Missing model', req.params.id);
        return res.send(404);
    }
    stash_products.rm(req.params.id, function(err){
        if (err) {
            console.log('error:', err);
            return res.json(500, {error: err});
        }
        console.log('successfully removed', req.params.id);
        return res.json({message: 'success'});
    });
});

app.get('/collections/:name', function(req, res){
    var full_products = stash_products.list()
    var products = _.filter(full_products, function(product){
        if (product['collection'] && product['collection'] == req.params.name) {
            return true;
        }
        return false;
    });
    return res.json(products)
});

app.get('/categories/:name', function(req, res){
    var full_products = stash_products.list()
    var products = _.filter(full_products, function(product){
        if (product['categories'] && _.indexOf(product['categories'], req.params.name) != -1) {
            return true;
        }
        return false;
    });
    return res.json(products)
});

app.listen(3000);