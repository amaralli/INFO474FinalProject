window.MapVis = (function() {
    var makeMap = function() {
        var drawMap;
        var generatePath;
        var selectedState;
        var selectedType = "none";
        var selectedAllocation = "none";
        var selectedParty = "none";
        var selectedMethod = "none";
        var stateList;
        var trimmedStates = new Array();

        var data;
        var width = 1000;
        var height = 500;
        var svg = d3.select("#vis").append("svg")
                .attr("width", width)
                .attr("height", height);
        d3.json('stateData.json', function(error, stateData) {
            stateList = stateData;
        });

        function initMap() {

            d3.json('gz_2010_us_040_00_20m.json', function(error, shape) {
                // d3.json('stateData.json', function(error, stateData) {
                //     stateList = stateData;
                    console.log("SHOULD BE DRAWIN")

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
                        .attr("id", function(d) {
                            return d.properties.NAME;
                        })
                        .attr("d", path)
                        .style("fill", function(d) {
                            // if(d.properties.NAME == selectedState.name) {
                            //     return "#e57373";
                            // } else {
                                return "#C9C9C9";
                            //}

                        })
                        .style("stroke", "white")
                        .on("mouseover", function(d) {   //Add tooltip on mouseover for each circle
                            var stateInfo = findStateInfo(d.properties.NAME)
                            d3.select(this)
                                .transition()
                                .duration(100)
                                .style("fill", "#696969")
                             //Get this county's x/y values, then augment for the tooltip
                            var xPosition = d3.select(this).attr("x");
                            var yPosition = d3.select(this).attr("y");

                            //  //Update the tooltip position and value
                            //Show the tooltip above where the mouse triggers the event
                             var tooltip = d3.select("#tooltip");
                                 tooltip.style("left", (d3.event.pageX) + "px")
                                 .style("top", (d3.event.pageY - 70) + "px")
                                 .select("#stateLabel")
                                 //CSV data has been bound to JSON at this point - so values must be referenced from JSON properties
                                    .text(d.properties.NAME)
                                 tooltip.select("#tooltipElectionAvail")
                                    .text("State Election Type: " + stateInfo.electionAvail)
                                 tooltip.select("#republicanElect")
                                    .text("Republican Election Method: " + stateInfo.republicanElect)
                                 tooltip.select("#democratElect")
                                    .text("Democratic Election Method: " + stateInfo.democratElect)


                             //Show the tooltip
                             d3.select("#tooltip").classed("hidden", false);

                        })
                        .on("mouseout", function() {
                            d3.select(this)
                                .transition()
                                .duration(100)
                                .style("fill", function(d) {
                                    if(trimmedStates.indexOf(d.properties.NAME) >= 0) {
                                        return "e57373";
                                    } else {
                                        return "C9C9C9";
                                    }
                                })

                             //Hide the tooltip
                             d3.select("#tooltip").classed("hidden", true);

                        })


                    var findStateInfo = function(stateName) {
                        var stateInfo = {
                            electionAvail : "",
                            republicanElect : "",
                            democratElect : ""
                        }

                        for(var i = 0; i < stateList.states.length; i++) {
                            if(stateList.states[i].name == stateName) {
                                stateInfo.electionAvail = stateList.states[i].democratic.type;
                                stateInfo.republicanElect = stateList.states[i].republican.method;
                                stateInfo.democratElect = stateList.states[i].democratic.method;
                            }
                        }

                        return stateInfo;
                    }


                    var statePaths = svg.selectAll("path");
                    for(var i = 0; i < statePaths[0].length; i++) {
                        var img = d3.select("#" + statePaths[0][i].id);
                        // if(statePaths[0][i].id == selectedState.name) {
                        //     img.style("fill", "#e57373");
                        // }
                        if(trimmedStates.indexOf(statePaths[0][i].id) >= 0) {
                            img.style("fill", "#e57373");
                        } else {
                            img.style("fill", "C9C9C9")
                        }
                    }
               // })
            });
            return this;
        };

        initMap.stateSelect = function(state) {
            console.log("SETTING STATE IN MAP")
            selectedState = state;
            return this;
        }

        // initMap.partySelect = function(party) {
        //     selectedParty = party;
        //     return this;
        // }

        // initMap.methodSelect = function(method) {
        //     if(selectedMethod != method) {
        //         selectedMethod =
        //     }
        //     return this;
        // }

        initMap.typeSelect = function(type) {
            if(selectedType != type) {
                trimmedStates = new Array();
                console.log(stateList.states.length)
                for(var i = 0; i < stateList.states.length; i++) {
                    if(stateList.states[i].democratic.type == type) {
                        trimmedStates.push(stateList.states[i].name);
                    }
                }
                selectedType = type;
            }
            return this;
        }

        // initMap.allocationSelect = function(allocation) {
        //     if(selectedAllocation != allocation) {
        //         allocationType = allocation;
        //     }
        //     return this;
        // }

        return initMap;
    }
    return makeMap;

})()


