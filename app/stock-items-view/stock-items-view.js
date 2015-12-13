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

    /**
     * On controller load fetch the list of stock items
     */
    angThirdParty.then(function (currentStockData) {
      $scope.stockItems = currentStockData;
      $log.debug('Items retreived from server: ' + $scope.stockItems.length);
    });

    /**
     * Add the cartQty of a particular item so it can be reflected in the cart
     */
    $scope.addItemToCart = function (item) {

      if (!item.cartQty) {
        item.cartQty = 0;
      }

      $scope.updateItemCartQuantity(item, true);
      $log.debug(item);
    }

    /**
     * Calculate the subtotal of a particular item and set the result in item.subtotal
     * This is done by multiplying price by cartQty only if both fields are defined
     * Else subtotal is set to 0
     *
     * This field later on used to calculate the total and for view purposes
     */
    $scope.calculateSubtotal = function (item) {
      if(item && item.price && item.cartQty)
        item.subtotal = (item.price * item.cartQty);
      else
        item.subtotal = 0;
    }

    /**
     * Iterate trough the stockItems and add up the subtotal for each item
     * The result is set in $scope.total formatted to 2 dp
     */
    $scope.calculateTotal = function () {

      $scope.total = 0;
      for (var index in $scope.stockItems){
        var item = $scope.stockItems[index];
        if(item.cartQty > 0){
          $scope.total += item.subtotal;
        }
      }
      $scope.total = +($scope.total.toFixed(2));
    }

    /**
     * Try to update the item cartQty by 1. If item is updated also
     * recalculate subtotal and total
     * @param increase if set to true cartQty is increased by 1,
     *        if set to false it is decreased by one
     */
    $scope.updateItemCartQuantity = function (item, increase) {
      if (item && increase !== undefined) {
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

    /**
     * Used by quantity input to recalculate subtotal and total for a specific item change
     */
    $scope.updateTotals = function(item){
      $scope.calculateSubtotal(item);
      $scope.calculateTotal();
    }
  }]);