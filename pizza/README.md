NodeJS Project: Pizza Shop

 Submitted By: Chris Bautista 
 2912 NodeJS Fundamentals @ BCIT


* Tested on:
    - Mac OSX
    - Chrome and Safari

## Assumptions/Work Done

#### Mar 29:
* Saving to MongoDB happens upon submission to checkout.
* added button *Jump to order listing* after checkout
* Click *Orders* page to see order listing
* Tabular listing of orders, details divided into 4 columns
  -- dateOrdered
  -- deliveryDetails
  -- paymentDetails
  -- orderItems
* Option to delete from order listing

#### Mar 15:
* I did not like using just plain input types so I refactored the order page and used thumbnails to customize the pizza
* I read through the assigment requirements but did not find details on whether sessions can be used so I opted not to use them.
* I modified app.js and "route/route.js" as modules and consumed them in
      ./bin/www.
* Express recommends making an executable file as the main js file to start webserver from console. ./bin/www

## How to Install
1) run
      ```
      > npm install
      ```
## How to Start
1) Go to root of project
2) run:
      ```
      > npm start
      ```
          or
      ```
      > node ./bin/www
      ```

## Libraries Used
* Server(Node)
    - express
    - bodyParser
    - jade
    - mongoose
    - repl - for debugging purposes
* Client
    - jQuery
    - Bootstrap
    - Jquery Validate

## Limitations/TODO

* Basic form validation require only, "no type validation" or number validation
* No session/cookie storage "cart vanishes on reload"
* No sorting via ui, defaults to descending dateOrdered
* No Filters

## Directory/Files

### Changes Mar 29
+ models/orders_model.js - schema definition for orders collection
+ added mongodb connection details in app.js
+ modified routes/index.js
    * modified router module to use model object
    * modified /checkout route
        - saving orders to mongodb  using mongoose
        - render when save is successful
    * added
        - /orders ~ see listing of orders from orders collection
        - /api/orders ~ REST:POST adding orders via JSON *NOTE "application/json"*
            * output JSON
        - /api/orders ~ REST:GET  list orders via JSON *NOTE"application/json"*
            * output JSON
        - /api/orders/:orderid ~ REST:DELETE delete an order by id
            * output JSON

### Changes Mar 15
* bin/www --- executable wrapper for running project
* app.js --- definition of application module
* data/data.json --- contains json of pizza details with prices
                     consumed by application on load
* routes/index.js --- main router logic written as a module
* pizza_modules --- custom application modules
* pizza_modules/pricecalculator --- module that computes orders
                              --- uses data.json and request.body.cart passed in router ("/checkout")
* public --- all static files
* public/js/pizza-client.js --- client side scripting for the pizza builder
* public/js/pizza-checkout.js --- client side scripting for the checkout page
