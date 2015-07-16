angular.module("magix.views.home",['ngRoute','magix.services.sessionService'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeController',
            access: "anonymous"
        });
    }])
    .controller("HomeController",["$scope",'sessionService',function($scope,sessionService){
        sessionService.register($scope);
        console.log("WEJOFWJEWPJFEOPFJWEPJFWE:FJWE");
    }]);