## Consuming APIs using Angular

### Running the project and the tests
 
To run the project you can use 

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

To run the karma unit test you can use

```
npm test
```

or

```
npm run test-single-run
```

To run the protractor tests, make sure the web server is running and run the following commands

```
npm run update-webdriver
```

followed by 

```
npm run protractor
```



### Development Notes
* Developed and tested on chrome desktop mode
* Basic design as required
* Using angular-seed and bootstrap css for quick startup and setup
* Loading stock items on page load (no polling or updates implemented)
* Protractor had to be installed globally alongside java version 7 or higher
* Items can be added to the cart by clicking on any of them, clicking the blue button in the cart row or increasing the number in the inout field
* To decrease quantity of an item or remove it click on the red button inside the shopping cart row or else delete the quantity number





## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules *carried forward from angular-seed*
    version/              --> version related components
  stock-items-view/     --> the stock items view template and logic
    stock-items-view.html --> the partial template
    stock-items-view.js   --> the controller logic
    stock-items-view_test.js
                          --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```



### Future Enhancements 
* modularised components (stock item and cart) for re-usability
* stock listing data updates
  
### Known Bugs
* manual entry in number fields: if you delete the qty number to write a new one, the row disappears



#### Additional Information

For more information on AngularJS please check out http://angularjs.org/

[protractor]: https://github.com/angular/protractor
[karma]: http://karma-runner.github.io
[angular-seed]: https://github.com/angular/angular-seed
[bootstrap]: https://github.com/twbs

