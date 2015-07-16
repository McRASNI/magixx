angular.module("magix.factories.orderFactory",['magix.factories.configFactory'])
    .factory('orderFactory',['$http','configFactory',function($http,configFactory){
        return {
            getOrder:function(){
                return $http.get(configFactory.serverAddress + "/api/order/")
            },
            getOrderByUserID:function(){
                console.log("Nathy1!");
                return $http.get(configFactory.serverAddress + "/api/order/getOrderByUserID",{id:1})
            }
        }
}]);

