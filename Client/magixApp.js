//The main application module. configuration
angular.module("magix",['magix.views','magix.services.sessionService','magix.factories.socketFactory'])
    .run(['$rootScope','$window','$location','sessionService','socketFactory',function($rootScope,$window,$location,sessionService,socketFactory){
        var session = {
            user:null,
            chats: [],
            logged:false
        };
        if(sessionService.getStorage("session") == null){
            sessionService.setStorage("session",session);
        }

        $rootScope.$on("$routeChangeStart",function(event, nextRoute, currentRoute){
            var session = sessionService.getStorage("session");
            if(!session.logged){
                if(nextRoute.access != "anonymous")
                    $location.path('/login');
            }
            else{
                if(nextRoute.access == "admin" && session.user && session.user.role != "admin")
                    $location.path('/home');
                if(!socketFactory.isConnected()){
                    socketFactory.openConnection(function(){
                        socketFactory.emitEvent("connection_done",{user:session.user.id},true,function(connected){
                            $location.path('/home');
                        })
                    });
                }

            }
        });
    }]);