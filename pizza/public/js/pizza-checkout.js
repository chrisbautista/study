//
// Pizza Menu 
//

var Application = (function() {

  'use strict';

  var app = function() {

    var that = this;
    var started = false;

     // 
    // public
    // 
    var pizzaShop = {

      cart:[],
      setupEvents: function(){
 
        $("#jumpToOrders").off().bind('click', function(){

            if(confirm("Leaving this page will delete your cart. \n\n Are you sure?")){
              window.location.href = "/";
            }
        });
        $(".jumpToOrderListing").off().bind('click', function(){

            if(confirm("Leaving this page will delete your cart. \n\n Are you sure?")){
              window.location.href = "/orders";
            }
        });

      }, 
      start: function(){
        this.setupEvents();
      }


    };
 
    return pizzaShop;

  }();

  app.start();

  return app;
})();