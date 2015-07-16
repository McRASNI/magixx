angular.module("magix.views.catalog",['ngRoute','magix.factories.catalogFactory','magix.services.sessionService'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/catalog', {
            templateUrl: 'views/catalog/catalog.html',
            controller: 'CatalogController',
            access: "anonymous"
        });
    }])
    .controller('CatalogController',['$scope','catalogFactory','sessionService',function($scope,catalogFactory,sessionService){
        sessionService.register($scope);
        catalogFactory.getCatalog().success(function(catalog){

            console.log(catalog);
        });
    }]);

$(document).ready(function() {
    console.log("DOMReady");



});