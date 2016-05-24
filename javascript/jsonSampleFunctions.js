/*
ALLOCATION:
wta = winner-take-all
wtm = winner-take-most
p = proportional
unbound = unbound
Some republican objects have special rules. See Texas for example.

METHOD:
caucus, primary

TYPE:
open, closed, mixed
*/

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
