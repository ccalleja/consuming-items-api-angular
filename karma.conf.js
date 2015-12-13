module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      //'http://dmifsud.github.io/angular-training/fixed-assets/angular-third-party-module.js',
      'app/stock-items-view/**/*.js',
      {
        pattern: 'http://dmifsud.github.io/angular-training/fixed-assets/angular-third-party-module.js',
        included: true,
        served: false,
        watched: false
      }
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
