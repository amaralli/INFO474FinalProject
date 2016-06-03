window.Bubbles = (function() {
    var b = function() {
        var bubbles = {};

        bubbles.margin = {
            left: 50,
            bottom: 50,
            top: 50,
            right: 50
        }

        bubbles.data;
        bubbles.canvasSelector;

        bubbles.canvasHeight;
        bubbles.canvasWidth;

        bubbles.chartHeight;
        bubbles.chartWidth;

        bubbles.rowSize = 10;
        bubbles.bubbleRadius = 10;

        bubbles.bubs;

        bubbles.build = function() {
            if (this.canvasSelector == undefined || this.canvasWidth == undefined || this.canvasHeight == undefined || this.data == undefined) {
                console.log("Not all required fields have been set yet.");
                return this;
            }

            this.finalCalculations();

            var canvasSvg = d3.selectAll(this.canvasSelector)
                .append('svg')
                .attr('height', this.canvasHeight)
                .attr('width', this.canvasWidth);

            var chartG = canvasSvg.append('g')
                .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

            this.bubs = chartG.selectAll('circle').data(this.data);

            this.bubs.enter().append('circle')
                .attr('r', 10)
                .style('fill', 'none')
                .attr('cx', function(d, i) { return ((10 + 15) * (i % 15)) })
                .attr('cy', function(d, i) { return ((10 + 15) * ((Math.floor(i / 15)) - 1)) })

            this.bubs.transition()
                .duration(100)
                .delay(function(d, i) { return i * 50 })
                .style('fill', function(d) { return bubbles.determineColor(d) } )
                .attr('cx', function(d, i) { return ((10 + 15) * (i % 15)) })
                .attr('cy', function(d, i) { return ((10 + 15) * (Math.floor(i / 15))) })

            return this;
        }

        bubbles.sort = function() {
            this.bubs.transition()
                .duration(1000)
                .attr('cy', function(d, i ) { return ((10 + 15) * (Math.floor(i / 15)) + 70 * bubbles.determineBucket(d))  })
        }

        bubbles.determineBucket = function(dataPoint) {
            if (dataPoint.type == 'democratic') {
                return 0;
            } else if (dataPoint.type == 'republican') {
                return 1;
            } else if (dataPoint.type == 'independent') {
                return 2;
            } else {
                return 3;
            }
        }

        bubbles.finalCalculations = function() {
            this.chartWidth = this.canvasWidth - this.margin.left - this.margin.right;
            this.chartHeight = this.canvasHeight - this.margin.top - this.margin.bottom;

            return this;
        }

        /*
        Setters
        */
        bubbles.setSelector = function(selector) {
            this.canvasSelector = selector;

            return this;
        }

        bubbles.setMargins = function(left, bottom, top, right) {
            this.margin =  {
                left: left,
                bottom: bottom,
                top: top,
                right: right
            }

            return this;
        }

        bubbles.setDimensions = function(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;

            return this;
        }

        bubbles.setData = function(data) {
            this.data = data;

            return this;
        }

        bubbles.setRowSize = function(rowSize) {
            this.rowSize = rowSize;

            return this;
        }

        bubbles.determineColor = function(dataPoint) {
            if (dataPoint.type == 'democratic') {
                return 'blue';
            } else if (dataPoint.type == 'republican') {
                return 'red';
            } else if (dataPoint.type == 'independent') {
                return 'green';
            } else {
                return 'black';
            }
        }

        return bubbles;
    };

    return b;
})();
