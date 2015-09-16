

function cartWrapper(extraKeys) {
    var keys;
    var hdr = document.createElement("thead");
    var row = document.createElement('tr');

    extraKeys = extraKeys || "";

    keys = Object.keys(new PizzaModel());
    $.merge(keys, extraKeys);

    $(keys).each(function(idx, val) {
        $(row).append("<th>" + val + "</th>");
    });

    $(hdr).append(row);


    return hdr;
}