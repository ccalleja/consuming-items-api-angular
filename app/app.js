'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'stock.stockItems',
  'myApp.version'
]);

app.config(['$routeProvider', '$logProvider', function ($routeProvider, $logProvider) {
  //for development purposes
  $logProvider.debugEnabled(true);

  $routeProvider.otherwise({redirectTo: '/stock-items'});
}]);