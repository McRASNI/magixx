angular.module("magix.views.recipes",['ngRoute','magix.factories.recipesFactory','magix.services.sessionService'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/recipes', {
            templateUrl: 'views/recipes/recipes.html',
            controller: 'RecipesController',
            access: "anonymous"
        });
    }])
    .controller('RecipesController',['$scope','recipesFactory','sessionService',function($scope,recipesFactory,sessionService){
        recipesFactory.getRecipes().success(function(recipes){
            sessionService.register($scope);
            console.log("recipes");
            console.log(recipes);
        });
    }]);
