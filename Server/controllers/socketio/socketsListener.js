/**
 * Created by Dana on 23/06/2015.
 */
var socketsController = require('./socketsController');
var controller = new socketsController.controller();

exports.listener = function(socket){
    socket.on("connection_done",function(query,fn){
        var user = query.user;
        if(user) {
            controller.addUser(user, socket, function(err){
                if(!err)
                    fn(true);
                else
                    fn(false);
            });

        }
        else{
            socket.disconnect();
            fn(false);
        }
    });

    socket.on('request_admin_chat',function(query, fn){
        var requested_user = query.user;
        controller.findOpenAdmin(function(err,admin){
            if(!err){
                controller.addChat(requested_user, admin.user, function(chat_id){
                    console.log("In admin chat requested");
                    admin.socket.emit('admin_chat_requested',chat_id);
                    fn(true,chat_id);
                })
            }
            else
                fn(false);
        });
    });

    socket.on('chat_message',function(query){
        var msg = query.msg;
        var chat = query.chat;
        controller.findChatById(chat,function(err,chat){
            console.log(err);
            if(!err) {
                console.log("In chat message");
                for(var c=0;chat.users.length;c++){
                    if(chat.users[c] != msg.user.id){
                        controller.findUserById(chat.users[c],function(err,connected){
                            if(!err){
                                connected.socket.emit('chat_message_received',query);
                            }
                        })
                    }
                }
            }
        });
    });

    socket.on("disconnect",function(){
        console.log("111111111111");
        controller.findUserBySocket(socket,function(err,connected){
            if(err)
                return;
            controller.removeUser(connected.user);
        })
    })
};