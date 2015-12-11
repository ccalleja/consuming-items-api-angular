'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'/*,
  'angular.third.party.module'*/
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

/*
app.config(['angThirdPartyProvider', function (angThirdPartyProvider) {
  angThirdPartyProvider.changeTimeout(250);
}]);*/
