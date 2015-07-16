angular.module("magix.factories.catalogFactory",['magix.factories.configFactory'])
    .factory('catalogFactory',['$http','configFactory',function($http,configFactory){
        return {
            getCatalog:function(){
                return $http.get(configFactory.serverAddress + "/api/catalog/")
            }
        }

    }]);
