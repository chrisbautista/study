//
// Price Calculator Module for Spud Pizza Shop
// author: Chris Bautista
// for: NodeJS Fundamentals at BCIT
// instructor: 
//

var PriceCalculator = function() {

    var tempList;


    function Calc(data, srcData) {
        this.cart = data;
        this.data = srcData;
        this.tax = 0;
        this.GST = 0.05;
        this.deliveryCharge = 10;
    }

    Calc.prototype.extractPriceList = function() {
        //iterate betwen json
        var i, priceList = {},
            tmp,
            obj = this.getData(),
            keys = Object.keys(obj);

        var _extractPrice = function(val) {
            priceList[val.name] = val.price;
        };

        for (i = 0, length = keys.length; i < length; i++) {
            (obj[keys[i]]).forEach(_extractPrice);
        }

        return priceList;
    };

    Calc.prototype.getTax = function() {
        var totalTax = this.tax + this.GST;
        return totalTax;
    };
    Calc.prototype.getDeliveryCharge = function() {
        return this.deliveryCharge;
    };
    Calc.prototype.getCart = function() {
        return this.cart;
    };
    Calc.prototype.getData = function() {
        return this.data;
    };
    Calc.prototype.getCaption = function(category, searchStr) {
        var found = false;
        this.data[category].forEach(function(item) {
            if (item.name === searchStr) {
                found = item.caption;
            }
        });
        return found;
    };


    Calc.prototype.execute = function() {
        var total = 0;
        var tax = this.getTax();
        var subTotal = 0;
        var priceLookup = this.extractPriceList();
        var _super = this;
        var output = {};

        this.getCart().forEach(function(item, indx) {

            subTotal = 0;
            var crust = item.crust.replace(/\W/g, '').split(' ').join('');
            subTotal += priceLookup[item.size] + priceLookup[crust.toLowerCase()];

            item.toppings.forEach(function(tpng) {
                tpng = tpng.replace(/\W/g, '').split(' ').join('');

                subTotal += priceLookup[tpng.toLowerCase()];

            });

            subTotal = (subTotal * parseFloat(item.qty)).toFixed(2);
            _super.cart[indx].subtotal = subTotal;
            total = total + parseFloat(subTotal);

            // normalize cart for rendering
            _super.cart[indx].size = _super.getCaption('size', item.size);


        });

        notax = total.toFixed(2);
        total = ((parseFloat(total) + parseFloat(this.getDeliveryCharge())) * (1 + parseFloat(tax)));

        output = {
            "total": total.toFixed(2),
            "cart": this.getCart(),
            "notax": notax,
            "tax": tax.toFixed(2),
            "delivery": this.getDeliveryCharge()
        };

        return output;
    };

    return Calc;

};

module.exports = PriceCalculator();