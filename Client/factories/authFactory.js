angular.module("magix.factories.authFactory",['magix.factories.configFactory'])
    .factory('authFactory',['$http','configFactory',function($http,configFactory){
        return {
            getUser:function(email, password){
                return $http.get(configFactory.serverAddress + "/api/auth/",{params:{user:email,password:password}});
            }
        }
    }]);
