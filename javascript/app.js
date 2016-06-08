'use strict';

//state choice functionality to allow response without refresh

angular.module('explanation', [])
    .controller('StateSelectController', function($scope, $http /*, $window*/) {
    	//selected state
    	$scope.currentState = "";
    	//all states
    	$scope.states = "";
        //have they begun the experience yet?
        $scope.firstStart = true;
        //party selection
        $scope.partySelection = "";
        $scope.noVote = false;
        var map  = MapVis();

    	//populates the drop down
    	$http.get('stateData.json')
    		.success(function(data) {
                var sortedStates = data.states.sort(function(a, b) { return a.name.localeCompare(b.name) })
    			$scope.states = sortedStates;
    		})
    		.error(function() {
    			console.log("Failed to load JSON")
    		});

    	//changes the state the user has selected every time they select something from the drop down.
    	$scope.selectState = function(selectedState) {
    		$scope.currentState = JSON.parse(selectedState);
            evalClosedOff();
            map.stateSelect($scope.currentState);
            map();
    	}

        //starts the experience
        $scope.beginExperience = function() {
            $scope.firstStart = false;
        }

		$scope.methodWeird = function(selectedState) {
			console.log(selectedState +'hey');
			if(selectedState.democratic.method != selectedState.republican.method) {
				$scope.weirdState = selectedState;
				return true;
			} else {
				return false;
			}
		}

        $scope.selectParty = function(partyName) {
            $scope.partySelection = partyName;
            evalClosedOff();
        }

        var evalClosedOff = function() {
            if($scope.partySelection == 'independent' && $scope.currentState.republican.type == 'closed') {
                $scope.noVote = true;
            } else {
                $scope.noVote = false;
            }
        }

        $scope.changeElectionType = function(value) {
            console.log(value)
            map.typeSelect(value);
            map();
        }

		//console.log(selectedState);

        //var bubbles = Bubbles();
    });
