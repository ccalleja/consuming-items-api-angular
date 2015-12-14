'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /stock-items', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/stock-items");
  });


  describe('stockItems', function() {

    beforeEach(function() {
      browser.get('index.html#/stock-items');
    });


    it('should render stockItems and cart table header when user navigates to /stock-items', function() {
      expect(element.all(by.css('.row-title h1')).first().getText()).toMatch('Invoice');

      //there should be 5 items available
      element.all(by.css('.item-box')).then(function(items) {
        expect(items.length).toBe(5);
      });

      //cart table header should be visible
      var headers = element.all(by.css('table.table th')).map(function(elm) {
        return elm.getText();
      });

      //confirm table headers
      expect(headers).toEqual([
        "ID",
        "Item",
        "Price",
        "Quantity",
        "Subtotal",
        ""
      ]);

      //confirm table body and footer are not visible on page load
      element.all(by.css('table.table tbody tr')).count().then(function(count) {
        expect(count).toEqual(0);
      });

      expect($('table.table tfoot').isDisplayed()).toBeFalsy();

    });

    it('should render table body and footer once user selects item', function() {

      element.all(by.css('.item-box')).first().click();

      var cart = $$('table.table');
      cart.each(function(row) {
        var rowElems = row.$$('td');
        expect(rowElems.get(0).getText()).toMatch('235356');
        expect(rowElems.get(1).getText()).toMatch('iPod 3rd Gen');
        expect(rowElems.get(2).getText()).toMatch('€75.50');
        expect(rowElems.get(4).getText()).toMatch('€75.50');
      });


      expect($('table.table tfoot').isDisplayed()).toBeTruthy();
      //check total is also present
      expect($('tfoot td.hidden-xs strong').getText()).toMatch('€75.50');

    });


    it('should remove the cart row once the item quantity reaches 0', function() {

      element.all(by.css('.item-box')).first().click();
      element.all(by.css('.item-box')).first().click();

      element.all(by.css('table.table tbody tr')).count().then(function(count) {
        expect(count).toEqual(1);
      });

      expect($('table.table tfoot').isDisplayed()).toBeTruthy();

      element(by.repeater('cartItem in stockItems').row(0)).element(by.css('button.btn-danger')).click();
      element(by.repeater('cartItem in stockItems').row(0)).element(by.css('button.btn-danger')).click();
      element.all(by.css('table.table tbody tr')).count().then(function(count) {
        expect(count).toEqual(0);
      });
      expect($('table.table tfoot').isDisplayed()).toBeFalsy();

    });


  });

});
