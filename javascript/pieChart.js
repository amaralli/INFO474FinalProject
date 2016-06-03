
$(function() {
    
    var width = 228,
        height = 228,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.RepImpact; });

    var svg = d3.select("#pie1").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv("./data/DelegateImpact.csv", type, function(error, data) {
    if (error) throw error;

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .style("fill", function(d) {return color(d.data.RepImpact);});

    g.append("path")
        .attr("d", arc);
        
    g.append("title")
        .text(function(d) { return d.data.Abbreviation; });   
         
    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("fill", "black")
        .text(function(d) { return d.data.Abbreviation; });
        
        console.log(data);
    });
    
    

    function type(d) {
    d.RepImpact = +d.RepImpact;
    return d;
    }
    
});

$(function() {
    
    var width = 228,
        height = 228,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.PercentRep; });

    var svg = d3.select("#pie2").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv("./data/DelegateImpact.csv", type, function(error, data) {
    if (error) throw error;

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .style("fill", function(d) {return color(d.data.NeedRep);});

    g.append("path")
        .attr("d", arc);
        
    g.append("title")
        .text(function(d) { return d.data.NeedRep; });   
         
    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("fill", "black")
        // .text(function(d) { return d.data.PercentRep + "%"; });
        .text(function(d) { return d.data.PercentRep; });
        
        console.log(data);
    });
    
    

    function type(d) {
    d.RepImpact = +d.RepImpact;
    return d;
    }
    
});


$(function() {
    
    var width = 228,
        height = 228,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.DemImpact; });

    var svg = d3.select("#pie3").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv("./data/DelegateImpact.csv", type, function(error, data) {
    if (error) throw error;

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .style("fill", function(d, i) {return color(i);});

    g.append("path")
        .attr("d", arc);
        
    g.append("title")
        .text(function(d) { return d.data.Abbreviation; });   
         
    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("fill", "black")
        .text(function(d) { return d.data.Abbreviation; });
        
        console.log(data);
    });
    
    

    function type(d) {
    d.RepImpact = +d.RepImpact;
    return d;
    }
    
});

$(function() {
    
    var width = 228,
        height = 226,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.PercentDem; });

    var svg = d3.select("#pie4").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv("./data/DelegateImpact.csv", type, function(error, data) {
    if (error) throw error;

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .style("fill", function(d) {return color(d.data.NeedRep);});

    g.append("path")
        .attr("d", arc);
        
    g.append("title")
        .text(function(d) { return d.data.PercentDem; });   
         
    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("fill", "black")
        // .text(function(d) { return d.data.PercentRep + "%"; });
        .text(function(d) { return d.data.PercentDem; });
        
        console.log(data);
    });
    
    

    function type(d) {
        d.RepImpact = +d.RepImpact;
        return d;
    }
    
});


// $(function() {
//     var width = 960,
//         height = 500,
//         radius = Math.min(width, height) / 2;

//     var color = d3.scale.category20();

//     var pie = d3.layout.pie()
//         .value(function(d) { return d.DemImpact; })
//         .sort(null);

//     var arc = d3.svg.arc()
//         .innerRadius(radius - 100)
//         .outerRadius(radius - 20);

//     var svg = d3.select("#pie").append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")
//         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     d3.csv("./data/DelegateImpact.csv", type, function(error, data) {
//         //var g = svg.selectAll(".arc")
// //         .data(pie(data))
// //         .enter().append("g")
// //         .attr("class", "arc")
// //         .style("fill", function(d, i) {return color(i)});
        
//         var path = svg.selectAll(".arc")
//         .data(pie(data))
        
//         .enter().append("path")
//         .attr("class", "arc")
//         .style("fill", function(d, i) {return color(i)});
//         // .enter().append("path")
//         // .attr("fill", function(d, i) { return color(i); })
//         // .attr("d", arc);

//     d3.selectAll("input")
//         .on("change", change);

//     var timeout = setTimeout(function() {
//         d3.select("input[value=\"rep\"]").property("checked", true).each(change);
//     }, 2000);

//     function change() {
//         var value = this.value;
//         clearTimeout(timeout);
//         pie.value(function(d) { return d[value]; }); // change the value function
//         path = path.data(pie); // compute the new angles
//         path.attr("d", arc); // redraw the arcs
//     }
//     });

//     function type(d) {
//         d.DemImpact = +d.DemImpact;
//         d.RepImpact = +d.RepImpact;
//         return d;
//     }
// });

