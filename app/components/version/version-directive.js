'use strict';

angular.module('myApp.version.version-directive', [])
  .controller('Controller', ['$scope', 'appVersionService', function ($scope, appVersionService) {
    //todo loading logic required
    appVersionService.startupService();
  }])
  .directive('appVersion', ['version', 'appVersionService', function (version, appVersionService) {
    return function (scope, elm, attrs) {
      elm.text(version);
    };
  }]);
