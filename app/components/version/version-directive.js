'use strict';

angular.module('myApp.version.version-directive', [])
  .controller('Controller', ['$scope', 'appVersionService', function ($scope, appVersionService) {
    //todo - version specific loading logic (if required)
    //appVersionService.startupService();
  }])
  .directive('appVersion', ['version', 'appVersionService', function (version) {
    return function (scope, elm, attrs) {
      elm.text(version);
    };
  }]);
