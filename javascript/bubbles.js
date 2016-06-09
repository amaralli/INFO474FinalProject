window.Bubbles = (function() {
    var b = function() {
        var bubbles = {};

        bubbles.margin = {
            left: 50,
            bottom: 50,
            top: 50,
            right: 50
        }

        bubbles.voterData;
        bubbles.candidateData;
        bubbles.delegateData;

        bubbles.canvasSelector;

        bubbles.canvasHeight;
        bubbles.canvasWidth;

        bubbles.chartHeight;
        bubbles.chartWidth;

        bubbles.heightMid;
        bubbles.widthMid;

        bubbles.bubbleRadius = 10;
        bubbles.bubbleDistance = 40;
        bubbles.horizontalDistance = 100;
        bubbles.voterStartingPoint;
        bubbles.candidateStartingPoint;
        bubbles.delegateStartingPoint;

        bubbles.voters;
        bubbles.candidates;
        bubbles.delegates;

        bubbles.build = function() {
            if (this.canvasSelector == undefined || this.canvasWidth == undefined || this.canvasHeight == undefined || this.voterData == undefined) {
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

            this.voters = chartG.selectAll('#voters').data(this.voterData);

            this.voters.enter().append('circle')
                .attr('r', this.bubbleRadius)
                .attr('class', "voters")

            this.candidates = chartG.selectAll('#candidates').data(this.candidateData);

            this.candidates.enter().append('circle')
                .attr('r', this.bubbleRadius * 3)
                .attr('class', "candidates")

            this.delegates = chartG.selectAll('#delegates').data(this.delegateData);

            this.delegates.enter().append('circle')
                .attr('r', this.bubbleRadius * 2)
                .attr('class', 'delegates')

            this.stage0();

            return this;
        }

        bubbles.stage0 = function() {
            this.voters.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', function(d) { return bubbles.determineColor(d) })
                .style('fill-opacity', '0.0')
                .attr('cx', function(d, i) { return bubbles.widthMid })
                .attr('cy', function(d, i) { return bubbles.voterStartingPoint + i * bubbles.bubbleDistance })

            this.candidates.transition()
                .duration(1000)
                .style('fill', 'black')
                .style('fill-opacity', '0.0')
                .attr('cx', function(d, i) { return bubbles.widthMid })
                .attr('cy', function(d, i) { return bubbles.candidateStartingPoint + i * bubbles.bubbleDistance * 2})

            this.delegates.transition()
                .duration(1000)
                .style('fill', '#C9C9C9')
                .style('fill-opacity', '0.0')
                .attr('cx', function(d, i) { return bubbles.widthMid })
                .attr('cy', function(d, i) { return (bubbles.delegateStartingPoint + i * bubbles.bubbleDistance * 2 + 50)})
        }

        bubbles.stage1 = function() {
            this.voters.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', function(d) { return bubbles.determineColor(d) })
                .style('fill-opacity', '1.0')
                .attr('cx', function(d, i) { return bubbles.widthMid - bubbles.horizontalDistance })

            this.candidates.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', 'black')
                .style('fill-opacity', '1.0')
                .attr('cx', function(d, i) { return bubbles.widthMid + bubbles.horizontalDistance })

            this.delegates.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', '#C9C9C9')
                .style('fill-opacity', '0.0')
                .attr('cx', function(d, i) { return bubbles.widthMid })
                .attr('cy', function(d, i) { return (bubbles.delegateStartingPoint + i * bubbles.bubbleDistance * 2 + 50)})
        }

        bubbles.stage2 = function() {
            this.voters.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', function(d) { return bubbles.determineColor(d) })
                .style('fill-opacity', '1.0')
                .attr('cx', function(d, i) { return bubbles.widthMid - bubbles.horizontalDistance * 2 })

            this.candidates.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', 'black')
                .style('fill-opacity', '1.0')
                .attr('cx', function(d, i) { return bubbles.widthMid + bubbles.horizontalDistance * 2 })

            this.delegates.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', '#C9C9C9')
                .style('fill-opacity', '1.0')
                .attr('cy', function(d, i) { return (bubbles.delegateStartingPoint + i * bubbles.bubbleDistance * 2)})
        }

        bubbles.stage3 = function() {
            this.voters.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', function(d) { return bubbles.determineColor(d) })
                .style('fill-opacity', '1.0')
                .attr('cx', function(d, i) { return bubbles.widthMid })

            this.candidates.transition()
                .duration(1000)
                .style('fill', 'black')
                .style('fill-opacity', '0.0')
                .attr('cx', function(d, i) { return bubbles.widthMid + bubbles.horizontalDistance * 2 })

            this.delegates.transition()
                .duration(1000)
                .style('fill', '#C9C9C9')
                .style('fill-opacity', '0.0')
                .attr('cy', function(d, i) { return (bubbles.delegateStartingPoint + i * bubbles.bubbleDistance * 2)})
        }

        bubbles.stage4 = function() {
            this.voters.transition()
                .duration(1000)
                .delay(function(d, i) { return i * 50 })
                .style('fill', function(d) {
                    if (d.type == 'democratic') {
                        return bubbles.determineColor(d);
                    }
                    return '#C9C9C9';
                 })

                .style('fill-opacity', '1.0')
                .attr('cx', function(d, i) {
                    if (d.type == 'democratic') {
                        return bubbles.widthMid + 50;
                    }
                    return bubbles.widthMid - 50;
                 })

            this.candidates.transition()
                .duration(1000)
                .style('fill', 'black')
                .style('fill-opacity', '0.0')
                .attr('cx', function(d, i) { return bubbles.widthMid + bubbles.horizontalDistance * 2 })

            this.delegates.transition()
                .duration(1000)
                .style('fill', '#C9C9C9')
                .style('fill-opacity', '0.0')
                .attr('cy', function(d, i) { return (bubbles.delegateStartingPoint + i * bubbles.bubbleDistance * 2)})
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

            this.heightMid = this.chartHeight / 2;
            this.widthMid = this.chartWidth / 2;

            this.voterStartingPoint = this.heightMid - (((this.voterData.length / 2) - 0.5) * this.bubbleDistance)
            this.candidateStartingPoint = this.heightMid - (((this.candidateData.length / 2) - 0.5) * this.bubbleDistance * 2)
            this.delegateStartingPoint = this.heightMid - (((this.delegateData.length / 2) - 0.5) * this.bubbleDistance * 2)
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

        bubbles.setVoterData = function(voterData) {
            this.voterData = voterData;

            return this;
        }

        bubbles.setCandidateData = function(candidateData) {
            this.candidateData = candidateData;

            return this;
        }

        bubbles.setDelegateData = function(delegateData) {
            this.delegateData = delegateData;

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
