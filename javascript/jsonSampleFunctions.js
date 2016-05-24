

var getStateByName = function(data, stateName) {
    return getStateByAbbreviation(data, "name", stateName);
}

var getStateByAbbreviation = function(data, abbreviation) {
    return getStateByAbbreviation(data, "abbreviation", abbreviation);
}

var getStateByAttribute = function(data, attribute, query) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][attribute] == query) {
            return data[i];
        }
    }

    return null
}
