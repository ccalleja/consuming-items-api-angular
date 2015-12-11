'use strict';

angular.module('stock.stockItems', ['ngRoute', 'angular.third.party.module'])

  .config(['$routeProvider', 'angThirdPartyProvider', function ($routeProvider, angThirdPartyProvider) {
    angThirdPartyProvider.changeTimeout(0);

    $routeProvider.when('/stock-items', {
      templateUrl: 'stock-items-view/stock-items-view.html',
      controller: 'StockItemsCtrl'
    });

  }])

  .controller('StockItemsCtrl', ['$scope', 'angThirdParty', function ($scope, angThirdParty) {
    //get list of stok items
    angThirdParty.then(function(currentStockData){
      $scope.stockItems = currentStockData;
      //todo - remove
      console.log('Items retreived from server: ' + $scope.stockItems);
    });

    $scope.addItemToCart = function(item){
      console.log(item);
    }
  }]);