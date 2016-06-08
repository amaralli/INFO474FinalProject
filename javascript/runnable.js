var bubbleChart;

$(function() {
    bubbleChart = Bubbles();
    var voterData = [];
    var total = 9;
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
        voterData.push(temp);
    }

    var candidateData = [];
    for (var i = 1; i <= 2; i++) {
        var temp = {};
        temp.number = i;
        candidateData.push(temp);
    }

    var delegateData = [];
    for (var i = 1; i <= 4; i++) {
        var temp = {};
        temp.number = i;
        delegateData.push(temp);
    }

    bubbleChart.setSelector('#bubbles');
    bubbleChart.setDimensions(1000, 500);
    bubbleChart.setVoterData(voterData);
    bubbleChart.setCandidateData(candidateData);
    bubbleChart.setDelegateData(delegateData);
    bubbleChart.build();
});
