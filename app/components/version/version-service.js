'use strict';

angular.module('myApp.version.version-service', [])
  .factory('appVersionService', ['$window', function(win) {
    var startupService = function(){
      console.log('service running');
    };


    // factory function body that constructs shinyNewServiceInstance
    return {
      startupService : startupService
    };
}]);
