angular.module("magix.views.order",['ngRoute','magix.factories.orderFactory','magix.services.sessionService'])
    .config(['$routeProvider',function($routeProvider){
        console.log("orders");
        $routeProvider.when('/order', {
            templateUrl: 'views/order/order.html',
            controller: 'OrderController',
            access: "user"
        });
    }])
    .controller('OrderController',['$scope','orderFactory','sessionService',function($scope,orderFactory,sessionService){
        sessionService.register($scope);
        orderFactory.getOrderByUserID().success(function(order){
            console.log("get order:");
            console.log(order);
        })
        // ,
        //orderFactory.getOrderByUserID().success(function(order){
        //    console.log("get order Nathy:");
        //    console.log(order);
        //});
    }]);

//