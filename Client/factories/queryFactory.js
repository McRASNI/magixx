angular.module("magix.factories.queryFactory",['magix.factories.configFactory'])
    .factory('queryFactory',['$http','configFactory',function($http,configFactory){
        return {
            getQuery:function(){
                return $http.get(configFactory.serverAddress + "/api/query/productName")
            }
        }

    }]);
