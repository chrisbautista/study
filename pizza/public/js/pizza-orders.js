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


              window.location.href = "/";

        });

        $(".deleteBtn").off().bind('click', function(e){
            var _id;
            e.preventDefault();

            _id = $(this).val();

            if(confirm("This will permanently delete this item. \n\n Are you sure?")){
              $.ajax({
                method: "DELETE",
                url: "/api/orders/" + _id,
                data: { dummy: _id}
              })
              .done(function( msg ) {
                  window.location.href = "/orders";
              });

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