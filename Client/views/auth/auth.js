angular.module("magix.views.auth",['ngRoute','magix.factories.authFactory','magix.services.sessionService','magix.factories.socketFactory'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/login', {
            templateUrl: 'views/auth/auth.html',
            controller: 'AuthController',
            access: "anonymous"
        });
    }])
    .controller('AuthController',['$scope','$location','authFactory','sessionService','socketFactory',function($scope,$location, authFactory,sessionService,socketFactory){
        sessionService.register($scope);
        $scope.login = function(){
            if($scope.email != "" && $scope.password != ""){
                // Checking if The user is valid
                authFactory.getUser($scope.email,$scope.password).success(function(user){
                    // Opening Socket Connection
                    socketFactory.openConnection(function(){
                        // If Socket connection has succeded, we emit an event with the user id for that socket
                        socketFactory.emitEvent("connection_done",{user:user.id},true,function(connected){
                            if(connected){
                                $scope.session = sessionService.getStorage('session');
                                $scope.session.user = user;
                                $scope.session.logged = true;
                                sessionService.setStorage('session',$scope.session);
                                $scope.$apply(function(){
                                    $location.path('/home');
                                });
                            }
                        })
                    });
                })
                .error(function(err){
                    console.log(err);
                })
            }
        };

    }]);