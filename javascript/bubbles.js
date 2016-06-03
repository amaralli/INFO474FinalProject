window.Bubbles = (function() {
    var b = function() {
        var bubbles = {};

        bubbles.margin = {
            left: 50,
            bottom: 50,
            top: 50,
            right: 50
        }

        bubbles.canvasHeight;
        bubbles.canvasWidth;

        bubbles.chartHeight;
        bubbles.chartWidth;

        bubbles.canvasSelector;

        bubbles.build = function() {
            if (this.canvasSelector == undefined || this.chartWidth == undefined || this.chartHeight == undefined) {
                console.log("Not all required fields have been set yet.");
                return this;
            }

            this.finalCalculations();

            var canvasSvg = d3.selectAll(bubbles.canvasSelector)
                .append('svg')
                .attr('height', heatmap.canvasHeight)
                .attr('width', heatmap.canvasWidth);

            var chartG = canvasSvg.append('g')
                .attr('transform', 'translate(' + heatmap.margin.left + ',' + heatmap.margin.top + ')');

            var bubs = chartG.selectAll('circle').data(data);

            bubs.enter().append('circle')
                .attr('r', function(d) { return 7 })
                .style('fill', 'black')
                .attr('cx', function(d, i) { return (7 + 3 * (i % 10)) })
                .attr('cy', function(d, i) { return (7 + 3 * (i % 12)) })

            return this;
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

        return bubbles;
    };

    return b;
})();
