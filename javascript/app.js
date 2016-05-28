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

    	//populates the drop down
    	$http.get('stateData.json')
    		.success(function(data) {
    			$scope.states = data.states;
				console.log($scope.states);
    		})
    		.error(function() {
    			console.log("Failed to load JSON")
    		});

    	//changes the state the user has selected every time they select something from the drop down.
    	$scope.selectState = function(selectedState) {
    		$scope.currentState = JSON.parse(selectedState);
            console.log($scope.currentState)
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
            console.log("OOOOOOO " + partyName)
            $scope.partySelection = partyName;
        }
		
		console.log($scope.currentState);
		//console.log(selectedState);

    });
