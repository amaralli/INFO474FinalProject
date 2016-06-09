var PieChart = function() {
    
    var variable;
    var text;
    var hoverText;
    
    
    var width = 350,
    height = 350,
    radius = Math.min(width, height) / 2;

    var color = d3.scale.category10();

    var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

    var arcOver = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(radius + 2);

    var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

    function pie(selection) {
        selection.each(function(data) {

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d[variable] });

            var svg = d3.select(this).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc")
                .style("fill", function(d) {return color(d.data[variable])});

            g.append("path")
                .attr("d", arc)
                .on("mouseover", function(d) {
                d3.select(this).transition()
                .duration(1000)
                .attr("d", arcOver);
                d3.select("#tooltip")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("opacity", 1)
                .select("#value")
                .text(d[text]);
            })

            .on("mouseout", function(d) {
                d3.select(this).transition()
                .duration(1000)
                .attr("d", arc);
                d3.select("#tooltip1")
                .style("opacity", 0);;
            });

            g.append("title")
                .text(function(d) { return d.data[hoverText] });

            g.append("text")
                .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .style("fill", "black")
                .text(function(d) { return d.data[text] });

                console.log(data);
            });

        }
        
        pie.label = function(_) {
            if (!arguments.length) return text;
            text = _;
            return this;
        }
        
        pie.hoverLabel = function(_) {
            if (!arguments.length) return hoverText;
            hoverText = _;
            return this;
        }
        
        pie.variable = function(_) {
            if (!arguments.length) return variable;
            variable = _;
            return this;
        }
         
        return pie;
    }
   
