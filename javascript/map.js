var drawMap;
var generatePath;

var data;

$(function() {
    var width = 1000;
    var height = 500;

    var svg = d3.select("#vis").append("svg")
        .attr("width", width)
        .attr("height", height);


    d3.json('gz_2010_us_040_00_20m.json', function(error, shape) {
        data = shape;
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
            .attr("class", "state")
            .attr("d", path)
            .style("fill", "#C9C9C9")
            .style("stroke", "white")
            .on("mouseover", function(d) {   //Add tooltip on mouseover for each circle

                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("fill", "#696969")
                 //Get this county's x/y values, then augment for the tooltip
                var xPosition = d3.select(this).attr("x");
                var yPosition = d3.select(this).attr("y");

                //  //Update the tooltip position and value
                 d3.select("#tooltip")
                     //Show the tooltip above where the mouse triggers the event
                     .style("left", (d3.event.pageX) + "px")
                     .style("top", (d3.event.pageY - 70) + "px")
                     .select("#stateLabel")
                     //CSV data has been bound to JSON at this point - so values must be referenced from JSON properties
                     .html(d.properties.name)

                 //Show the tooltip
                 d3.select("#tooltip").classed("hidden", false);

            })
            .on("mouseout", function() {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("fill", "#C9C9C9")

                 //Hide the tooltip
                 d3.select("#tooltip").classed("hidden", true);

            })
    });

})
