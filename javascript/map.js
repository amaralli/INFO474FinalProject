var drawMap;
var generatePath;

var data;

$(function() {
    var width = 1000;
    var height = 500;

    var svg = d3.select("#vis").append("svg")
        .attr("width", width)
        .attr("height", height);

    // var tip = d3.tip()
    //     .attr('class', 'd3-tip')
    //     .offset([-10, 0])
    //     .html(function(d) {
    //         return "<span>" + d.state + "</span>";
    //     })

    //svg.call(tip);

    d3.json('gz_2010_us_040_00_20m.json', function(error, shape) {
        data = shape;
        console.log(data);
        var projection = d3.geo.albersUsa().scale(1).translate([0,0]).precision(0);
        var path = d3.geo.path().projection(projection);
        var bounds = path.bounds(shape)

        var scale = 0.95 / Math.max((bounds[1][0] - bounds [0][0]) / width,
            (bounds[1][1] - bounds [0][1]) / height);

        var transl = [(width - scale * (bounds[1][0] + bounds [0][0])) / 2,
            (height - scale * (bounds[1][1] + bounds [0][1])) / 2];

        projection.scale(scale).translate(transl);

        var paths = svg.selectAll("path")
            .data(shape.features).enter().append("path")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", "black")
            //.on('mouseover', tip.show)
            //.on('mouseout', tip.hide)


    });

})
