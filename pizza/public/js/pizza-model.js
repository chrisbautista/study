(function() {

    var PizzaModel = function() {
        return {
            size: null,
            crust: null,
            toppings: [],
            qty: 0,
            subtotal: 0
        };
    };

    var PizzaCartModel = function(){
        return  {
            content: [],
            total: 0,
            notax: 0,
            tax: 0,
            delivery: 0
        };
    };


    window.PizzaModel = PizzaModel;
    window.PizzaCartModel = PizzaCartModel;

}());