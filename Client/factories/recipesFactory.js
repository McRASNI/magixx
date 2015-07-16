angular.module("magix.factories.recipesFactory",['magix.factories.configFactory'])
    .factory('recipesFactory',['$http','configFactory',function($http,configFactory){
        return {
            getRecipes:function(){
                return $http.get(configFactory.serverAddress + "/api/recipes/");
            }
        }
    }]);
