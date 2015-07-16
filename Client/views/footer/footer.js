angular.module("magix.views.footer",['magix.services.sessionService','magix.directives.chatDirective','magix.factories.socketFactory'])
    .controller("FooterController",["$scope","$location",'$compile','sessionService','socketFactory',
        function($scope,$location,$compile, sessionService, socketFactory){
            sessionService.register($scope);
            $scope.isLocationActive = function(location){
                return location === $location.path;
            };
            $scope.chatRefreshers = {};
            var toggleChat = function(chatID){
                $scope.chatRefreshers[chatID] = 0;
                var chatCompile = $compile("<chat-dir chat=" + chatID + " refreshChat="+$scope.chatRefreshers[chatID]+"></chat-dir>");
                var chatEle = chatCompile($scope);
                $("#chatHolder").append(chatEle);
            };

            var validateChatID = function(chatID){
                for(var c=0;c<$scope.session.chats.length;c++) {
                    if ($scope.session.chats[c].chat === chatID) {
                        $scope.session.chats.splice(c,1);
                        break;
                    }
                }
            };
            var receive_chat_message = function(chat_message){
                console.log("In receive chat message");
                console.log(chat_message);
                var chatID = chat_message.chat;
                var msg = chat_message.msg;
                for(var c=0;c<$scope.session.chats.length;c++){
                    if($scope.session.chats[c].chat === chatID){
                        $scope.session.chats[c].msgs.push(msg);
                        sessionService.setStorage("session",$scope.session);
                        $scope.chatRefreshers[chatID]++;
                        $scope.$apply();
                        break;
                    }
                }
            };
            $scope.validated = false;
            $scope.openChat = function(){
                socketFactory.emitEvent('request_admin_chat',{user:$scope.session.user.id},true,function(success,chatID){
                    if(success){
                        console.log("In user requesting");
                        validateChatID(chatID);
                        $scope.session.chats.push({chat:chatID, msgs:[]});
                        sessionService.setStorage("session",$scope.session);
                        $("#openChat").hide();
                        toggleChat(chatID);
                        socketFactory.registerListener('chat_message_received',receive_chat_message);
                    }
                });
            };
            $scope.validateChat = function(){
                if($scope.session.logged){
                    if(!$scope.validated){
                        $scope.validated = true;
                        if($scope.session.user && $scope.session.user.role === 'admin'){
                            $("#openChat").hide();
                            var requested_chat = function(chatID){
                                console.log("In admin requested");
                                validateChatID(chatID);
                                $scope.session.chats.push({chat:chatID, msgs:[]});
                                sessionService.setStorage("session",$scope.session);
                                toggleChat(chatID);
                            };
                            socketFactory.registerListener('admin_chat_requested',requested_chat);
                            socketFactory.registerListener('chat_message_received',receive_chat_message);
                        }
                    }
                }
                return $scope.session.logged;
            };


        }]);