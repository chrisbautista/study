//
// Pizza Menu 
//

var Application = (function() {

    'use strict';

    var app = function() {

        var that = this;
        var started = false;
        var selectAllToppings = true;
        //
        //  helpers
        //

        //
        //private
        //


        // 
        // public
        // 
        // 
        var pizzaShop = {

            pizza: new PizzaModel(), // initialize Pizza
            cart: [], //shopping cart
            cart_push: function(pizza){
              this.cart.push(pizza);
              $(document).trigger('update-cart');
            },
            cart_pop: function(val){
              this.cart.splice(val, 1);
              $(document).trigger('update-cart');
            },
            feature_push:function(dis, callback){
              var val = $(dis).attr("rev").split(',');
              this.pizza.subtotal = this.pizza.subtotal + parseFloat(val[1]) || 0;
              callback(val[0]);
            },
            feature_pop:function(dis, callback){
              var val = $(dis).attr("rev").split(',');
              this.pizza.subtotal = this.pizza.subtotal - parseFloat(val[1]) || 0;
              callback(val[0]);
            },
            toppings_push: function(dis){
              var _super = this;
              this.feature_push(dis, function(val){
                _super.pizza.toppings.push(val);
              });
            },
            toppings_pop: function(dis){
              var _super = this;
              this.feature_pop(dis, function(val){
                _super.pizza.toppings.splice(_super.pizza.toppings.indexOf(val), 1);
              }); 
            },
            addCart: function() {
                // validate
                if ((this.pizza.size !== null) &&
                    (this.pizza.crust !== null) &&
                    (this.pizza.toppings.length > 0) &&
                    (parseInt(this.pizza.qty) > 0)) {

                    this.cart_push(this.pizza);

                    //clear pizza builder
                    this.resetBuilder();

                    // hide builder
                    this.showCart();
                } else {
                    alert("You might have forgotten to select some items.");
                }


            },
            updateCart: function() {
                var _super = this;
                var html, tbody, row;

                tbody = document.createElement('tbody');

                $(_super.cart).each(function(idx, pizzaRow) {
                    row = document.createElement('tr');

                    $(row).append("<td>" + pizzaRow.size + "</td>");
                    $(row).append("<td>" + pizzaRow.crust + "</td>");
                    $(row).append("<td>" + pizzaRow.toppings.toString() + "</td>");
                    $(row).append("<td>" + parseInt(pizzaRow.qty) + "</td>");
                    $(row).append("<td ><span class='pull-right'>" + pizzaRow.subtotal.toFixed(2) + "</span></td>");
                    $(row).append("<td><button class='op-del btn btn-primary' value='" + idx + "'>X</td>");

                    $(tbody).append(row);
                });

                $(".cart").html("");
                $(".cart").append(cartWrapper());
                $(".cart").append(tbody);

                // set listeners
                $(".op-del").off().bind('click', function() {
                    var dis = this;
                    _super.cart_pop($(this).val());
                });


                if (_super.cart.length === 0) {
                    this.showBuilder();
                } else {
                    this.showCart();
                }

            },
            resetBuilder: function() {
                this.pizza = new PizzaModel();

                $("#qty").val(1);

                $(".pizzafeature").children().removeClass('added').removeClass('disabled');

                this.setupEvents();

            },
            showBuilder: function() {
                if (this.cart.length === 0) {
                    $("#showCart").hide();
                    $("#submitBtn").attr('disabled', 'disabled');
                } else {
                    $("#showCart").show();
                    $("#submitBtn").removeAttr('disabled');
                }
                $("#builder-container").show();
                $("#cart-container").hide();
            },
            showCart: function() {
                if (this.cart.length === 0) {
                    $("#showCart").hide();
                    $("#submitBtn").attr('disabled', 'disabled');
                } else {
                    $("#showCart").show();
                    $("#submitBtn").removeAttr('disabled');
                }
                $("#builder-container").hide();
                $("#cart-container").show();
            },
            setupCustomListers: function() {
                var _super = this;

                var listeners = {};

                listeners.updateCart = {
                    event: 'update-cart',
                    callback: function(e) {
                        return _super.updateCart();
                    }
                };

                $(document).bind(listeners.updateCart.event, listeners.updateCart.callback);
            },

            setupEvents: function() {
                var _super = this;

                if (!started) {
                    this.setupCustomListers();
                    started = true;
                }

                function disableEnable(dis, callback, callbackReverse) {
                    var $parnt = $(dis).parent();
                    $parnt.siblings('div').addClass('disabled');
                    $parnt.addClass("added");
                    $parnt.siblings('div').find('a').off('click');
                    $(dis).off().on('click', function() {
                        $parnt.siblings('div').removeClass('disabled');
                        $parnt.removeClass("added");
                        $parnt.parent().children().find('a').on('click', function() {
                            disableEnable(this, callback, callbackReverse);
                            return false;
                        });
                        callbackReverse();
                        return false;
                    });
                    callback();
                }

                function selectDeselect(dis, callback, callbackReverse) {
                    $(dis).parent().addClass("added");
                    $(dis).off('click').on('click', function() {
                        $(dis).parent().removeClass("added");
                        $(dis).on('click', function() {
                            selectDeselect(this, callback, callbackReverse);
                            return false;
                        });
                        callbackReverse();
                        return false;
                    });
                    callback();
                }
                
                // attach to DOM
                // 
                $(".size").off().bind('click', function(e) {
                    var dis = this;
                    e.preventDefault();
                    disableEnable(dis, function() {
                      _super.feature_push(dis, function(val){
                        _super.pizza.size = val;
                      });                         
                    }, function() {
                      feature_push(dis, function(val){
                         _super.pizza.size = null;
                      });                                                
                    });
                    return false;
                });

                $(".crust").off().bind('click', function(e) {
                    var dis = this;
                    e.preventDefault();
                    disableEnable(dis, function() {
                      _super.feature_push(dis, function(val){
                        _super.pizza.crust = val;
                      });                         
                    }, function() {
                      feature_push(dis, function(val){
                        _super.pizza.crust = null;
                      });                         
                    });
                    return false;
                });

                $(".topping").off().bind('click', function(e) {
                    e.preventDefault();
                    var dis = this;
                    selectDeselect(dis, function() {
                        _super.toppings_push(dis);
                    }, function() {
                        _super.toppings_pop(dis);
                    });
                    return false;
                });
                $("#select-all-toppings").off().bind('click', function() {

                    _super.pizza.toppings.splice(0,_super.pizza.toppings.length);

                    $(".topping").each(function(idx, dis){

                      selectDeselect(dis, function() {
                        _super.toppings_push(dis);
                      }, function() {
                        _super.toppings_pop(dis);
                      });

                    });
                    return false;
                });             
                $("#addToCart").off().bind('click', function() {
                    var dis = this;

                    if (!isNaN($("#qty").val())) {

                        _super.pizza.qty = parseInt($("#qty").val());
                        _super.addCart();
                    } else {
                        alert('Quantity should be a valid number or not empty!');
                    }


                    return false;
                });

                $("#addAnother").off().bind('click', function() {
                    _super.showBuilder();
                });

                $("#showCart").off().bind('click', function() {
                    _super.showCart();
                });

                $("#submitBtn").off().bind('click', function(event) {

                    // Stop form from submitting normally
                    event.preventDefault();


                    // Get some values from elements on the page:
                    var $form = $(this),
                        name = $("#fname").val(),
                        phone = $("#phone").val(),
                        address = $("#address").val(),
                        cart = JSON.stringify(_super.cart),
                        url = $form.attr("action");



                    $("#cart").val(cart);

                    $("#orderForm").submit();

                });


            },
            start: function() {
                this.setupEvents();
                this.showBuilder();
                // run validate as well
                $("#orderForm").validate();
            }

        };

        return pizzaShop;
    }();

    return app;

}()).start();