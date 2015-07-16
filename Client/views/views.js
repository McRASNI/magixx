//all the views' module will be include in the [] and in the index.html in a script
angular.module('magix.views',['ngRoute','magix.views.header','magix.views.footer','magix.views.home','magix.views.catalog','magix.views.order','magix.views.query','magix.views.recipes','magix.views.auth'])
    .config(function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    })
});