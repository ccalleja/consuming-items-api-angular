'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /stock-items when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/stock-items");
  });


  describe('stockItems', function() {

    beforeEach(function() {
      browser.get('index.html#/stock-items');
    });


    it('should render stockItems when user navigates to /stock-items', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });

});
