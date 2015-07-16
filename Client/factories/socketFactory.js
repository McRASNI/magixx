/**
 * Created by Dana on 23/06/2015.
 */
angular.module("magix.factories.socketFactory",['magix.factories.configFactory'])
    .factory('socketFactory',['configFactory',function(configFactory){
        var socket = null;
        return {
            openConnection:function(cb){
                if(socket == null){
                    console.log("Connecting !");
                    socket = io.connect(configFactory.serverAddress);
                    socket.on("connect",function(){
                        if(cb != null)
                            cb();
                    })
                }
            },
            isConnected:function(){
                return socket != null;
            },
            closeConnection:function(cb){
                if(socket != null){
                    socket.disconnect();
                    socket = null;
                    if(cb != null)
                        cb();
                }
            },
            registerListener:function(event,func){
                if(socket != null){
                    socket.on(event,func);
                }
            },
            emitEvent:function(event,data,toEmit,cb){
                if(socket != null){
                    if(toEmit && cb != null)
                        socket.emit(event,data,cb);
                    else{
                        socket.emit(event,data);
                        if(cb != null)
                            cb();
                    }
                }
            }
        }
    }]);