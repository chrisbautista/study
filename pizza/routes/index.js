var express = require('express');
var moment = require("moment");

var _router = express.Router();
var priceCalculator = require("../pizza_modules/pricecalculator");

var helper = function() {
    return {
        saveOrderToDb: function(req, res, orders, model, callback, callbackError) {
            var dt = new Date();
            //
            // TODO: save to Orders
            //
            var order = new model.Orders({
                customerName: req.body.fname,
                customerPhone: req.body.phone,
                customerAddress: req.body.address,
                dateOrdered: dt.getTime(),
                deliveryCharge: orders.delivery,
                notax: orders.notax,
                total: orders.total,
                tax: orders.tax,
                orderItems: orders.cart
            });

            order.save(function(err) {
                if (err) {
                    if (!callbackError) {
                        vm.error = 'Save failed : ';
                    } else {
                        callbackError();
                    }
                } else {
                    if (callback) callback();
                }
            });

        }
    };
}();

var router = function(data, model) {

    /**
     * Render Home page
     * @param  {Object} req   express request
     * @param  {Object} res
     * @param  {Object} next
     * @return router
     */
    _router.get('/', function(req, res, next) {
        console.log([req.body, req.query, res.cookie]);
        //update page

        res.render('index', {
            title: 'Spud Pizza Shop',
            data: data
        });

    });

    //
    // Save TO Database
    //
    _router.post('/checkout', function(req, res, next) {
        var cart = JSON.parse(req.body.cart);
        var calculation = new priceCalculator(cart, data);
        var headers = Object.keys(cart[0]);
        orders = calculation.execute();

        helper.saveOrderToDb(req, res, orders, model, function() {
            res.render('checkout', {
                title: 'Spud Pizza Shop',
                headers: headers,
                cart: orders,
                info: {
                    name: req.body.fname,
                    phone: req.body.phone,
                    address: req.body.address
                }
            });
        });
    });


    _router.get('/orders', function(req, res, next) {

        //  get  Orders from database
        model.Orders.find({}).sort({ dateOrdered: -1 }).exec(function(err, orderRes) {
            if (err) {
                res.status(500);
                return res.json({
                    error: "failed retrieval"
                });
            }

            var headers =["DateOrdered","DeliveryInfo","Payment Details", "Items"];

            res.render('orders', {
                title: 'Spud Pizza Shop',
                headers: headers,
                orders: orderRes
            });
        });

    });



    _router.get('/about', function(req, res, next) {

        res.render('about', {
            title: 'Spud Pizza Shop'
        });

    });

    //////////////////////////////////////////////////
    //
    // REST APIS
    //
    /////////////////////////////////////////////////

    //
    // REST Save to Database
    //
    _router.post('/api/orders', function(req, res, next) {
        var cart = req.body.cart;
        var calculation = new priceCalculator(cart, data);
        orders = calculation.execute();

        helper.saveOrderToDb(req, res, orders, model, function() {
            res.json({
                "status": "Success " + (new Date()).getTime()
            });
        }, function() {
            res.json({
                "status": "Error",
                "description": "Saving order failed."
            });
        });

    });

    //
    // REST Get Listing
    //
    _router.get('/api/orders', function(req, res, next) {

        //  get  Orders from database
        model.Orders.find({}, function(err, orders) {
            if (err) {
                res.status(500);
                return res.json({
                    error: "failed retrieval"
                });
            }
            res.json(orders);
        });

    });

    //
    // REST Delete order by id
    //
    _router.delete('/api/orders/:orderid', function(req, res, next) {

        //  get  Orders from database
        model.Orders.remove({ "_id": req.params.orderid }, function(err){
          if (err) {
                res.status(500);
                return res.json({
                    status: "Error",
                    description: "Delete failed"
                });
          }
          res.json({
                    status: "Success"
                });
        });

    });

    _router.get('/checkout', function(req, res, next) {

        res.redirect("/");

    });



    return _router;

};

module.exports = router;

// Author: Chris Bautista @chrisbautista
//
// TODO: save to mongo
// TODO: construct list from mongo
//