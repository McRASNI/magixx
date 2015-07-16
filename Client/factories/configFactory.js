angular.module("magix.factories.configFactory",[])
    .factory('configFactory',[function(){
        return {
            serverAddress:'http://localhost:3000'
        };
    }]);