angular.module("magix.views.query",['ngRoute','magix.factories.queryFactory','magix.services.sessionService'])
    .config(['$routeProvider',function($routeProvider){
        console.log('in query.js');
        $routeProvider.when('/search', {
            templateUrl: 'views/query/query.html',
            controller: 'queryController',
            access: "user"
        });
    }])
    .controller('queryController',['queryFactory','$scope','sessionService',function(queryFactory,$scope,sessionService){
        sessionService.register($scope);
        queryFactory.getQuery().success(function(query){
            console.log("success query!");
            //console.log(query);
        })
    }]);
