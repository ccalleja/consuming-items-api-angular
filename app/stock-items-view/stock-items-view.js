'use strict';

angular.module('stock.stockItems', ['ngRoute', 'angular.third.party.module'])

  .config(['$routeProvider', 'angThirdPartyProvider', function ($routeProvider, angThirdPartyProvider) {
    angThirdPartyProvider.changeTimeout(0);

    $routeProvider.when('/stock-items', {
      templateUrl: 'stock-items-view/stock-items-view.html',
      controller: 'StockItemsCtrl'
    });

  }])

  .controller('StockItemsCtrl', ['$scope', 'angThirdParty', '$log', function ($scope, angThirdParty, $log) {

    $scope.total = 0;
    $scope.stockItems = {};

    //get list of stok items
    angThirdParty.then(function (currentStockData) {
      $scope.stockItems = currentStockData;
      //todo - remove
      $log.debug('Items retreived from server: ' + $scope.stockItems.length);
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

      $log.debug(item);
    }

    /**
     *
     * @param item
     * @returns {number}
     */
    $scope.calculateSubtotal = function (item) {
      if(item && item.price && item.cartQty)
        item.subtotal = (item.price * item.cartQty);
      else
        item.subtotal = 0;
    }

    /**
     *
     * @param item
     * @returns {number}
     */
    $scope.calculateTotal = function () {

      $scope.total = 0;
      for (var index in $scope.stockItems){
        var item = $scope.stockItems[index];
        if(item.cartQty > 0){
          $scope.total += item.price * item.cartQty;
        }
      }
      $scope.total = +($scope.total.toFixed(2));
    }

    /**
     *
     * @param item
     * @param increase
     */
    $scope.updateItemCartQuantity = function (item, increase) {
      if (item) {
        //if cart qty is undefined set it to 0
        item.cartQty = item.cartQty ? item.cartQty : 0;

        var itemUpdated = false;
        if (increase === true) {
          if(item.qty > item.cartQty) {
            //only increase the cart quantity if there is enough left in stock
            item.cartQty += 1;
            itemUpdated = true;
          }
        } else if(item.cartQty != 0){
          item.cartQty -= 1;
          itemUpdated = true;
        }

        if(itemUpdated) {
          //if item was updated calculate these after each item update
          $scope.calculateSubtotal(item);
          $scope.calculateTotal();
        }
      }
    }
  }]);