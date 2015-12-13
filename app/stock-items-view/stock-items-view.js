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
    angThirdParty.then(function (currentStockData) {
      $scope.stockItems = currentStockData;
      //todo - remove
      console.log('Items retreived from server: ' + $scope.stockItems.length);
    });

    /**
     *
     * @param item
     */
    $scope.addItemToCart = function (item) {

      if (!item.cartQty) {
        item.cartQty = 0;
      }
      //item.cartQty += 1;
      $scope.updateItemCartQuantity(item, true);

      console.log(item);
    }

    /**
     *
     * @param item
     * @param increase
     */
    $scope.updateItemCartQuantity = function (item, increase) {
      if (item) {
        if (increase === true) {
          item.cartQty += 1;
          //todo - check if there is enough in stock otherwise grey out button
        } else if(item.cartQty != 0){
          item.cartQty -= 1;
        }


        //$scope.calculateSubtotal(item);
        //$scope.calculateTotal();
      }

      /**
       *
       * @param item
       * @returns {number}
       */
      $scope.calculateSubtotal = function (item) {
        return item.price * item.cartQty;

      }

      /**
       *
       * @param item
       * @returns {number}
       */
      $scope.calculateTotal = function () {

        var total = 0;
        for (var index in $scope.stockItems){
          var item = $scope.stockItems[index];
          if(item.cartQty > 0){
            total += item.price * item.cartQty;
          }
        }

        return total;

      }

    }
  }]);