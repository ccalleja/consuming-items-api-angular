'use strict';

describe('stock.stockItems module', function () {


  var stockItemsCtrl, scope, thirdPartyService, log;

  beforeEach(module('stock.stockItems'));
  beforeEach(inject(function ($controller, $rootScope, angThirdParty, $log) {

    scope = $rootScope.$new();
    thirdPartyService = angThirdParty;
    log = $log;
    //Create the controller with the new scope
    stockItemsCtrl = $controller('StockItemsCtrl', {$scope: scope, angThirdParty: thirdPartyService, $log: log});
  }));

  function mockCalculateTotalScopeFunction(callback){
    scope.calculateTotal = function(){
      callback()
    }
  }

  describe('stockItems controller', function () {
    it('should load the controller and fetch stock items', inject(function () {
      expect(stockItemsCtrl).toBeDefined();
      expect(scope.stockItems).toBeDefined();
      expect(scope.total).toBe(0);

      thirdPartyService.then(function (languages) {
        //using the mock service we know how many items are returned
        expect(scope.stockItems.length).toEqual(5);
        done();
      });
    }));
  });

  describe('stockItems scope functions', function () {
    it('scope.addItemToCart should define a new field called cartQty in an item',
      inject(function () {
        var item = {
          id: 634554,
          name: "iPhone 6",
          price: 699.99,
          qty: 2
        }

        scope.addItemToCart(item);
        expect(item.cartQty).toBeDefined();
      }));

    it('scope.updateItemCartQuantity should increase the item cartQty', inject(function () {
      var item = {
        id: 634554,
        name: "iPhone 6",
        price: 699.99,
        qty: 2
      }

      var updateTotalCalled = false;
      mockCalculateTotalScopeFunction(function(){
        updateTotalCalled = true;
      });

      scope.updateItemCartQuantity(item, true);
      expect(item.cartQty).toBeDefined();
      expect(item.cartQty).toEqual(1);
      expect(item.subtotal).toBeDefined();
      expect(item.subtotal).toEqual(699.99);
      expect(updateTotalCalled).toBeTruthy();

      //resetting updateTotalCalled flag
      updateTotalCalled = false;
      scope.updateItemCartQuantity(item, true);
      expect(item.cartQty).toBeDefined();
      expect(item.cartQty).toEqual(2);
      expect(item.subtotal).toBeDefined();
      expect(item.subtotal).toEqual(1399.98);
      expect(updateTotalCalled).toBeTruthy();
    }));

    it('scope.updateItemCartQuantity should decrease the item cartQty', inject(function () {
      var item = {
        id: 634554,
        name: "iPhone 6",
        price: 699.99,
        qty: 2,
        cartQty:2,
        subtotal:1399.98
      }

      var updateTotalCalled = false;
      mockCalculateTotalScopeFunction(function(){
        updateTotalCalled = true;
      });

      scope.updateItemCartQuantity(item, false);
      expect(item.cartQty).toEqual(1);
      expect(item.subtotal).toEqual(699.99);
      expect(updateTotalCalled).toBeTruthy();

      //resetting updateTotalCalled flag
      updateTotalCalled = false;
      scope.updateItemCartQuantity(item, false);
      expect(item.cartQty).toEqual(0);
      expect(item.subtotal).toEqual(0);
      expect(updateTotalCalled).toBeTruthy();
    }));

    it('scope.updateItemCartQuantity should not increase the item cartQty if stock limit reached', inject(function () {
      var item = {
        id: 634554,
        name: "iPhone 6",
        price: 699.99,
        qty: 1
      }
      var updateTotalCalled = false;
      mockCalculateTotalScopeFunction(function(){
        updateTotalCalled = true;
      });

      //first call should increase the item cartQty
      scope.updateItemCartQuantity(item, true);
      expect(item.cartQty).toBeDefined();
      expect(item.cartQty).toEqual(1);
      expect(item.subtotal).toBeDefined();
      expect(item.subtotal).toEqual(699.99);
      var firstCallItemSubtotal = item.subtotal
      expect(updateTotalCalled).toBeTruthy();

      //second call should not increase the item cartQty and totals should not be updated
      updateTotalCalled = false;
      scope.updateItemCartQuantity(item, true);
      expect(item.cartQty).toBeDefined();
      expect(item.cartQty).toEqual(1);
      expect(item.subtotal).toEqual(firstCallItemSubtotal);
      expect(updateTotalCalled).toBeFalsy();

    }));

    it('scope.calculateSubtotal should return cartQty * price if defined', inject(function () {
      var item = {
        id: 634554,
        name: "iPhone 6",
        price: 699.99,
        qty: 10,
        cartQty: 2
      }

      scope.calculateSubtotal(item);
      expect(item.subtotal).toBeDefined();
      expect(item.subtotal).toEqual(1399.98);

    }));

    it('scope.calculateSubtotal should do nothing if price or cartQty undefined', inject(function () {
      var item = {
        id: 634554,
        name: "iPhone 6",
        price: 699.99,
        qty: 10
      }

      scope.calculateSubtotal(item);
      expect(item.subtotal).toBeDefined();
      expect(item.subtotal).toEqual(0);

      item = {
        id: 634554,
        name: "iPhone 6",
        qty: 10,
        cartQty: 1
      }

      scope.calculateSubtotal(item);
      expect(item.subtotal).toBeDefined();
      expect(item.subtotal).toEqual(0);

    }));

    it('scope.calculateTotal should update total based on cart items and price to 2 dp', inject(function () {
      scope.stockItems = [{
        id: 634554,
        name: "iPhone 6",
        price: 699.99,
        qty: 10,
        cartQty:2,
        subtotal:1398
      },{
        id: 634555,
        name: "iPhone 6 Plus",
        price: 999.99,
        qty: 10,
        cartQty: 3,
        subtotal:2999.97
      }];

      scope.calculateTotal();
      expect(scope.total).toEqual(4397.97);

    }));

  });
});