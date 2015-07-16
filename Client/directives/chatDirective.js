angular.module("magix.directives.chatDirective",['magix.factories.socketFactory', 'magix.services.sessionService'])
    .directive('chatDir',['socketFactory','sessionService',function(socketFactory, sessionService){
        return {
            restrict: 'E',
            scope: {
                chat:'=chat',
                refreshChat: '='
            },
            link: function(scope, element, attrs, controllers) {
                $.get("views/chat/msg_sender.html",function(sender){
                    $.get("views/chat/msg_receiver.html", function(receiver){
                        var chat_id = scope.chat;


                        var updateChatMessages = function(){
                            var msgs = null;
                            var session = sessionService.getStorage("session");
                            for(var c=0;c<session.chats.length;c++){
                                if(session.chats[c].chat === chat_id) {
                                    msgs = session.chats[c].msgs;
                                    break;
                                }
                            }
                            console.log(msgs);
                            if(msgs != null){
                                for(var i=0;i<msgs.length;i++){
                                    var msg = msgs[i];
                                    var template;
                                    if(msg.user.id === session.user.id)
                                        template = sender;
                                    else
                                        template = receiver;
                                    template = template.replace("@",msg.msg);
                                    $('#msgs').append(template);
                                }
                            }
                        };
                        updateChatMessages();

                        $(document).on('click', '.panel-heading span.icon_minim', function (e) {
                            var $this = $(this);
                            if (!$this.hasClass('panel-collapsed')) {
                                $this.parents('.panel').find('.panel-body').slideUp();
                                $this.addClass('panel-collapsed');
                                $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
                            } else {
                                $this.parents('.panel').find('.panel-body').slideDown();
                                $this.removeClass('panel-collapsed');
                                $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
                            }
                        });
                        $(document).on('focus', '.panel-footer input.chat_input', function (e) {
                            var $this = $(this);
                            if ($('#minim_chat_window').hasClass('panel-collapsed')) {
                                $this.parents('.panel').find('.panel-body').slideDown();
                                $('#minim_chat_window').removeClass('panel-collapsed');
                                $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
                            }
                        });
                        $(document).on('click', '.icon_close', function (e) {
                            $( "#chat_window_1" ).remove();
                        });
                        $(document).on('click','#btn-chat',function(e){
                            console.log("In sending message");
                            console.log(chat_id);
                            var session = sessionService.getStorage("session");
                            var msg = {msg:$('#btn-input').val(),user:{id:session.user.id,name:session.user.firstName + session.user.lastName}};
                            console.log(msg);
                            socketFactory.emitEvent("chat_message",{chat:chat_id, msg:msg},false,null);
                            for(var c=0;c<session.chats.length;c++){
                                if(session.chats[c].chat === chat_id) {
                                    session.chats[c].msgs.push(msg);
                                    break;
                                }
                            }
                            sessionService.setStorage("session",session);
                            updateChatMessages();
                        });
                        scope.$watch("refreshChat",function(){
                            console.log("I am here!!!!");
                            updateChatMessages();
                        });
                    })
                });
            },
            templateUrl: 'views/chat/chat.html'
        };
    }]);