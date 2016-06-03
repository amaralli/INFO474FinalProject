var charthing;

$(function() {
    charthing = Bubbles();
    var data = [];
    var total = 120;
    for (var i = 0; i < total; i++) {
        var temp = {};
        var alignment;
        if (i < total / 3) {
            alignment = 'democratic';
        } else if (i < (total * 2 / 3)) {
            alignment = 'republican';
        } else if ( i < total) {
            alignment = 'independent';
        }
        temp.type = alignment;
        data.push(temp);
    }

    charthing.setSelector('#bubbles');
    charthing.setData(data);
    charthing.setDimensions(1000, 500);
    charthing.build();
    console.log(charthing);
});
