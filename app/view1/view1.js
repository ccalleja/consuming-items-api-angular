'use strict';

angular.module('myApp.view1', ['ngRoute', 'angular.third.party.module'])

  .config(['$routeProvider', 'angThirdPartyProvider', function ($routeProvider, angThirdPartyProvider) {
    angThirdPartyProvider.changeTimeout(0);

    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });

  }])

  .controller('View1Ctrl', ['$scope', 'angThirdParty', function ($scope, angThirdParty) {
    //get list of stok items
    angThirdParty.then(function(currentStockData){
      $scope.stockItems = currentStockData;


      //todo - remove
      console.log($scope.stockItems);

    });
  }]);