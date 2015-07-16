angular.module("magix.views.header",[])
    .controller("HeaderController",["$scope","$location",
    function($scope,$location){
        console.log("WATRF");
        $scope.isLocationActive = function(location){
            return location === $location.path;
        };
    }]);