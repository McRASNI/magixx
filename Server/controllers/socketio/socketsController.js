/**
 * Created by Dana on 23/06/2015.
 */
var User = require('../../model/userSchema').user;

var controller = function controller(){
    this.connected_users = [];
    this.chats = [];
    this.next_chat_id = 0;
};
controller.prototype.addUser = function(user,socket,cb){
    var self = this;
    User.findById(user,function(err,userObj){
        if(!err){
            self.connected_users.push({user:user,role:userObj.role,socket:socket, chats:[]});
            console.log("User " + user + " Connected");
            if(cb != null)
                cb(null);
        }
        else if(cb != null)
            cb(err);
    });
};

controller.prototype.findOpenAdmin = function(cb){
    for(var c=0;c<this.connected_users.length;c++){
        if(this.connected_users[c].role == 'admin') {
            if(cb != null)
                cb(null,this.connected_users[c])
            return;
        }
    }
    cb(new Error("No Admin Found"),null);
};

controller.prototype.findChatById = function(chat_id, cb){
    for(var c=0;c<this.chats.length;c++){
        var chat = this.chats[c];
        if(chat.chat_id === chat_id){
            if(cb != null)
                cb(null,chat);
            return;
        }
    }
    cb(new Error("No User Found"),null);
};

controller.prototype.removeChat = function(chat_id,cb){
    var self = this;
    this.findChatById(chat_id,function(err,chat){
        if(!err){
            self.chats.splice(self.chats.indexOf(chat),1);
            if(cb != null)
                cb(null);
        }
        else
            cb(err);
    });
};

controller.prototype.addChat = function(user_id, admin_id, cb){
    var self = this;
    self.findUserById(user_id,function(err, connected){
        if(!err){
            self.findUserById(admin_id, function(err, connected_admin){
                if(!err){
                    connected.chats.push(self.next_chat_id);
                    connected_admin.chats.push(self.next_chat_id);
                    self.chats.push({chat_id:self.next_chat_id, msgs:[], users:[connected_admin.user, connected.user]});
                    if(cb != null)
                        cb(self.next_chat_id);
                    self.next_chat_id++;
                }
            });
        }
    });
};

controller.prototype.findUserById = function(user,cb){
    for(var c=0;c<this.connected_users.length;c++){
        var connected = this.connected_users[c];
        if(connected.user === user){
            if(cb != null)
                cb(null,connected);
            return;
        }
    }
    cb(new Error("No User Found"),null);
};

controller.prototype.findUserBySocket = function(socket,cb){
    for(var c=0;c<this.connected_users.length;c++){
        var connected = this.connected_users[c];
        if(connected.socket === socket){
            if(cb != null)
                cb(null,connected);
            return;
        }
    }
    cb(new Error("No User Found"),null);
};

controller.prototype.removeUser = function(user,cb){
    var self = this;
    this.findUserById(user,function(err,connected){
        if(err && cb)
            cb(err);
        self.connected_users.splice(self.connected_users.indexOf(connected),1);
        if(cb)
            cb(null);
    });
};

exports.controller = controller;