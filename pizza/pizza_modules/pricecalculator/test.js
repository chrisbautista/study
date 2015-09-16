
var pc = require("./index");
var pizzaData = require("../../data/data.json");
var data = {
    cart: [
      {"size":"small","crust":"Pan Pizza", "toppings":["mushroom","bacon","greenbellpeppers"],"qty":2},
      {"size":"small","crust":"Hand-Tossed Pizza", "toppings":["mushroom"],"qty":1},
    ]
};

var calculation = new pc(data.cart, pizzaData);

console.log(calculation.execute());