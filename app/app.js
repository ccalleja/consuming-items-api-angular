'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'stock.stockItems',
  'myApp.version'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/stock-items'});
}]);